import { existsSync } from 'fs';
import { dirname, join } from 'path';

import type { ChangelogRenderOptions } from '../../release/changelog-renderer';
import type { validReleaseVersionPrefixes } from '../command-line/release/version';
import { readJsonFile } from '../utils/fileutils';
import type { PackageManager } from '../utils/package-manager';
import { workspaceRoot } from '../utils/workspace-root';
import type {
  InputDefinition,
  TargetConfiguration,
  TargetDependencyConfig,
} from './workspace-json-project-json';

export type ImplicitDependencyEntry<T = '*' | string[]> = {
  [key: string]: T | ImplicitJsonSubsetDependency<T>;
};

export interface ImplicitJsonSubsetDependency<T = '*' | string[]> {
  [key: string]: T | ImplicitJsonSubsetDependency<T>;
}

/**
 * @deprecated Use {@link NxJsonConfiguration#defaultBase } instead
 */
export interface NxAffectedConfig {
  /**
   * Default based branch used by affected commands.
   */
  defaultBase?: string;
}

export type TargetDefaults = Record<string, Partial<TargetConfiguration>>;

export type TargetDependencies = Record<
  string,
  (TargetDependencyConfig | string)[]
>;

export interface NrwlJsPluginConfig {
  analyzeSourceFiles?: boolean;
  analyzePackageJson?: boolean;
  analyzeLockfile?: boolean;
  projectsAffectedByDependencyUpdates?: 'all' | 'auto' | string[];
}

interface NxInstallationConfiguration {
  /**
   * Version used for Nx
   */
  version: string;
  /**
   * Record<pluginPackageName, pluginVersion>. e.g.
   * plugins: { '@nx/angular': '1.0.0' }
   */
  plugins?: Record<string, string>;
}

/**
 * This named configuration interface represents the options prior to Nx v21. This interface will be made available
 * under LegacyNxReleaseVersionConfiguration throughout the lifetime of Nx v21.
 *
 * In Nx v22, this configuration interface will no longer be valid.
 */
export interface LegacyNxReleaseVersionConfiguration {
  generator?: string;
  generatorOptions?: Record<string, unknown>;
  /**
   * Enabling support for parsing semver bumps via conventional commits and reading the current version from
   * git tags is so common that we have a first class shorthand for it, which is false by default.
   *
   * Setting this to true is the same as adding the following to version.generatorOptions:
   * - currentVersionResolver: "git-tag"
   * - specifierSource: "conventional-commits"
   *
   * If the user attempts to mix and match these options with the shorthand, we will provide a helpful error.
   */
  conventionalCommits?: boolean;
}

export type ManifestRootToUpdate =
  | string
  | { path: string; preserveLocalDependencyProtocols: boolean };

export interface NxReleaseDockerConfiguration {
  /**
   * A command to run after validation of nx release configuration, but before docker versioning begins.
   * Useful for preparing docker build artifacts. If --dry-run is passed, the command is still executed,
   * but with the NX_DRY_RUN environment variable set to 'true'.
   */
  preVersionCommand?: string;
  /**
   * Projects which should use a no-op VersionActions implementation rather than any potentially inferred by default or via Inference Plugins.
   * Can be an array of project names (subset of projects in the release setup/release group) or a boolean (true means all projects).
   * e.g.
   * Consider a node application called `api` that does not require its `package.json` file to be versioned yet builds versioned docker images.
   * To ensure that JS Versioning does not take place, the following would be set in the `docker` config in `nx.release`
   * ```
   *   "docker": {
   *     "skipVersionActions": ["api"]
   *   }
   * ```
   */
  skipVersionActions?: string[] | boolean;
  /**
   * Record of named version patterns to choose between when versioning docker projects.
   *
   * e.g.
   * ```
   * "production": "{currentDate|YYMM.DD}.{shortCommitSha}",
   * "hotfix": "{currentDate|YYMM.DD}-hotfix"
   * ```
   */
  versionSchemes?: Record<string, string>;
  /**
   * Repository name for the image on the configured registry
   */
  repositoryName?: string;
  /**
   * Url of the Docker Image/Container Registry to push images to.
   * Defaults to Docker Hub.
   */
  registryUrl?: string;
}

