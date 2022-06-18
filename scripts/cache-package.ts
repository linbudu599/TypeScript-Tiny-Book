import { CAC } from 'cac';
import fs from 'fs-extra';

import chalk from 'chalk';
import { CLIUtils, Constants } from './utils';
import consola from 'consola';

export default function useCachePackage(cli: CAC) {
  cli
    .command('cache', 'cache current workspace packages to cache directory')
    .option('-p,--preserve', 'preserve when package cache directory exists')
    .option('--no-preserve', 'override exist package cache')
    .action(async ({ preserve = true }: { preserve: boolean }) => {
      fs.ensureDirSync(CLIUtils.resolvedPackageRootDir);
      const existPackages = CLIUtils.existPackages;

      for (const p of existPackages) {
        const projectSrcPath = CLIUtils.resolvePackageDir(p);
        const projectDestPath = CLIUtils.resolveCachePackageDir(p);

        if (fs.existsSync(projectDestPath) && preserve) {
          consola.info(
            `[Skip] Cached package ${chalk.green(p)} will be preserved.`
          );
          continue;
        }

        CLIUtils.copySyncWithFilter(projectSrcPath, projectDestPath);

        const projectFixtureCachePath =
          CLIUtils.resolveFixtureCachePackageDir(p);

        CLIUtils.copySyncWithFilter(
          projectSrcPath,
          projectFixtureCachePath,
          undefined,
          {
            overwrite: true,
          }
        );

        consola.success(`Package ${chalk.green(p)} cached.`);
      }
    });
}
