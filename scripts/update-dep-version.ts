import { CAC } from 'cac';

import chalk from 'chalk';
import { CLIUtils, Constants } from './utils';
import consola from 'consola';
import path from 'path';

import * as ncu from 'npm-check-updates';

export default function useUpdatePackageDependencies(cli: CAC) {
  cli
    .command(
      'upgrade [...pkg]',
      'update package or workspace dependencies version',
      { allowUnknownOptions: true }
    )

    .action(async (pkg: string[]) => {
      const useBlur = !pkg.every((p) => p.includes('-'));

      const targetPackages = pkg.length
        ? CLIUtils.existWorkspacePackageFilter(pkg, useBlur)
        : CLIUtils.existPackages;

      const confirm = await CLIUtils.createConfirmSelector(
        `Matched projects: ${chalk.green(targetPackages.join(', '))}`
      );

      if (!confirm) {
        consola.info('Operation Cancelled.');
      }

      for (const pkg of targetPackages) {
        const projectPackageJsonPath = path.join(
          CLIUtils.resolvePackageDir(pkg),
          'package.json'
        );

        consola.info(`Updating ${chalk.bold.green(pkg)} dependencies...`);

        await ncu.run({
          packageFile: projectPackageJsonPath,
          upgrade: true,
          color: true,
          peer: true,
          registry: Constants.internalRegistry,
          jsonUpgraded: true,
        });

        consola.success(`Updated ${chalk.bold.green(pkg)} dependencies.`);
      }
    });
}