// NOTE: It's important to keep the nx-schema.json in sync with this interface. If you make changes here, make sure they are reflected in the schema.
export interface NxReleaseVersionConfiguration {
  /**
   * Whether to use the legacy versioning strategy. This value was true in Nx v20 and became false in Nx v21.
   * The legacy versioning implementation will be removed in Nx v22, as will this flag.
   */
  useLegacyVersioning?: boolean;
  /**
   * Shorthand for enabling the current version of projects to be resolved from git tags,
   * and the next version to be determined by analyzing commit messages according to the
   * Conventional Commits specification.
   */
  conventionalCommits?: boolean;
  /**
   * A command to run after validation of nx release configuration, but before versioning begins.
   * Useful for preparing build artifacts. If --dry-run is passed, the command is still executed,
   * but with the NX_DRY_RUN environment variable set to 'true'.
   */
  preVersionCommand?: string;
  /**
   * The source to use for determining the specifier to use when versioning.
   * 'prompt' is the default and will interactively prompt the user for an explicit/imperative specifier.
   * 'conventional-commits' will attempt determine a specifier from commit messages conforming to the Conventional Commits specification.
   * 'version-plans' will determine the specifier from the version plan files available on disk.
   */
  specifierSource?: 'prompt' | 'conventional-commits' | 'version-plans';
  /**
   * A list of directories containing manifest files (such as package.json) to apply updates to when versioning.
   *
   * By default, only the project root will be used, but you could customize this to only version a manifest in a
   * dist directory, or even version multiple manifests in different directories, such as both source and dist.
   *
   * For more advanced scenarios, the preserveLocalDependencyProtocols can be overridden per manifest by providing
   * and object instead of a string.
   */
  manifestRootsToUpdate?: ManifestRootToUpdate[];
  /**
   * The resolver to use for determining the current version of a project during versioning.
   * This is needed for versioning approaches which involve relatively modifying a current version
   * to arrive at a new version, such as semver bumps like 'patch', 'minor' etc.
   *
   * Using 'none' explicitly declares that the current version is not needed to compute the new version, and
   * should only be used with appropriate version actions implementations that support it.
   */
  currentVersionResolver?: 'registry' | 'disk' | 'git-tag' | 'none';
  /**
   * Metadata to provide to the configured currentVersionResolver to help it in determining the current version.
   * What to pass here is specific to each resolver.
   */
  currentVersionResolverMetadata?: Record<string, unknown>;
  /**
   * The fallback version resolver to use when the configured currentVersionResolver fails to resolve the current version.
   */
  fallbackCurrentVersionResolver?: 'disk';
  /**
   * Whether or not this is the first release of one of more projects.
   * This removes certain validation checks that are not possible to enforce if the project has never been released before.
   */
  firstRelease?: boolean;
  /**
   * The prefix to use when versioning dependencies.
   * This can be one of the following: auto, '', '~', '^', '=', where auto means the existing prefix will be preserved.
   */
  versionPrefix?: (typeof validReleaseVersionPrefixes)[number];
  /**
   * Whether to delete the processed version plans file after versioning is complete. This is false by default because the
   * version plans are also needed for changelog generation.
   */
  deleteVersionPlans?: boolean;
  /**
   * When versioning independent projects, this controls whether to update their dependents (i.e. the things that depend on them).
   * 'never' means no dependents will be updated (unless they happen to be versioned directly as well).
   * 'auto' is the default and will cause dependents to be updated (a patch version bump) when a dependency is versioned.
   */
  updateDependents?: 'auto' | 'never';
  /**
   * Whether to log projects that have not changed during versioning.
   */
  logUnchangedProjects?: boolean;
  /**
   * The path to the version actions implementation to use for releasing all projects by default.
   * This can also be overridden on the release group and project levels.
   */
  versionActions?: string;
  /**
   * The specific options that are defined by each version actions implementation.
   * They will be passed to the version actions implementation when running a release.
   */
  versionActionsOptions?: Record<string, unknown>;
  /**
   * Whether to preserve local dependency protocols (e.g. file references, or the `workspace:` protocol in package.json files)
   * of local dependencies when updating them during versioning.
   *
   * This was false by default in legacy versioning, but is true by default now.
   */
  preserveLocalDependencyProtocols?: boolean;
}

