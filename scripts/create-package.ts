import fs from 'fs-extra';
import path from 'path';
import consola from 'consola';
import { CAC } from 'cac';
import { CLIUtils, Constants } from './utils';

const getInitialContent = (pkg: string) => `
console.log("${pkg} is ready!");
`;

const getPackageJsonContent = (pkg: string) => ({
  name: pkg,
  version: '0.0.1',
  description: '',
  main: './dist/index.js',
  license: 'MIT',
  scripts: {
    build: 'tsc',
    dev: 'tsnd --respawn --transpile-only src/index.ts',
    watch: 'tsc --watch',
    check: 'tsc --noEmit',
  },
});

const getTSConfigContent = () => ({
  extends: '../../tsconfig.base.json',
  compilerOptions: {
    target: 'ES2018',
    module: 'commonjs',
    lib: ['esnext'],
    rootDir: 'src',
    outDir: 'dist',
    esModuleInterop: true,
    skipLibCheck: true,
    declaration: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
  },
  include: ['src'],
});

export default function useCreateSimpleNodeStarter(cli: CAC) {
  cli
    .command('create [pkg]', 'create simple starter', {
      allowUnknownOptions: true,
    })
    .action(async (pkg) => {
      const packageDir = CLIUtils.resolvePackageDir(pkg);
      const initialFile = path.join(packageDir, 'src', 'index.ts');
      const packageJsonFile = path.join(packageDir, 'package.json');
      const tsconfigFile = path.join(packageDir, 'tsconfig.json');

      fs.ensureFileSync(initialFile);
      fs.writeFileSync(initialFile, getInitialContent(pkg));

      CLIUtils.writeJsonSync(packageJsonFile, getPackageJsonContent(pkg));

      CLIUtils.writeJsonSync(tsconfigFile, getTSConfigContent());

      consola.success(`Created ${pkg}!`);
    });
}
