import path from 'path';
import chalk from 'chalk';
import { Project, SyntaxKind, SourceFile, FunctionDeclaration } from 'ts-morph';

const p = new Project();

const source = p.addSourceFileAtPath(path.resolve(__dirname, './source.ts'));

// 收集所有的函数声明
export function getAllFunctionDeclarations(
  source: SourceFile
): FunctionDeclaration[] {
  const functionDeclarationList = source
    .getFirstChildByKind(SyntaxKind.SyntaxList)!
    .getChildrenOfKind(SyntaxKind.FunctionDeclaration);

  return functionDeclarationList;
}

// 收集所有存在 JSDoc 的函数声明
const filteredFuncDeclarations = getAllFunctionDeclarations(source).filter(
  (func) => func.getJsDocs().length > 0
);

for (const func of filteredFuncDeclarations) {
  const jsdocContent = func.getJsDocs()[0];

  const tags = jsdocContent.getTags();

  const expireTag = tags.find((tag) => tag.getTagName() === 'expires');

  // 如果不存在 @expires 标签，则跳过
  if (!expireTag) continue;

  // 将其值处理为可解析的字符串
  const [, expireDesc] = expireTag.getText().replace(/\*|\n/g, '').split(' ');

  const expireDate = new Date(expireDesc).getTime();
  const now = new Date().getTime();

  // 对比时间
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
