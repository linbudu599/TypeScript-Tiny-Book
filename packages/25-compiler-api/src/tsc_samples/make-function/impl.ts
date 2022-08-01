import ts from 'typescript';

function makeFactorialFunction() {
  // 创建代表函数名 factorial 的 Identifier 结点
  const functionName = ts.factory.createIdentifier('factorial');
  // 创建代表参数名 n 的 Identifier 结点
  const paramName = ts.factory.createIdentifier('n');
  // 创建参数类型结点
  const paramType = ts.factory.createKeywordTypeNode(
    ts.SyntaxKind.NumberKeyword
  );

  // 创建参数的声明
  const parameter = ts.factory.createParameterDeclaration(
    undefined,
    [],
    undefined,
    paramName,
    undefined,
    paramType
  );

  // 创建表达式 n ≤ 1
  const condition = ts.factory.createBinaryExpression(
    // n
    paramName,
    // ≤
    ts.SyntaxKind.LessThanEqualsToken,
    // 1
    ts.factory.createNumericLiteral(1)
  );

  // 创建代码块
  const ifBody = ts.factory.createBlock(
    // 创建代码块内的返回语句
    [ts.factory.createReturnStatement(ts.factory.createNumericLiteral(1))],
    true
  );

  // 创建表达式 n - 1
  const decrementedArg = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.MinusToken,
    ts.factory.createNumericLiteral(1)
  );

  // 创建表达式 n * factorial(n - 1)
  const recurse = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.AsteriskToken,
    // 创建函数调用表达式
    ts.factory.createCallExpression(functionName, undefined, [decrementedArg])
  );

  const statements = [
    // 创建 IF 语句
    ts.factory.createIfStatement(condition, ifBody),
    // 创建 return 语句
    ts.factory.createReturnStatement(recurse),
  ];

  // 创建函数声明
  return ts.factory.createFunctionDeclaration(
    undefined,
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    undefined,
    functionName,
    undefined,
    [parameter],
    // 函数返回值类型
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    // 函数体
    ts.factory.createBlock(statements, true)
  );
}

// 创建一个虚拟的源文件
const resultFile = ts.createSourceFile(
  './source.ts',
  '',
  ts.ScriptTarget.Latest,
  false,
  ts.ScriptKind.TS
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

const result = printer.printNode(
  ts.EmitHint.Unspecified,
  makeFactorialFunction(),
  resultFile
);

console.log(result);