export interface NxReleaseChangelogConfiguration {
  /**
   * Optionally create a release containing all relevant changes on a supported version control system, it
   * is false by default.
   *
   * NOTE: if createRelease is set on a group of projects, it will cause the default releaseTagPattern of
   * "{projectName}@{version}" to be used for those projects, even when versioning everything together.
   */
  createRelease?:
    | false
    | 'github'
    | 'gitlab'
    | {
        provider: 'github-enterprise-server';
        hostname: string;
        /**
         * If not set, this will default to `https://${hostname}/api/v3`
         */
        apiBaseUrl?: string;
      }
    | {
        provider: 'gitlab';
        hostname: string;
        /**
         * If not set, this will default to `https://${hostname}/api/v4`
         */
        apiBaseUrl?: string;
      };
  /**
   * This can either be set to a string value that will be written to the changelog file(s)
   * at the workspace root and/or within project directories, or set to `false` to specify
   * that no changelog entry should be made when there are no code changes.
   *
   * NOTE: The string value has a sensible default value and supports interpolation of
   * {projectName} when generating for project level changelogs.
   *
   * E.g. for a project level changelog you could customize the message to something like:
   * "entryWhenNoChanges": "There were no code changes for {projectName}"
   */
  entryWhenNoChanges?: string | false;
  /**
   * This is either a workspace path where the changelog markdown file will be created and read from,
   * or set to false to disable file creation altogether (e.g. if only using Github releases).
   *
   * Interpolation of {projectName}, {projectRoot} and {workspaceRoot} is supported.
   *
   * The defaults are:
   * - "{workspaceRoot}/CHANGELOG.md" at the workspace level
   * - "{projectRoot}/CHANGELOG.md" at the project level
   */
  file?: string | false;
  /**
   * A path to a valid changelog renderer function used to transform commit messages and other metadata into
   * the final changelog (usually in markdown format). Its output can be modified using the optional `renderOptions`.
   *
   * By default, the renderer is set to "nx/release/changelog-renderer" which nx provides out of the box.
   */
  renderer?: string;
  renderOptions?: ChangelogRenderOptions;
}

export interface NxReleaseGitConfiguration {
  /**
   * Whether or not to automatically commit the changes made by current command
   */
  commit?: boolean;
  /**
   * Custom git commit message to use when committing the changes made by this command {version} will be dynamically interpolated when performing fixed releases, interpolated tags will be appended to the commit body when performing independent releases.
   */
  commitMessage?: string;
  /**
   * Additional arguments (added after the --message argument, which may or may not be customized with --git-commit-message) to pass to the `git commit` command invoked behind the scenes. May be a string or array of strings.
   */
  commitArgs?: string | string[];
  /**
   * Whether or not to stage the changes made by this command. Always treated as true if commit is true.
   */
  stageChanges?: boolean;
  /**
   * Whether or not to automatically tag the changes made by this command
   */
  tag?: boolean;
  /**
   * Custom git tag message to use when tagging the changes made by this command. This defaults to be the same value as the tag itself.
   */
  tagMessage?: string;
  /**
   * Additional arguments to pass to the `git tag` command invoked behind the scenes. May be a string or array of strings.
   */
  tagArgs?: string | string[];
  /**
   * Whether or not to automatically push the changes made by this command to the remote git repository.
   */
  push?: boolean;
  /**
   * Additional arguments to pass to the `git push` command invoked behind the scenes. May be a string or array of strings.
   */
  pushArgs?: string | string[];
}

export interface NxReleaseConventionalCommitsConfiguration {
  types?: Record<
    string,
    /**
     * A map of commit types to their configuration.
     * If a type is set to 'true', then it will be enabled with the default 'semverBump' of 'patch' and will appear in the changelog.
     * If a type is set to 'false', then it will not trigger a version bump and will be hidden from the changelog.
     */
    | {
        /**
         * The semver bump to apply when a commit of this type is found.
         * If set to "none", the commit will be ignored for versioning purposes.
         */
        semverBump?: 'patch' | 'minor' | 'major' | 'none';
        /**
         * Configuration for the changelog section for commits of this type.
         * If set to 'true', then commits of this type will be included in the changelog with their default title for the type.
         * If set to 'false', then commits of this type will not be included in the changelog.
         */
        changelog?:
          | {
              title?: string;
              hidden?: boolean;
            }
          | boolean;
      }
    | boolean
  >;
}

