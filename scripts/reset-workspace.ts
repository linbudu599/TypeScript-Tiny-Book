import { CAC } from 'cac';
import fs from 'fs-extra';
import consola from 'consola';
import chalk from 'chalk';

import { CLIUtils, Constants } from './utils';

export default function useResetWorkspacePackages(cli: CAC) {
  cli
    .command('reset', 'reset workspace', {
      allowUnknownOptions: true,
    })
    .action(async () => {
      const cached = fs.readdirSync(Constants.packagesCacheDir);

      for (const p of cached) {
        const projectPreservedSrcPath = CLIUtils.resolveCachePackageDir(p);
        const projectPreservedDestPath = CLIUtils.resolvePackageDir(p);

        if (fs.existsSync(projectPreservedDestPath)) {
          consola.info(
            `Package ${chalk.green(p)} exists in workspace, will be preserved.`
          );
          continue;
        }

        fs.copySync(projectPreservedSrcPath, projectPreservedDestPath, {
          recursive: true,
          filter: (src, dest) => {
            // do not filter 'node_modules' here
            const filtered = ['dist', 'tmp'].every(
              (pattern) => !src.includes(pattern)
            );

            return filtered;
          },
        });
        consola.success(`Package ${chalk.green(p)} restored successfully.`);
      }
    });
}
