import consola from 'consola';
import fs, { CopyOptionsSync, Mode } from 'fs-extra';
import { EOL } from 'os';
import path from 'path';
import execa from 'execa';
import preferredPM from 'preferred-pm';
import { PackageJson } from 'type-fest';
import _ from 'lodash';
import enquirer from 'enquirer';
import chalk from 'chalk';

export class Constants {
  public static get demoOnlyPackages() {
    return ['child1', 'child2', 'parent1', 'parent2'];
  }

  public static get preservedDir() {
    return 'preserved-projects';
  }

  public static get packagesDir() {
    return 'packages';
  }

  public static get noneIdentifier() {
    return 'none';
  }

  public static get cacheDir() {
    return path.resolve(__dirname, '../node_modules', '.LinbuduLab');
  }

  public static get packagesCacheDir() {
    return path.resolve(Constants.cacheDir, 'packages');
  }

  public static get fixedPackagesCacheDir() {
    return path.resolve(Constants.cacheDir, 'fixture-packages');
  }

  public static get internalRegistry() {
    return 'https://registry.npmmirror.com';
  }

  /**
   * colors: {@link https://revel-in-color.vercel.app/}
   * @returns
   */
  public static get starterInfoMap() {
    return {
      graphql: {
        keywords: ['graphql', 'apollo'],
        color: '#a31970',
      },
      nest: {
        keywords: ['nest'],
        color: '#c04851',
      },
      vite: {
        keywords: ['vite', 'vitest'],
        color: '#0095b6',
      },
      react: {
        keywords: ['cra', 'react'],
        color: '#248067',
      },
      midway: {
        keywords: ['midway'],
        color: '#407d53',
      },
      esbuild: {
        keywords: ['esbuild'],
        color: '#fed71a',
      },
      node: {
        keywords: ['prisma', 'strapi'],
        color: '#c6dfc8',
      },
      other: {
        keywords: [],
        color: '#dae3e6',
      },
    };
  }
}

export class CLIUtils {
  public static get existPackages() {
    return fs.readdirSync(
      path.resolve(__dirname, '../', Constants.packagesDir)
    );
  }

  public static get cachedPackages() {
    return fs.readdirSync(
      path.resolve(__dirname, '../', Constants.packagesCacheDir)
    );
  }

  public static get resolvedPackageRootDir() {
    return path.resolve(__dirname, '../', Constants.packagesDir);
  }

  public static resolvePackageDir(p: string) {
    return path.resolve(__dirname, '../', Constants.packagesDir, p);
  }

  public static resolvePreservePackageDir(p: string) {
    return path.resolve(__dirname, '../', Constants.preservedDir, p);
  }

  public static resolveCachePackageDir(p: string) {
    return path.resolve(__dirname, '../', Constants.packagesCacheDir, p);
  }

  public static resolveFixtureCachePackageDir(p: string) {
    return path.resolve(__dirname, '../', Constants.fixedPackagesCacheDir, p);
  }

  public static existWorkspacePackageFilter(projects: string[], blur = false) {
    const existPackages = CLIUtils.existPackages;

    const matcher = blur
      ? existPackages.map((p) => p.split('-')).flat(Infinity)
      : existPackages;

    const matched = projects.filter((p) => matcher.includes(p));

    return blur
      ? existPackages.filter((p) => matched.some((m) => p.includes(m)))
      : matched;
  }

  public static copySyncWithFilter(
    src: string,
    dest: string,
    pathFragmentsFilter: string[] = ['node_modules', 'dist', 'tmp'],
    copyOptions: CopyOptionsSync = {}
  ) {
    fs.copySync(src, dest, {
      filter: (src, dest) =>
        pathFragmentsFilter.every((pattern) => !src.includes(pattern)),
      recursive: true,
      ...copyOptions,
    });
  }

  public static findInfoFromKeywords(input: string) {
    const inputFragment = input.split('-');
    for (const info of Object.values(Constants.starterInfoMap)) {
      if (_.intersection(inputFragment, info.keywords).length > 0) {
        return info;
      }
    }
    return null;
  }

  public static async createConfirmSelector(message: string): Promise<boolean> {
    const res = await enquirer.prompt<Record<'confirm', boolean>>({
      type: 'confirm',
      name: 'confirm',
      message,
    });

    return res.confirm;
  }