export interface NxReleaseVersionPlansConfiguration {
  /**
   * Changes to files matching any of these optional patterns will be excluded from the affected project logic within the `nx release plan:check`
   * command. This is useful for ignoring files that are not relevant to the versioning process, such as documentation or configuration files.
   */
  ignorePatternsForPlanCheck?: string[];
}

export interface NxReleaseConfiguration {
  /**
   * Shorthand for amending the projects which will be included in the implicit default release group (all projects by default).
   * @note Only one of `projects` or `groups` can be specified, the cannot be used together.
   */
  projects?: string[] | string;
  /**
   * Configure options to handle versioning docker projects. Docker projects will be identified via the presence of a Dockerfile.
   * Set to `true` to enable with default settings, or provide a configuration object for custom settings.
   */
  docker?: NxReleaseDockerConfiguration | true;
  /**
   * @note When no projects or groups are configured at all (the default), all projects in the workspace are treated as
   * if they were in a release group together with a fixed relationship.
   */
  groups?: Record<
    string, // group name
    {
      /**
       * Whether to version and release projects within the group independently, or together in lock step ("fixed").
       * If not set on the group, this will be informed by the projectsRelationship config at the top level.
       */
      projectsRelationship?: 'fixed' | 'independent';
      /**
       * Required list of one or more projects to include in the release group. Any single project can
       * only be used in a maximum of one release group.
       */
      projects: string[] | string;
      /**
       * Configure options to handle versioning docker projects for this group.
       * Set to `true` to enable with default settings, or provide a configuration object for custom settings.
       */
      docker?:
        | (NxReleaseDockerConfiguration & {
            /**
             * A command to run after validation of nx release configuration, but before docker versioning begins.
             * Used for preparing docker build artifacts. If --dry-run is passed, the command is still executed, but
             * with the NX_DRY_RUN environment variable set to 'true'.
             * It will run in addition to the global `preVersionCommand`
             */
            groupPreVersionCommand?: string;
          })
        | true;
      /**
       * Optionally override version configuration for this group.
       *
       * NOTE: git configuration is not supported at the group level, only the root/command level
       */
      version?: (
        | LegacyNxReleaseVersionConfiguration
        | NxReleaseVersionConfiguration
      ) & {
        /**
         * A command to run after validation of nx release configuration, but before versioning begins.
         * Used for preparing build artifacts. If --dry-run is passed, the command is still executed, but
         * with the NX_DRY_RUN environment variable set to 'true'.
         * It will run in addition to the global `preVersionCommand`
         */
        groupPreVersionCommand?: string;
      };
      /**
       * Project changelogs are disabled by default.
       *
       * Here you can optionally override project changelog configuration for this group.
       * Notes about boolean values:
       *
       * - true = enable project level changelogs using default configuration
       * - false = explicitly disable project level changelogs
       *
       * NOTE: git configuration is not supported at the group level, only the root/command level
       */
      changelog?: NxReleaseChangelogConfiguration | boolean;
      /**
       * Optionally override the git/release tag pattern to use for this group.
       */
      releaseTagPattern?: string;
      /**
       * By default, we will try and resolve the latest match for the releaseTagPattern from the current branch,
       * falling back to all branches if no match is found on the current branch.
       *
       * - Setting this to true will cause us to ALWAYS check all branches for the latest match.
       * - Setting it to false will cause us to ONLY check the current branch for the latest match.
       * - Setting it to an array of strings will cause us to check all branches WHEN the current branch matches one of the strings in the array. Glob patterns are supported.
       */
      releaseTagPatternCheckAllBranchesWhen?: boolean | string[];
      /**
       * By default, we will use semver when searching through the tags to find the latest matching tag.
       *
       * - Setting this to true will cause us to use semver to match the version
       * - Setting this to false will cause us to not use semver to match the version allowing for non-semver versions
       */
      releaseTagPatternRequireSemver?: boolean;
      /**
       * When set to true and multiple tags match your configured "releaseTagPattern", the git tag matching logic will strictly prefer the tag which contain a semver preid which matches the one
       * given to the nx release invocation.
       *
       * For example, let's say your "releaseTagPattern" is "{projectName}@{version}" and you have the following tags for project "my-lib", which uses semver:
       * - my-lib@1.2.4-beta.1
       * - my-lib@1.2.4-alpha.1
       * - my-lib@1.2.3
       *
       * If "releaseTagPatternStrictPreid" is set to true and you run:
       * - `nx release --preid beta`, the git tag "my-lib@1.2.4-beta.1" will be resolved.
       * - `nx release --preid alpha`, the git tag "my-lib@1.2.4-alpha.1" will be resolved.
       * - `nx release` (no preid), the git tag "my-lib@1.2.3" will be resolved.
       *
       * If "releaseTagPatternStrictPreid" is set to false, the git tag "my-lib@1.2.4-beta.1" will always be resolved as the latest tag that matches the pattern,
       * regardless of any preid which gets passed to nx release.
       *
       * NOTE: This feature was added in a minor version and is therefore set to false by default, but this may change in a future major version.
       */
      releaseTagPatternStrictPreid?: boolean;
      /**
       * Enables using version plans as a specifier source for versioning and
       * to determine changes for changelog generation.
       */
      versionPlans?: NxReleaseVersionPlansConfiguration | boolean;
    }
  >;
  /**
   * Configures the default value for all groups that don't explicitly state their own projectsRelationship.
   *
   * By default, this is set to "fixed" which means all projects in the workspace will be versioned and
   * released together in lock step.
   */
  projectsRelationship?: 'fixed' | 'independent';
  changelog?: {
    /**
     * Enable or override configuration for git operations as part of the changelog subcommand
     */
    git?: NxReleaseGitConfiguration;
    /**
     * Workspace changelog is enabled by default. Notes about boolean values:
     *
     * - true = explicitly enable workspace changelog using default configuration
     * - false = disable workspace changelog
     */
    workspaceChangelog?: NxReleaseChangelogConfiguration | boolean;
    /**
     * Project changelogs are disabled by default. Notes about boolean values:
     *
     * - true = enable project level changelogs using default configuration
     * - false = explicitly disable project level changelogs
     */
    projectChangelogs?: NxReleaseChangelogConfiguration | boolean;
    /**
     * Whether or not to automatically look up the first commit for the workspace (or package, if versioning independently)
     * and use that as the starting point for changelog generation. If this is not enabled, changelog generation will fail
     * if there is no previous matching git tag to use as a starting point.
     */
    automaticFromRef?: boolean;
  };
  /**
   * If no version configuration is provided, we will assume that TypeScript/JavaScript experience is what is desired,
   * allowing for terser release configuration for the common case.
   */
  version?: (
    | LegacyNxReleaseVersionConfiguration
    | NxReleaseVersionConfiguration
  ) & {
    useLegacyVersioning?: boolean;
    git?: NxReleaseGitConfiguration;
    preVersionCommand?: string;
  };
  /**
   * Optionally override the git/release tag pattern to use. This field is the source of truth
   * for changelog generation and release tagging, as well as for conventional commits parsing.
   *
   * It supports interpolating the version as {version} and (if releasing independently or forcing
   * project level version control system releases) the project name as {projectName} within the string.
   *
   * The default releaseTagPattern for fixed/unified releases is: "v{version}"
   * The default releaseTagPattern for independent releases at the project level is: "{projectName}@{version}"
   */
  releaseTagPattern?: string;
  /**
   * By default, we will try and resolve the latest match for the releaseTagPattern from the current branch,
   * falling back to all branches if no match is found on the current branch.
   *
   * - Setting this to true will cause us to ALWAYS check all branches for the latest match.
   * - Setting it to false will cause us to ONLY check the current branch for the latest match.
   * - Setting it to an array of strings will cause us to check all branches WHEN the current branch matches one of the strings in the array. Glob patterns are supported.
   */
  releaseTagPatternCheckAllBranchesWhen?: boolean | string[];
  /**
   * By default, we will use semver when searching through the tags to find the latest matching tag.
   *
   * - Setting this to true will cause us to use semver to match the version
   * - Setting this to false will cause us to not use semver to match the version allowing for non-semver versions
   */
  releaseTagPatternRequireSemver?: boolean;
  /**
   * When set to true and multiple tags match your configured "releaseTagPattern", the git tag matching logic will strictly prefer the tag which contain a semver preid which matches the one
   * given to the nx release invocation.
   *
   * For example, let's say your "releaseTagPattern" is "{projectName}@{version}" and you have the following tags for project "my-lib", which uses semver:
   * - my-lib@1.2.4-beta.1
   * - my-lib@1.2.4-alpha.1
   * - my-lib@1.2.3
   *
   * If "releaseTagPatternStrictPreid" is set to true and you run:
   * - `nx release --preid beta`, the git tag "my-lib@1.2.4-beta.1" will be resolved.
   * - `nx release --preid alpha`, the git tag "my-lib@1.2.4-alpha.1" will be resolved.
   * - `nx release` (no preid), the git tag "my-lib@1.2.3" will be resolved.
   *
   * If "releaseTagPatternStrictPreid" is set to false, the git tag "my-lib@1.2.4-beta.1" will always be resolved as the latest tag that matches the pattern,
   * regardless of any preid which gets passed to nx release.
   *
   * NOTE: This feature was added in a minor version and is therefore set to false by default, but this may change in a future major version.
   */
  releaseTagPatternStrictPreid?: boolean;
  /**
   * Enable and configure automatic git operations as part of the release
   */
  git?: NxReleaseGitConfiguration;
  conventionalCommits?: NxReleaseConventionalCommitsConfiguration;
  /**
   * Enables using version plans as a specifier source for versioning and
   * to determine changes for changelog generation.
   */
  versionPlans?: NxReleaseVersionPlansConfiguration | boolean;
}

