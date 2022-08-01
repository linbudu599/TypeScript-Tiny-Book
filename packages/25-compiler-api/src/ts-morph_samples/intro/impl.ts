import path from 'path';
import chalk from 'chalk';
import { Project, SyntaxKind } from 'ts-morph';

// 实例化一个“项目实例”
const p = new Project();

// 将某个路径的文件添加到这个项目内
const source = p.addSourceFileAtPath(path.resolve(__dirname, './source.ts'));

/**
 * 创建一个接口
 *
 * interface IUser { }
 */
const interfaceDec = source.addInterface({
  name: 'IUser',
  properties: [],
});

// 新增属性
interfaceDec.addProperties([
  {
    name: 'name',
    type: 'string',
  },
  {
    name: 'age',
    type: 'number',
  },
]);

// 添加 JSDoc 注释 @author Linbudu
interfaceDec.addJsDoc({
  tags: [
    {
      tagName: 'author',
      text: 'Linbudu',
    },
  ],
});

// 添加泛型 T extends Record<string, any>
interfaceDec.addTypeParameter({
  name: 'T',
  constraint: 'Record<string, any>',
});

// 获取接口名称
interfaceDec.getName();

// 删除这个接口声明
interfaceDec.remove();

// 创建一条导入：import { readFile, rmSync } from 'fs';
const importDec = source.addImportDeclaration({
  namedImports: ['readFile', 'rmSync'],
  moduleSpecifier: 'fs',
});

// 新增具名导入 appendFile
importDec.addNamedImport('appendFile');
// 设置默认导入 fs
importDec.setDefaultImport('fs');

// 删除默认导入
importDec.removeDefaultImport();
// 删除命名空间导入
importDec.removeNamespaceImport();

// 删除这条导入声明
importDec.remove();
