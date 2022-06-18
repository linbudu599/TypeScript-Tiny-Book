import chalk from 'chalk';
import consola from 'consola';

console.log('');
consola.success(
  `Your workspace has been successfully created, now run ${chalk.bold.cyan(
    '>>> pnpm cli init <<<'
  )} to initialize workspace projects!`
);