export interface NxSyncConfiguration {
  /**
   * List of workspace-wide sync generators to be run (not attached to targets).
   */
  globalGenerators?: string[];

  /**
   * Options for the sync generators.
   */
  generatorOptions?: {
    [generatorName: string]: Record<string, unknown>;
  };

  /**
   * Whether to automatically apply sync generator changes when running tasks.
   * If not set, the user will be prompted in interactive mode.
   * If set to `true`, the user will not be prompted and the changes will be applied.
   * If set to `false`, the user will not be prompted and the changes will not be applied.
   */
  applyChanges?: boolean;

  /**
   * List of registered task sync generators to disable.
   */
  disabledTaskSyncGenerators?: string[];
}

/**
 * Nx.json configuration
 *
 * @note: when adding properties here add them to `allowedWorkspaceExtensions` in adapter/compat.ts
 */
export interface NxJsonConfiguration<T = '*' | string[]> {
  $schema?: string;
  /**
   * Optional (additional) Nx.json configuration file which becomes a base for this one
   */
  extends?: string;
  /**
   * Map of files to projects that implicitly depend on them
   * @deprecated use {@link namedInputs} instead. For more information see https://nx.dev/deprecated/global-implicit-dependencies#global-implicit-dependencies
   */
  implicitDependencies?: ImplicitDependencyEntry<T>;
  /**
   * Named inputs targets can refer to reduce duplication
   */
  namedInputs?: { [inputName: string]: (string | InputDefinition)[] };
  /**
   * Dependencies between different target names across all projects
   */
  targetDefaults?: TargetDefaults;
  /**
   * Default options for `nx affected`
   * @deprecated use {@link defaultBase} instead. For more information see https://nx.dev/deprecated/affected-config#affected-config
   */
  affected?: NxAffectedConfig;

