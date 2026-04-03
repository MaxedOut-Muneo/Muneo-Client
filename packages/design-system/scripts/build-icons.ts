import { readdir, readFile, writeFile, unlink } from 'fs/promises';
import { join, extname } from 'path';
import { transform } from '@svgr/core';
import { format } from 'prettier';

const iconsRoot = join(process.cwd(), 'src/assets/icons');
const svgDir = join(iconsRoot, 'svg');

const tag = '// @generated';

const toIconName = (filename: string): string =>
  filename
    .replace(extname(filename), '')
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('') + 'Icon';

const replaceFill = (svg: string): string => svg.replace(/fill="(?!none\b)[^"]*"/gi, 'fill="currentColor"');

const convertSvg = async (file: string): Promise<string> => {
  const name = toIconName(file);
  const raw = await readFile(join(svgDir, file), 'utf-8');
  const vb = raw.match(/viewBox=["']([^"']+)["']/i);

  let code = await transform(
    replaceFill(raw),
    {
      typescript: true,
      jsxRuntime: 'automatic',
      expandProps: 'end',
      prettier: false,
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
    },
    { componentName: name }
  );

  if (vb && !code.includes('viewBox')) {
    code = code.replace(/<svg\s/, `<svg viewBox="${vb[1]}" `);
  }

  return format(code, { parser: 'babel-ts', singleQuote: true, semi: true, printWidth: 120 });
};

const removeOldFiles = async () => {
  const files = await readdir(iconsRoot);
  await Promise.all(files.filter((f) => f.endsWith('.tsx')).map((f) => unlink(join(iconsRoot, f))));
};

const createIndex = async (names: string[]) => {
  const lines = names.sort().map((n) => `export { default as ${n} } from './${n}';`);
  await writeFile(
    join(iconsRoot, 'index.ts'),
    [tag, '', "export type { SVGProps as IconProps } from 'react';", '', ...lines, ''].join('\n'),
    'utf-8'
  );
};

const run = async () => {
  const svgFiles = (await readdir(svgDir)).filter((f) => f.endsWith('.svg')).sort();
  if (!svgFiles.length) {
    return;
  }

  await removeOldFiles();

  const names: string[] = [];
  for (const file of svgFiles) {
    const name = toIconName(file);
    await writeFile(join(iconsRoot, `${name}.tsx`), `${tag}\n\n${await convertSvg(file)}`, 'utf-8');
    names.push(name);
  }

  await createIndex(names);
  console.log(`${names.length}개 아이콘 생성 완료`);
};

void run();
