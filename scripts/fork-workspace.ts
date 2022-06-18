import { CAC } from 'cac';
import fs from 'fs-extra';

import chalk from 'chalk';
import { CLIUtils, Constants } from './utils';
import consola from 'consola';
import path from 'path';
import ora from 'ora';

export default function useForkWorkspace(cli: CAC) {
  cli
    .command('fork [workspaceName] <dir>', 'fork workspace to a new folder')
    .option('-f, --force', 'rm workspace dir if exists')
    .action(
      async (
        workspaceName: string,
        dir?: string,
        options?: {
          force: boolean;
        }
      ) => {
        const { force = false } = options ?? {};

        const defaultBaseDir = path.dirname(process.cwd());

        const forkedWorkspaceLocation = path.resolve(
          defaultBaseDir,
          'tmp',
          dir ?? 'forked'
        );

        consola.info(
          `Forked workspace will be created in: ${chalk.green(
            forkedWorkspaceLocation
          )}`
        );

        if (fs.existsSync(forkedWorkspaceLocation)) {
          if (force) {
            // TODO: confirm
            consola.warn(`A non-empty dir will be removed.`);

            const confirm = await CLIUtils.createConfirmSelector(
              'Confirm Operation?'
            );

            confirm
              ? fs.rmSync(forkedWorkspaceLocation, {
                  recursive: true,
                })
              : consola.info('Operation Cancelled');

            !confirm && process.exit(0);
          } else {
            consola.fatal(
              `Target workspace dir: ${chalk.green(
                forkedWorkspaceLocation
              )} exists, use ${chalk.white('-f, --force')} to overwrite it.`
            );

            process.exit(0);
          }
        }

        const pickedPackages = await CLIUtils.createPackageMultiSelector(
          'picked',
          'Pick packages to use in forked workspace',
          false
        );

        consola.info(
          `Forking workspace packages: ${chalk.white(
            pickedPackages.join(', ')
          )}...`
        );

        for (const pkg of pickedPackages) {
          const packageSourcePath = CLIUtils.resolvePackageDir(pkg);
          const packageDestPath = path.resolve(
            forkedWorkspaceLocation,
            'packages',
            pkg
          );

          fs.copySync(packageSourcePath, packageDestPath, {
            recursive: true,
            filter: (src, dest) => {
              const filtered = ['node_modules', 'dist', 'tmp'].every(
                (pattern) => !src.includes(pattern)
              );

              return filtered;
            },
          });
        }

        consola.success(`Workspace packages copied.`);

        consola.info(`Forking workspace assets...`);

        const workspaceBase = fs
          .readdirSync(process.cwd())
          .filter(
            (d) =>
              !['node_modules', 'dist', 'tmp', '.git', 'packages'].includes(d)
          );

        for (const baseAsset of workspaceBase) {
          const baseAssetPath = path.resolve(process.cwd(), baseAsset);

          const forkedAssetPath = path.resolve(
            forkedWorkspaceLocation,
            baseAsset
          );

          fs.copySync(baseAssetPath, forkedAssetPath);
        }

        consola.success(`Workspace assets copied.`);

        consola.success(
          `Brand new workspace forked to ${chalk.green(
            forkedWorkspaceLocation
          )}`
        );

        console.log('');
        consola.info(
          `Executing ${chalk.white('Deps Installation')} and ${chalk.white(
            'Env Setup'
          )}...`
        );

        const spinner = ora('Installing dependencies...').start();

        CLIUtils.useChildProcess(
          'pnpm install --registry=https://registry.npmmirror.com',
          {
            cwd: forkedWorkspaceLocation,
            stdio: 'ignore',
          }
        )
          .then(() => {
            spinner.succeed('Dependencies installed!');

            return Promise.resolve();
          })
          .then(() => {
            consola.success('Openning workspace in VS Code...');
            CLIUtils.useChildProcess(`code ${forkedWorkspaceLocation}`);
            return Promise.resolve();
          });
      }
    );
}