  public static async createPackageMultiSelector<T extends string>(
    name: T,
    message: string,
    color = false
  ): Promise<string[]> {
    const existPackages = CLIUtils.existPackages;

    const res = await enquirer.prompt<Record<T, string[]>>({
      type: 'multiselect',
      choices: color
        ? existPackages.map((p) => {
            return {
              name: p,
              value: p,
              message: color
                ? chalk.hex(
                    (
                      CLIUtils.findInfoFromKeywords(p) ??
                      Constants.starterInfoMap['other']
                    ).color
                  )(p)
                : p,
            };
          })
        : existPackages,
      muliple: true,
      sort: true,
      scroll: true,
      name,
      message,
    });

    return res[name];
  }

  public static readJsonSync<TParsedContent = Record<string, unknown>>(
    filePath: string,
    options?: {
      encoding?: null | undefined;
      flag?: string | undefined;
      throw?: boolean;
      parserOptions?: string;
      reviver?: (key: string, value: any) => any;
    } | null
  ): TParsedContent {
    const content = fs
      .readFileSync(filePath, {
        ...options,
        encoding: 'utf-8',
      })
      .replace(/^\uFEFF/, '');

    let parsed: any;

    try {
      parsed = JSON.parse(content, options?.reviver);
    } catch (error: any) {
      if (options?.throw) {
        error.message = `${filePath}: ${error.message}`;
        throw error;
      } else {
        return {} as TParsedContent;
      }
    }

    return parsed;
  }

  public static writeJsonSync<TContent = Record<string, unknown>>(
    filePath: string,
    content: TContent,
    options?: {
      mode?: Mode | undefined;
      flag?: string | undefined;
    }
  ): void {
    const contentStr =
      JSON.stringify(content, null, 2).replace(/\n/g, EOL) + EOL;

    fs.ensureFileSync(filePath);

    fs.writeFileSync(filePath, contentStr, options);
  }

  public static ensureAbsolutePath(
    input: string,
    cwd: string = process.cwd()
  ): string {
    return path.isAbsolute(input) ? input : path.resolve(input, cwd);
  }

  public static modifyJson<
    TRawContent = Record<string, unknown>,
    TUpdatedContent = Record<string, unknown>
  >(filePath: string, modifier: (content: TRawContent) => TUpdatedContent) {
    const absPath = CLIUtils.ensureAbsolutePath(filePath);

    const raw = CLIUtils.readJsonSync<TRawContent>(absPath);

    if (!raw) {
      return;
    }

    const updated = modifier(raw);

    CLIUtils.writeJsonSync(absPath, updated);
  }

  public static modifyPackageJSON(
    pkgJsonPath: string,
    field: string,
    content: any,
    options?: {
      mergeObject?: boolean;
    }
  ) {
    CLIUtils.modifyJson<PackageJson, PackageJson>(pkgJsonPath, (pkg) => {
      const prevFieldContent = pkg[field as keyof PackageJson] as any;

      if (prevFieldContent && typeof prevFieldContent === 'object') {
        const updatedFieldContent =
          options?.mergeObject ?? true
            ? {
                ...prevFieldContent,
                ...content,
              }
            : content;
        pkg = {
          ...pkg,
          [field]: updatedFieldContent,
        };
      } else {
        pkg = {
          ...pkg,
          [field]: content,
        };
      }
      return pkg;
    });
  }

  public static async useChildProcess(
    command: string,
    options?: execa.Options
  ) {
    console.log('');
    consola.info(`Executing command: ${chalk.cyan(command)}`);

    const res = await execa(command, {
      stdio: 'inherit',
      shell: true,
      preferLocal: true,
      ...(options ?? {}),
    });

    console.log('');
    consola.info(
      `Execution finished, child process exits with code ${res.exitCode}.\n`
    );
  }

  public static ensureArray<T>(array: T | T[]): T[] {
    return Array.isArray(array) ? array : [array];
  }

  public static async installDeps(
    deps: Partial<Record<'deps' | 'devDeps', string | string[]>>,
    extraArgs: string = ''
  ) {
    const pm = await preferredPM(process.cwd());
    const m = pm?.name ?? 'pnpm';
    const installCommand = pm?.name === 'yarn' ? 'add' : 'install';

    // deps
    deps.deps &&
      (await this.useChildProcess(
        `${m} ${installCommand} ${CLIUtils.ensureArray(deps.deps).join(
          ' '
        )} ${extraArgs}`
      ));

    // devDeps
    deps.devDeps &&
      (await this.useChildProcess(
        `${m} ${installCommand} ${CLIUtils.ensureArray(deps.devDeps).join(
          ' '
        )} --save-dev ${extraArgs}`
      ));
  }
}
