import path from 'path';
import { Project, SyntaxKind, SourceFile, ImportDeclaration } from 'ts-morph';
import { uniq } from 'lodash';

const p = new Project();

const source = p.addSourceFileAtPath(path.resolve(__dirname, './source.ts'));

export function getImportDeclarations(source: SourceFile): ImportDeclaration[] {
  const importDeclarations = source
    .getFirstChildByKind(SyntaxKind.SyntaxList)
    ?.getChildrenOfKind(SyntaxKind.ImportDeclaration);

  return importDeclarations ?? [];
}

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

const FORBIDDEN = [
  {
    moduleSpecifier: 'fs',
    replacement: 'fs/promises',
    namedImportsReplacement: (raw: string) =>
      raw.endsWith('Sync') ? raw.slice(0, -4) : raw,
  },
];

const FORBIDDEN_SPECIFIERS = FORBIDDEN.map((i) => i.moduleSpecifier);

for (const specifier of allSpecifiers) {
  if (FORBIDDEN_SPECIFIERS.includes(specifier)) {
    const target = allDeclarations.find(
      (i) =>
        i.asKind(SyntaxKind.ImportDeclaration)?.getModuleSpecifierValue() ===
        specifier
    );

    const replacementMatch = FORBIDDEN.find(
      (i) => i.moduleSpecifier === specifier
    );

    const namedImports = target?.getNamedImports() ?? [];

    const namedImportsReplacement = namedImports.map((i) =>
      replacementMatch?.namedImportsReplacement(i.getText())
    );

    target?.remove();

    source.addImportDeclaration({
      moduleSpecifier: replacementMatch?.replacement!,
      namedImports: namedImportsReplacement.map((i) => ({
        name: i!,
      })),
    });
  }
}

console.log(source.getText());
