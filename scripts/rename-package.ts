import { CAC } from 'cac';
import fs from 'fs-extra';
import enquirer from 'enquirer';
import chalk from 'chalk';
import { CLIUtils } from './utils';
import consola from 'consola';
import path from 'path';

// raw, renamed
type Raw2RenamedTuple = [string, string];

export default function useRenameWorkspacePackage(cli: CAC) {
  cli
    .command('rename', 'pick starters and rename them', {
      allowUnknownOptions: true,
    })
    .action(async () => {
      const chosedStarters = await CLIUtils.createPackageMultiSelector(
        'chosedStarters',
        'Pick starters to rename them',
        true
      );

      const tasks: Array<Raw2RenamedTuple> = [];

      for (const pkg of chosedStarters) {
        const { renamed } = await enquirer.prompt<{ renamed: string }>({
          type: 'input',
          name: 'renamed',
          message: `Rename package ${chalk.bold.green(pkg)}`,
        });

        tasks.push([pkg, renamed]);
      }

      if (!tasks.length) {
        consola.error('No copy tasks available.');
      }

      for (const [raw, renamed] of tasks) {
        const rawDir = CLIUtils.resolvePackageDir(raw);
        const dest = CLIUtils.resolvePackageDir(renamed);

        console.info(
          `Rename template ${chalk.bold.yellow(raw)} to ${chalk.bold.green(
            renamed
          )}`
        );

        fs.renameSync(rawDir, dest);

        const destPkgJsonPath = path.join(dest, 'package.json');

        CLIUtils.modifyPackageJSON(destPkgJsonPath, 'name', renamed);
      }
    });
}
