import path from 'path';
import { Project, SyntaxKind, SourceFile, ImportDeclaration } from 'ts-morph';
import { uniq } from 'lodash';

const p = new Project();

const source = p.addSourceFileAtPath(path.resolve(__dirname, './source.ts'));

// 获取所有导入声明
export function getImportDeclarations(source: SourceFile): ImportDeclaration[] {
  const importDeclarations = source
    .getFirstChildByKind(SyntaxKind.SyntaxList)
    ?.getChildrenOfKind(SyntaxKind.ImportDeclaration);

  return importDeclarations ?? [];
}

// 获取所有导入声明中的模块名
export function getImportModuleSpecifiers(source: SourceFile): string[] {
  return uniq(
    getImportDeclarations(source).map((i) => i.getModuleSpecifierValue())
  );
}

const REQUIRED = ['some_required_polyfill'];

const allDeclarations = getImportDeclarations(source);

const allSpecifiers = getImportModuleSpecifiers(source);

if (!REQUIRED.every((i) => allSpecifiers.includes(i))) {
  throw new Error('missing required polyfill');
}

// 设计一个通用的替换模式
const FORBIDDEN = [
  {
    // 要被替换的导入路径
    moduleSpecifier: 'fs',
    // 替换为这个值
    replacement: 'fs/promises',
    // 原本的导入如何更新
    namedImportsReplacement: (raw: string) =>
      raw.endsWith('Sync') ? raw.slice(0, -4) : raw,
  },
];

const FORBIDDEN_SPECIFIERS = FORBIDDEN.map((i) => i.moduleSpecifier);

for (const specifier of allSpecifiers) {
  if (FORBIDDEN_SPECIFIERS.includes(specifier)) {
    const target = allDeclarations.find(
      (i) =>
        // 检查是否是要被替换的模块
        i.getModuleSpecifierValue() === specifier
    );

    // 找到要被替换的导入声明
    const replacementMatch = FORBIDDEN.find(
      (i) => i.moduleSpecifier === specifier
    );

    // 收集原本的具名导入
    const namedImports = target?.getNamedImports() ?? [];

    // 替换为新的具名导入
    const namedImportsReplacement = namedImports.map((i) =>
      replacementMatch?.namedImportsReplacement(i.getText())
    );

    // 移除原本的导入
    target?.remove();

    // 增加新的导入
    source.addImportDeclaration({
      moduleSpecifier: replacementMatch?.replacement!,
      namedImports: namedImportsReplacement.map((i) => ({
        name: i!,
      })),
    });
  }
}

console.log(source.getText());
