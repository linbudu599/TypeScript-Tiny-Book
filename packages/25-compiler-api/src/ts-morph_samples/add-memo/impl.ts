import path from 'path';
import { Project, SyntaxKind, SourceFile } from 'ts-morph';

const p = new Project();

const source = p.addSourceFileAtPath(path.resolve(__dirname, './source.tsx'));

// 获取默认导出
const exportDefaultAssignment = source
  .getFirstChildByKind(SyntaxKind.SyntaxList)!
  .getFirstChildByKind(SyntaxKind.ExportAssignment)!;

// 获取原本的导出语句的组件名
const targetIdentifier = exportDefaultAssignment
  ?.getFirstChildByKind(SyntaxKind.Identifier)
  ?.getText()!;

// 获取 react 对应的导入声明
const reactImport = source.getImportDeclaration(
  (imp) => imp.getModuleSpecifierValue() === 'react'
)!;

// 新增一个具名导入
reactImport.insertNamedImport(0, 'memo');

!targetIdentifier.startsWith('memo') &&
  exportDefaultAssignment.setExpression(`memo(${targetIdentifier})`);

console.log(source.getText());