  /**
   * Default value for --base used by `nx affected` and `nx format`.
   */
  defaultBase?: string;

  /**
   * Where new apps + libs should be placed
   */
  workspaceLayout?: {
    libsDir?: string;
    appsDir?: string;
  };
  /**
   * @deprecated Custom task runners will be replaced by a new API starting with Nx 21. More info: https://nx.dev/deprecated/custom-tasks-runner
   * Available Task Runners for Nx to use
   */
  tasksRunnerOptions?: {
    [tasksRunnerName: string]: {
      /**
       * Path to resolve the runner
       */
      runner?: string;
      /**
       * Default options for the runner
       */
      options?: any;
    };
  };
  /**
   * List of default values used by generators.
   *
   * These defaults are global. They are used when no other defaults are configured.
   *
   * Example:
   *
   * ```
   * {
   *   "@nx/react": {
   *     "library": {
   *       "style": "scss"
   *     }
   *   }
   * }
   * ```
   */
  generators?: { [collectionName: string]: { [generatorName: string]: any } };

  /**
   * Default generator collection. It is used when no collection is provided.
   */
  cli?: {
    packageManager?: PackageManager;

    defaultProjectName?: string;
  };
  /**
   * Plugins for extending the project graph
   */
  plugins?: PluginConfiguration[];

