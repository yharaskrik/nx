import { runCLI } from 'jest';
import * as path from 'path';
import { JestExecutorOptions } from './schema';
import { Config } from '@jest/types';
import {
  ExecutorContext,
  logger,
  offsetFromRoot,
  stripIndents,
} from '@nrwl/devkit';
import { createProjectGraph } from '@nrwl/workspace/src/core/project-graph';
import {
  calculateProjectDependencies,
  checkDependentProjectsHaveBeenBuilt,
} from '@nrwl/workspace/src/utils/buildable-libs-utils';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { readNxJson } from '@nrwl/workspace';

try {
  require('dotenv').config();
} catch (e) {
  // noop
}

if (process.env.NODE_ENV === null || process.env.NODE_ENV === undefined) {
  (process.env as any).NODE_ENV = 'test';
}

export async function jestExecutor(
  options: JestExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const config = jestConfigParser(options, context);

  const projGraph = createProjectGraph();

  const nxJson = readNxJson();

  const depContext = {
    workspaceRoot: context.root,
    target: {
      target: 'build',
      project: context.projectName,
    },
    logger: logger,
  };

  const { dependencies } = calculateProjectDependencies(projGraph, depContext);

  const built = checkDependentProjectsHaveBeenBuilt(depContext, dependencies);

  if (!built) {
    return { success: false };
  }

  let jestConfig: string = readFileSync(options.jestConfig).toString();

  const npmScope = `@${nxJson.npmScope}`;

  const moduleNameMapper = dependencies
    .filter((dependency) => dependency.name.startsWith(npmScope))
    .reduce(
      (prev, cur) => ({
        ...prev,
        [cur.name]: `<rootDir>/${offsetFromRoot(cur.node.data.root)}dist/${
          cur.node.data.root
        }/bundles/${nxJson.npmScope}-${cur.node.name}.umd.js`,
      }),
      {}
    );

  const nameProp = `'${context.projectName}',`;

  jestConfig = jestConfig.replace(
    nameProp,
    `${nameProp}\nmoduleNameMapper:\n${JSON.stringify(moduleNameMapper)},\n`
  );

  const root = context.workspace.projects[context.projectName].root.split('/');
  root.shift();

  const dir = `${context.cwd}/tmp/${root.join('/')}`;

  mkdirSync(dir, { recursive: true });

  const newJestConfigPath = `${dir}/jest.config.js`;

  writeFileSync(newJestConfigPath, jestConfig);

  const { results } = await runCLI(
    {
      ...config,
      rootDir: context.workspace.projects[context.projectName].root,
    },
    [newJestConfigPath]
  );

  return { success: results.success };
}

export function jestConfigParser(
  options: JestExecutorOptions,
  context: ExecutorContext
): Config.Argv {
  options.jestConfig = path.resolve(context.root, options.jestConfig);

  const jestConfig: {
    transform: any;
    globals: any;
    setupFilesAfterEnv: any;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require(options.jestConfig);

  const config: Config.Argv = {
    $0: undefined,
    _: [],
    config: options.config,
    coverage: options.codeCoverage,
    bail: options.bail,
    ci: options.ci,
    color: options.color,
    detectOpenHandles: options.detectOpenHandles,
    json: options.json,
    maxWorkers: options.maxWorkers,
    onlyChanged: options.onlyChanged,
    outputFile: options.outputFile,
    passWithNoTests: options.passWithNoTests,
    runInBand: options.runInBand,
    showConfig: options.showConfig,
    silent: options.silent,
    testLocationInResults: options.testLocationInResults,
    testNamePattern: options.testNamePattern,
    testPathPattern: options.testPathPattern,
    testTimeout: options.testTimeout,
    colors: options.colors,
    verbose: options.verbose,
    testResultsProcessor: options.testResultsProcessor,
    updateSnapshot: options.updateSnapshot,
    useStderr: options.useStderr,
    watch: options.watch,
    watchAll: options.watchAll,
  };

  // for backwards compatibility
  if (options.setupFile) {
    const setupFilesAfterEnvSet = new Set([
      ...(jestConfig.setupFilesAfterEnv ?? []),
      path.resolve(context.root, options.setupFile),
    ]);
    config.setupFilesAfterEnv = Array.from(setupFilesAfterEnvSet);
  }

  if (options.testFile) {
    config._.push(options.testFile);
  }

  if (options.findRelatedTests) {
    const parsedTests = options.findRelatedTests
      .split(',')
      .map((s) => s.trim());
    config._.push(...parsedTests);
    config.findRelatedTests = true;
  }

  if (options.coverageDirectory) {
    config.coverageDirectory = path.join(
      context.root,
      options.coverageDirectory
    );
  }

  if (options.clearCache) {
    config.clearCache = true;
  }

  if (options.reporters && options.reporters.length > 0) {
    config.reporters = options.reporters;
  }

  if (
    Array.isArray(options.coverageReporters) &&
    options.coverageReporters.length > 0
  ) {
    config.coverageReporters = options.coverageReporters;
  }

  return config;
}

export default jestExecutor;
