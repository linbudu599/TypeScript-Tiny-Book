import path from 'path';
import { Project, SyntaxKind, SourceFile, ClassDeclaration } from 'ts-morph';

const p = new Project();

const source = p.addSourceFileAtPath(path.resolve(__dirname, './source.ts'));

export function getClassDeclarations(source: SourceFile): ClassDeclaration[] {
  const classDeclarationList = source
    .getFirstChildByKind(SyntaxKind.SyntaxList)!
    .getChildrenOfKind(SyntaxKind.ClassDeclaration);

  return classDeclarationList;
}

const IMPLS = ['Handler'];

const filteredClassDeclarations: ClassDeclaration[] = getClassDeclarations(
  source
).filter((cls) => {
  const impls = cls.getImplements().map((impl) => impl.getText());
  return IMPLS.some((impl) => impls.includes(impl));
});

const METHODS = ['handle'];

for (const cls of filteredClassDeclarations) {
  const methods = cls.getMethods().map((method) => method.getName());
  for (const method of methods) {
    if (METHODS.includes(method)) {
      const methodDeclaration = cls.getMethod(method)!;
      methodDeclaration.addDecorator({
        name: 'PerformanceMark',
        arguments: [],
      });
    }
  }
}

console.log(source.getText());
