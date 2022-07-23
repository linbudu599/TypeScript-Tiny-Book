import path from 'path';
import fs from 'fs-extra';
import { Project } from 'ts-morph';
import { capitalize, uniq } from 'lodash';


import json from './source.json';


const p = new Project();

const filePath = path.resolve(__dirname, './source.ts');

fs.rmSync(filePath);
fs.ensureFileSync(filePath);

const source = p.addSourceFileAtPath(filePath);

function objectToInterfaceStruct(
  identifier: string,
  input: Record<string, unknown>
) {
  const interfaceDeclaration = source.addInterface({
    name: identifier,
    isExported: true,
  });

  for (const [key, value] of Object.entries(input)) {
    if (['string', 'number', 'boolean'].includes(typeof value)) {
      interfaceDeclaration.addProperty({
        name: key,
        type: typeof value,
      });
    }

    if (Array.isArray(value)) {
      const elementTypes = uniq(value.map((v) => typeof v));
      interfaceDeclaration.addProperty({
        name: key,
        type: `(${elementTypes.join(' | ')})[]`,
      });
      continue;
    }

    if (typeof value === 'object') {
      const nestedStruct = objectToInterfaceStruct(
        `I${capitalize(key)}`,
        value as Record<string, unknown>
      );

      interfaceDeclaration.addProperty({
        name: nestedStruct.getName(),
        type: nestedStruct.getName(),
      });
    }
  }

  return interfaceDeclaration;
}

objectToInterfaceStruct('IStruct', json);

source.saveSync();

console.log(source.getText());
