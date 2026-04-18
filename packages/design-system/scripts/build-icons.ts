import { readdir, readFile, writeFile, unlink, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { transform } from '@svgr/core';
import jsxPlugin from '@svgr/plugin-jsx';
import svgoPlugin from '@svgr/plugin-svgo';
import { format } from 'prettier';

const iconsRoot = join(process.cwd(), 'src/assets/icons');
const svgDir = join(iconsRoot, 'svg');
const svgFillDir = join(iconsRoot, 'svg-fill');

const tag = '// @generated';

const toIconName = (filename: string): string => {
  const base = filename.replace(extname(filename), '');
  const name =
    base
      .split(/[-_\s]+/)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('') + 'Icon';
  return /^\d/.test(name) ? `Svg${name}` : name;
};

const toComponentName = (filename: string): string => {
  const base = filename.replace(extname(filename), '');
  const name = base
    .split(/[-_\s]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  return /^\d/.test(name) ? `Svg${name}` : name;
};

const normalizeFill = (svg: string): string => svg.replace(/fill="(?!none\b)[^"]*"/gi, 'fill="currentColor"');

const extractViewBox = (svg: string): string | null => {
  const m = svg.match(/viewBox=["']([^"']+)["']/i);
  return m ? m[1] : null;
};

const convertSvg = async (
  file: string,
  dir: string,
  nameConverter: (f: string) => string,
  normalize: boolean
): Promise<string> => {
  const name = nameConverter(file);
  const raw = await readFile(join(dir, file), 'utf-8');
  const viewBox = extractViewBox(raw);

  let code = await transform(
    normalize ? normalizeFill(raw) : raw,
    {
      typescript: true,
      jsxRuntime: 'automatic',
      expandProps: 'end',
      prettier: false,
      plugins: [svgoPlugin, jsxPlugin],
    },
    { componentName: name }
  );

  if (viewBox && !code.includes('viewBox')) {
    code = code.replace(/<svg\s/, `<svg viewBox="${viewBox}" `);
  }

  const formatted = await format(code, {
    parser: 'babel-ts',
    singleQuote: true,
    semi: true,
    printWidth: 120,
  });

  await writeFile(join(iconsRoot, `${name}.tsx`), `${tag}\n\n${formatted}`, 'utf-8');
  return name;
};

const removeOldFiles = async () => {
  const files = await readdir(iconsRoot);
  const tsxFiles = files.filter((f) => f.endsWith('.tsx'));
  await Promise.all(
    tsxFiles.map(async (f) => {
      const content = await readFile(join(iconsRoot, f), 'utf-8');
      if (content.startsWith(tag)) {
        await unlink(join(iconsRoot, f));
      }
    })
  );
};

const createIndex = async (names: string[]) => {
  const lines = names.sort().map((n) => `export { default as ${n} } from './${n}';`);
  await writeFile(
    join(iconsRoot, 'index.ts'),
    [tag, '', "export type { SVGProps as IconProps } from 'react';", '', ...lines, ''].join('\n'),
    'utf-8'
  );
};

const readSvgFiles = async (dir: string): Promise<string[]> => {
  try {
    return (await readdir(dir)).filter((f) => f.endsWith('.svg')).sort();
  } catch {
    return [];
  }
};

const run = async () => {
  await mkdir(svgFillDir, { recursive: true });

  const svgFiles = await readSvgFiles(svgDir);
  const svgFillFiles = await readSvgFiles(svgFillDir);

  if (!svgFiles.length && !svgFillFiles.length) {
    console.log('변환할 SVG 파일이 없습니다.');
    return;
  }

  await removeOldFiles();

  const names: string[] = [];

  for (const file of svgFiles) {
    names.push(await convertSvg(file, svgDir, toIconName, true));
  }

  for (const file of svgFillFiles) {
    names.push(await convertSvg(file, svgFillDir, toComponentName, false));
  }

  await createIndex(names);
  console.log(`${names.length}개 컴포넌트 생성 완료`);
};

void run();