  /**
   * Configuration for Nx Plugins
   */
  pluginsConfig?: Record<string, Record<string, unknown>>;

  /**
   * Default project. When project isn't provided, the default project
   * will be used. Convenient for small workspaces with one main application.
   */
  defaultProject?: string;

  /**
   * Configures the Nx installation for a repo. Useful for maintaining  a separate
   * set of dependencies for Nx + Plugins compared to the base package.json, but also
   * useful for workspaces that don't have a root package.json + node_modules.
   */
  installation?: NxInstallationConfiguration;

  /**
   * Configuration for `nx release` (versioning and publishing of applications and libraries)
   */
  release?: NxReleaseConfiguration;

  /**
   * If specified Nx will use nx-cloud by default with the given token.
   * To use a different runner that accepts an access token, define it in {@link tasksRunnerOptions}
   */
  nxCloudAccessToken?: string;

  /**
   * If specified Nx will use nx-cloud by default with the given cloud id.
   * To use a different runner that accepts a cloud id, define it in {@link tasksRunnerOptions}
   */
  nxCloudId?: string;

  /**
   * Specifies the url pointing to an instance of nx cloud. Used for remote
   * caching and displaying run links.
   */
  nxCloudUrl?: string;

  /**
   * Specifies the encryption key used to encrypt artifacts data before sending it to nx cloud.
   */
  nxCloudEncryptionKey?: string;

  /**
   * Specifies how many tasks can be run in parallel.
   */
  parallel?: number;

  /**
   * Changes the directory used by Nx to store its cache.
   */
  cacheDirectory?: string;

  /**
   * Set this to false to disable the daemon.
   */
  useDaemonProcess?: boolean;

  /**
   * Set this to false to disable adding inference plugins when generating new projects
   */
  useInferencePlugins?: boolean;

  /**
   * Set this to true to disable connection to Nx Cloud
   */
  neverConnectToCloud?: boolean;

  /**
   * Configuration for the `nx sync` command.
   */
  sync?: NxSyncConfiguration;

  /**
   * Sets the maximum size of the local cache. Accepts a number followed by a unit (e.g. 100MB). Accepted units are B, KB, MB, and GB.
   */
  maxCacheSize?: string;

  /**
   * Settings for the Nx Terminal User Interface (TUI)
   */
  tui?: {
    /**
     * Whether to enable the TUI whenever possible (based on the current environment and terminal).
     */
    enabled?: boolean;
    /**
     * Whether to exit the TUI automatically after all tasks finish.
     *
     * - If set to `true`, the TUI will exit immediately.
     * - If set to `false` the TUI will not automatically exit.
     * - If set to a number, an interruptible countdown popup will be shown for that many seconds before the TUI exits.
     */
    autoExit?: boolean | number;
  };
}

export type PluginConfiguration = string | ExpandedPluginConfiguration;

export type ExpandedPluginConfiguration<T = unknown> = {
  plugin: string;
  options?: T;
  include?: string[];
  exclude?: string[];
};

export function readNxJson(root: string = workspaceRoot): NxJsonConfiguration {
  const nxJson = join(root, 'nx.json');
  if (existsSync(nxJson)) {
    const nxJsonConfiguration = readJsonFile<NxJsonConfiguration>(nxJson);
    if (nxJsonConfiguration.extends) {
      const extendedNxJsonPath = require.resolve(nxJsonConfiguration.extends, {
        paths: [dirname(nxJson)],
      });
      const baseNxJson = readJsonFile<NxJsonConfiguration>(extendedNxJsonPath);
      return {
        ...baseNxJson,
        ...nxJsonConfiguration,
      };
    } else {
      return nxJsonConfiguration;
    }
  } else {
    try {
      return readJsonFile(join(__dirname, '..', '..', 'presets', 'core.json'));
    } catch (e) {
      return {};
    }
  }
}

export function hasNxJson(root: string): boolean {
  const nxJson = join(root, 'nx.json');
  return existsSync(nxJson);
}
