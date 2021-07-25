import { runCLI } from 'jest';
import * as path from 'path';
import { JestExecutorOptions } from './schema';
import { Config } from '@jest/types';
import {
  ExecutorContext,
  logger,
  NxJsonConfiguration,
  offsetFromRoot,
  readJsonFile,
} from '@nrwl/devkit';
import { createProjectGraph } from '@nrwl/workspace/src/core/project-graph';
import {
  calculateProjectDependencies,
  checkDependentProjectsHaveBeenBuilt,
  DependentBuildableProjectNode,
} from '@nrwl/workspace/src/utils/buildable-libs-utils';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';

try {
  require('dotenv').config();
} catch (e) {
  // noop
}

if (process.env.NODE_ENV === null || process.env.NODE_ENV === undefined) {
  (process.env as any).NODE_ENV = 'test';
}

function buildModuleNameMapper(
  npmScope: string,
  dependencies: DependentBuildableProjectNode[]
): Record<string, string> {
  const atNpmScope = `@${npmScope}`;

  return dependencies
    .filter((dependency) => dependency.name.startsWith(atNpmScope))
    .reduce(
      (prev, cur) => ({
        ...prev,
        [cur.name]: `<rootDir>/${offsetFromRoot(cur.node.data.root)}dist/${
          cur.node.data.root
        }/bundles/${npmScope}-${cur.node.name}.umd.js`,
      }),
      {}
    );
}

function createTmpJestConfig(
  options: JestExecutorOptions,
  context: ExecutorContext,
  dependencies: DependentBuildableProjectNode[]
): string {
  let jestConfig: string = readFileSync(options.jestConfig).toString();

  const nameProp = `'${context.projectName}',`;

  const nxJson = readJsonFile<NxJsonConfiguration>('nx.json');

  jestConfig = jestConfig.replace(
    nameProp,
    `${nameProp}\nmoduleNameMapper:\n${JSON.stringify(
      buildModuleNameMapper(nxJson.npmScope, dependencies)
    )},\n`
  );

  const root = context.workspace.projects[context.projectName].root.split('/');
  root.shift();

  const dir = `${context.cwd}/tmp/${root.join('/')}`;

  mkdirSync(dir, { recursive: true });

  const config = `${dir}/jest.config.js`;

  writeFileSync(config, jestConfig);

  return config;
}

export async function jestExecutor(
  options: JestExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const config = jestConfigParser(options, context);

  //Can only run tests with artifacts if not in watch mode
  if (options.testWithArtifacts && !options.watch && !options.watchAll) {
    const projGraph = createProjectGraph();

    const depContext = {
      workspaceRoot: context.root,
      target: {
        target: 'build',
        project: context.projectName,
      },
      logger: logger,
    };

    const { dependencies } = calculateProjectDependencies(
      projGraph,
      depContext
    );

    const built = checkDependentProjectsHaveBeenBuilt(depContext, dependencies);

    if (!built) {
      return { success: false };
    }

    config.config = createTmpJestConfig(options, context, dependencies);
  }

  const { results } = await runCLI(
    {
      ...config,
      rootDir: context.workspace.projects[context.projectName].root,
    },
    [config.config]
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
