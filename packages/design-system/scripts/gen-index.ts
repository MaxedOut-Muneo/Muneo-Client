#!/usr/bin/env tsx
/**
 * UI 컴포넌트 index.ts 자동 생성
 *
 * src/ui/ 하위 각 컴포넌트 디렉토리의 index.ts와
 * src/ui/index.ts를 자동으로 생성/갱신합니다.
 *
 * 사용법:
 *   pnpm gen:index          — index.ts 생성
 *   pnpm gen:index --check  — 변경 필요 여부만 확인 (CI용)
 */

import { readdir, readFile, stat, writeFile } from 'fs/promises';
import { basename, extname, join, relative } from 'path';

const UI_DIR = join(process.cwd(), 'src', 'ui');
const CHECK = process.argv.includes('--check');

const HEADER = ['// @generated'].join('\n');

async function isDirectory(p: string) {
  return (await stat(p)).isDirectory();
}

async function componentExports(dir: string): Promise<string[]> {
  const entries = (await readdir(dir)).sort();
  return entries
    .filter(
      (e) =>
        /\.tsx?$/.test(e) &&
        !/\.css\.ts$/.test(e) &&
        !/\.stories\.tsx?$/.test(e) &&
        !/\.test\.tsx?$/.test(e) &&
        !/\.spec\.tsx?$/.test(e) &&
        !/^index\.tsx?$/.test(e)
    )
    .map((e) => `export * from './${basename(e, extname(e))}';`);
}

function componentIndexContent(lines: string[]): string {
  if (lines.length === 0) {
    return `${HEADER}\n\nexport {};\n`;
  }
  return `${HEADER}\n\n${lines.join('\n')}\n`;
}

function uiIndex(componentNames: string[]): string {
  const lines = componentNames.map((name) => `export * from './${name}';`);
  return `${HEADER}\n\n${lines.join('\n')}\n`;
}

async function main() {
  const entries = (await readdir(UI_DIR)).sort();
  const componentDirs: string[] = [];

  for (const entry of entries) {
    const fullPath = join(UI_DIR, entry);
    if (await isDirectory(fullPath)) {
      componentDirs.push(entry);
    }
  }

  type IndexEntry = { path: string; content: string };
  const targets: IndexEntry[] = [];
  const nonEmpty: string[] = [];

  for (const name of componentDirs) {
    const lines = await componentExports(join(UI_DIR, name));
    targets.push({ path: join(UI_DIR, name, 'index.ts'), content: componentIndexContent(lines) });
    if (lines.length > 0) {
      nonEmpty.push(name);
    }
  }
  targets.push({ path: join(UI_DIR, 'index.ts'), content: uiIndex(nonEmpty) });

  if (CHECK) {
    const outdated: string[] = [];
    for (const { path, content } of targets) {
      let existing = '';
      try {
        existing = await readFile(path, 'utf-8');
      } catch {
        /* new file */
      }
      if (existing !== content) {
        outdated.push(relative(process.cwd(), path).replace(/\\/g, '/'));
      }
    }
    if (outdated.length > 0) {
      console.error('index.ts 파일이 최신 상태가 아닙니다:\n');
      outdated.forEach((d) => console.error(`  - ${d}`));
      console.error('\n  pnpm gen:index 를 실행하세요.');
      process.exit(1);
    }
    console.log('모든 index.ts 파일이 최신 상태입니다.');
    return;
  }

  for (const { path, content } of targets) {
    await writeFile(path, content, 'utf-8');
    console.log(`  ${relative(process.cwd(), path).replace(/\\/g, '/')}`);
  }
  console.log(`\n${targets.length}개 index.ts 파일을 생성했습니다.`);
}

main().catch((err) => {
  console.error('오류:', err);
  process.exit(1);
});
