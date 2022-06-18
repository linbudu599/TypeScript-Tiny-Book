import cac from 'cac';
import consola from 'consola';

import { CLIHooks } from './hooks';

import useInitWorkspaceAfterInstall from './init-workspace';
import useResetWorkspacePackages from './reset-workspace';
import useCreateSimplePackage from './create-package';
import useCopyPackage from './copy-package';
import useCachePackage from './cache-package';
import useRenameWorkspacePackage from './rename-package';
import useForkWorkspace from './fork-workspace';
import useReleaseProject from './release';
import useUpdatePackageDependencies from './update-dep-version';

const cli = cac('LinbuduLab-Starter');

consola.info('Preparing CLI App...');

CLIHooks.pre();

useInitWorkspaceAfterInstall(cli);
useResetWorkspacePackages(cli);
useCreateSimplePackage(cli);
useCopyPackage(cli);
useCachePackage(cli);
useRenameWorkspacePackage(cli);
useForkWorkspace(cli);
useReleaseProject(cli);
useUpdatePackageDependencies(cli);

cli.help();
cli.parse();
