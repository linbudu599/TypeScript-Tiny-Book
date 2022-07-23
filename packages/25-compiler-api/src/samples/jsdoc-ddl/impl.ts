import path from 'path';
import chalk from 'chalk';
import { Project, SyntaxKind, SourceFile, FunctionDeclaration } from 'ts-morph';

const p = new Project();

const source = p.addSourceFileAtPath(path.resolve(__dirname, './source.ts'));

export function getAllFunctionDeclarations(
  source: SourceFile
): FunctionDeclaration[] {
  const functionDeclarationList = source
    .getFirstChildByKind(SyntaxKind.SyntaxList)!
    .getChildrenOfKind(SyntaxKind.FunctionDeclaration);

  return functionDeclarationList;
}

const filteredFuncDeclarations = getAllFunctionDeclarations(source).filter(
  (func) => func.getJsDocs().length > 0
);

function findTag(tagName: string, jsDoc: string) {
  const tag = jsDoc.match(new RegExp(`\\s*\\*\\s*@${tagName}\\s*(.*)`));
  return tag ? tag[1] : null;
}

for (const func of filteredFuncDeclarations) {
  const jsdocContent = func.getJsDocs()[0];

  const tags = jsdocContent.getTags();

  const expireTag = tags.find((tag) => tag.getTagName() === 'expires');

  if (!expireTag) continue;

  const [, expireDesc] = expireTag.getText().replace(/\*|\n/g, '').split(' ');

  const expireDate = new Date(expireDesc).getTime();
  const now = new Date().getTime();

  if (expireDate < now) {
    const authorTag = tags.find((tag) => tag.getTagName() === 'author');
    const [, author] = authorTag
      ? authorTag.getText().replace(/\*|\n/g, '').split(' ')
      : 'unknown';

    console.log(
      chalk.red(
        `Function ${chalk.yellow(
          func.getName()
        )} is expired, author: ${chalk.white(author)}`
      )
    );
  }
}
