import path from 'path';
import { Project, SyntaxKind, SourceFile } from 'ts-morph';

const p = new Project();

const source = p.addSourceFileAtPath(path.resolve(__dirname, './source.tsx'));

function getDefaultExportComponent(source: SourceFile) {
  const core = source.getFirstChildByKind(SyntaxKind.SyntaxList)!;

  const exportDefaultAssignment = core.getFirstChildByKind(
    SyntaxKind.ExportAssignment
  )!;

  const targetIdentifier = exportDefaultAssignment
    ?.getFirstChildByKind(SyntaxKind.Identifier)
    ?.getText()!;

  const reactImport = source.getImportDeclaration(
    (imp) => imp.getModuleSpecifierValue() === 'react'
  )!;

  reactImport.insertNamedImport(0, 'memo');

  exportDefaultAssignment.setExpression(`memo(${targetIdentifier})`);
}

getDefaultExportComponent(source);
