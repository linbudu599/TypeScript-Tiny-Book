import { CAC } from 'cac';
import consola from 'consola';
import fs from 'fs-extra';
import ora from 'ora';
import { CLIUtils, Constants } from './utils';

export default function useInitWorkspaceAfterInstall(cli: CAC) {
  cli
    .command('init', 'pick starter to init minimal workspace', {
      allowUnknownOptions: true,
    })
    .action(async () => {
      const existPackages = CLIUtils.existPackages;

      const chosedStarters = await CLIUtils.createPackageMultiSelector(
        'chosedStarters',
        'Pick starters to initialize workspace'
      );

      const excluded = chosedStarters.includes(Constants.noneIdentifier)
        ? existPackages
        : existPackages.filter((p) => !chosedStarters.includes(p));

      for (const project of excluded) {
        const projectSrcPath = CLIUtils.resolvePackageDir(project);

        fs.removeSync(projectSrcPath);
      }

      consola.success(
        `Workspace initialized, executing deps install for selected packages...`
      );

      const spinner = ora('Installing dependencies...').start();

      CLIUtils.useChildProcess(
        'pnpm install --registry=https://registry.npmmirror.com --prefer-offline',
        {
          stdio: 'ignore',
        }
      ).then(() => {
        spinner.succeed('Dependencies installed!');
        console.log('');
        consola.success('Enjoy!');
      });
    });
}
