# Module: index

## Table of contents

### Enumerations

- [ChangeType](../../angular/nx-devkit/index#changetype)
- [DependencyType](../../angular/nx-devkit/index#dependencytype)

### Classes

- [ProjectGraphBuilder](../../angular/nx-devkit/index#projectgraphbuilder)

### Interfaces

- [ExecutorContext](../../angular/nx-devkit/index#executorcontext)
- [FileChange](../../angular/nx-devkit/index#filechange)
- [FileData](../../angular/nx-devkit/index#filedata)
- [ImplicitJsonSubsetDependency](../../angular/nx-devkit/index#implicitjsonsubsetdependency)
- [JsonParseOptions](../../angular/nx-devkit/index#jsonparseoptions)
- [JsonSerializeOptions](../../angular/nx-devkit/index#jsonserializeoptions)
- [NxAffectedConfig](../../angular/nx-devkit/index#nxaffectedconfig)
- [NxJsonConfiguration](../../angular/nx-devkit/index#nxjsonconfiguration)
- [NxJsonProjectConfiguration](../../angular/nx-devkit/index#nxjsonprojectconfiguration)
- [NxPlugin](../../angular/nx-devkit/index#nxplugin)
- [ProjectConfiguration](../../angular/nx-devkit/index#projectconfiguration)
- [ProjectFileMap](../../angular/nx-devkit/index#projectfilemap)
- [ProjectGraph](../../angular/nx-devkit/index#projectgraph)
- [ProjectGraphDependency](../../angular/nx-devkit/index#projectgraphdependency)
- [ProjectGraphNode](../../angular/nx-devkit/index#projectgraphnode)
- [ProjectGraphProcessorContext](../../angular/nx-devkit/index#projectgraphprocessorcontext)
- [StringDeletion](../../angular/nx-devkit/index#stringdeletion)
- [StringInsertion](../../angular/nx-devkit/index#stringinsertion)
- [Target](../../angular/nx-devkit/index#target)
- [TargetConfiguration](../../angular/nx-devkit/index#targetconfiguration)
- [TargetDependencyConfig](../../angular/nx-devkit/index#targetdependencyconfig)
- [Task](../../angular/nx-devkit/index#task)
- [TaskGraph](../../angular/nx-devkit/index#taskgraph)
- [Tree](../../angular/nx-devkit/index#tree)
- [Workspace](../../angular/nx-devkit/index#workspace)
- [WorkspaceJsonConfiguration](../../angular/nx-devkit/index#workspacejsonconfiguration)

### Type aliases

- [Executor](../../angular/nx-devkit/index#executor)
- [Generator](../../angular/nx-devkit/index#generator)
- [GeneratorCallback](../../angular/nx-devkit/index#generatorcallback)
- [ImplicitDependencyEntry](../../angular/nx-devkit/index#implicitdependencyentry)
- [PackageManager](../../angular/nx-devkit/index#packagemanager)
- [ProjectType](../../angular/nx-devkit/index#projecttype)
- [StringChange](../../angular/nx-devkit/index#stringchange)
- [TaskGraphExecutor](../../angular/nx-devkit/index#taskgraphexecutor)
- [WorkspaceConfiguration](../../angular/nx-devkit/index#workspaceconfiguration)

### Variables

- [logger](../../angular/nx-devkit/index#logger)

### Functions

- [addDependenciesToPackageJson](../../angular/nx-devkit/index#adddependenciestopackagejson)
- [addProjectConfiguration](../../angular/nx-devkit/index#addprojectconfiguration)
- [applyChangesToString](../../angular/nx-devkit/index#applychangestostring)
- [convertNxExecutor](../../angular/nx-devkit/index#convertnxexecutor)
- [convertNxGenerator](../../angular/nx-devkit/index#convertnxgenerator)
- [detectPackageManager](../../angular/nx-devkit/index#detectpackagemanager)
- [formatFiles](../../angular/nx-devkit/index#formatfiles)
- [generateFiles](../../angular/nx-devkit/index#generatefiles)
- [getPackageManagerCommand](../../angular/nx-devkit/index#getpackagemanagercommand)
- [getPackageManagerVersion](../../angular/nx-devkit/index#getpackagemanagerversion)
- [getProjects](../../angular/nx-devkit/index#getprojects)
- [getWorkspaceLayout](../../angular/nx-devkit/index#getworkspacelayout)
- [getWorkspacePath](../../angular/nx-devkit/index#getworkspacepath)
- [installPackagesTask](../../angular/nx-devkit/index#installpackagestask)
- [joinPathFragments](../../angular/nx-devkit/index#joinpathfragments)
- [moveFilesToNewDirectory](../../angular/nx-devkit/index#movefilestonewdirectory)
- [names](../../angular/nx-devkit/index#names)
- [normalizePath](../../angular/nx-devkit/index#normalizepath)
- [offsetFromRoot](../../angular/nx-devkit/index#offsetfromroot)
- [parseJson](../../angular/nx-devkit/index#parsejson)
- [parseTargetString](../../angular/nx-devkit/index#parsetargetstring)
- [readJson](../../angular/nx-devkit/index#readjson)
- [readJsonFile](../../angular/nx-devkit/index#readjsonfile)
- [readProjectConfiguration](../../angular/nx-devkit/index#readprojectconfiguration)
- [readTargetOptions](../../angular/nx-devkit/index#readtargetoptions)
- [readWorkspaceConfiguration](../../angular/nx-devkit/index#readworkspaceconfiguration)
- [removeDependenciesFromPackageJson](../../angular/nx-devkit/index#removedependenciesfrompackagejson)
- [removeProjectConfiguration](../../angular/nx-devkit/index#removeprojectconfiguration)
- [runExecutor](../../angular/nx-devkit/index#runexecutor)
- [serializeJson](../../angular/nx-devkit/index#serializejson)
- [stripIndents](../../angular/nx-devkit/index#stripindents)
- [stripJsonComments](../../angular/nx-devkit/index#stripjsoncomments)
- [targetToTargetString](../../angular/nx-devkit/index#targettotargetstring)
- [toJS](../../angular/nx-devkit/index#tojs)
- [updateJson](../../angular/nx-devkit/index#updatejson)
- [updateProjectConfiguration](../../angular/nx-devkit/index#updateprojectconfiguration)
- [updateTsConfigsToJs](../../angular/nx-devkit/index#updatetsconfigstojs)
- [updateWorkspaceConfiguration](../../angular/nx-devkit/index#updateworkspaceconfiguration)
- [visitNotIgnoredFiles](../../angular/nx-devkit/index#visitnotignoredfiles)
- [writeJson](../../angular/nx-devkit/index#writejson)
- [writeJsonFile](../../angular/nx-devkit/index#writejsonfile)

## Enumerations

### ChangeType

• **ChangeType**: _object_

---

### DependencyType

• **DependencyType**: _object_

Type of dependency between projects

## Classes

### ProjectGraphBuilder

• **ProjectGraphBuilder**: _object_

Builder for adding nodes and dependencies to a [ProjectGraph](../../angular/nx-devkit/index#projectgraph)

## Interfaces

### ExecutorContext

• **ExecutorContext**: _object_

Context that is passed into an executor

---

### FileChange

• **FileChange**: _object_

Description of a file change in the Nx virtual file system/

---

### FileData

• **FileData**: _object_

Some metadata about a file

---

### ImplicitJsonSubsetDependency

• **ImplicitJsonSubsetDependency**<T\>: _object_

#### Type parameters

| Name | Default             |
| :--- | :------------------ |
| `T`  | `"*"` \| _string_[] |

---

### JsonParseOptions

• **JsonParseOptions**: _object_

---

### JsonSerializeOptions

• **JsonSerializeOptions**: _object_

---

### NxAffectedConfig

• **NxAffectedConfig**: _object_

---

### NxJsonConfiguration

• **NxJsonConfiguration**<T\>: _object_

Nx.json configuration

#### Type parameters

| Name | Default             |
| :--- | :------------------ |
| `T`  | `"*"` \| _string_[] |

---

### NxJsonProjectConfiguration

• **NxJsonProjectConfiguration**: _object_

---

### NxPlugin

• **NxPlugin**: _object_

A plugin for Nx

---

### ProjectConfiguration

• **ProjectConfiguration**: _object_

Project configuration

---

### ProjectFileMap

• **ProjectFileMap**: _object_

A list of files separated by the project they belong to

---

### ProjectGraph

• **ProjectGraph**<T\>: _object_

A Graph of projects in the workspace and dependencies between them

#### Type parameters

| Name | Default |
| :--- | :------ |
| `T`  | _any_   |

---

### ProjectGraphDependency

• **ProjectGraphDependency**: _object_

A dependency between two projects

---

### ProjectGraphNode

• **ProjectGraphNode**<T\>: _object_

A node describing a project in a workspace

#### Type parameters

| Name | Default |
| :--- | :------ |
| `T`  | _any_   |

---

### ProjectGraphProcessorContext

• **ProjectGraphProcessorContext**: _object_

Additional information to be used to process a project graph

---

### StringDeletion

• **StringDeletion**: _object_

---

### StringInsertion

• **StringInsertion**: _object_

---

### Target

• **Target**: _object_

---

### TargetConfiguration

• **TargetConfiguration**: _object_

Target's configuration

---

### TargetDependencyConfig

• **TargetDependencyConfig**: _object_

---

### Task

• **Task**: _object_

A representation of the invocation of an Executor

---

### TaskGraph

• **TaskGraph**: _object_

Graph of Tasks to be executed

---

### Tree

• **Tree**: _object_

Virtual file system tree.

---

### Workspace

• **Workspace**: _object_

---

### WorkspaceJsonConfiguration

• **WorkspaceJsonConfiguration**: _object_

Workspace configuration

## Type aliases

### Executor

Ƭ **Executor**<T\>: (`options`: T, `context`: [_ExecutorContext_](../../angular/nx-devkit/index#executorcontext)) => _Promise_<{ `success`: _boolean_ }\> \| _AsyncIterableIterator_<{ `success`: _boolean_ }\>

Implementation of a target of a project

#### Type parameters

| Name | Default |
| :--- | :------ |
| `T`  | _any_   |

#### Type declaration

▸ (`options`: T, `context`: [_ExecutorContext_](../../angular/nx-devkit/index#executorcontext)): _Promise_<{ `success`: _boolean_ }\> \| _AsyncIterableIterator_<{ `success`: _boolean_ }\>

#### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `options` | T                                                                  |
| `context` | [_ExecutorContext_](../../angular/nx-devkit/index#executorcontext) |

**Returns:** _Promise_<{ `success`: _boolean_ }\> \| _AsyncIterableIterator_<{ `success`: _boolean_ }\>

---

### Generator

Ƭ **Generator**<T\>: (`tree`: _any_, `schema`: T) => _void_ \| [_GeneratorCallback_](../../angular/nx-devkit/index#generatorcallback) \| _Promise_<void \| [_GeneratorCallback_](../../angular/nx-devkit/index#generatorcallback)\>

A function that schedules updates to the filesystem to be done atomically

#### Type parameters

| Name | Default   |
| :--- | :-------- |
| `T`  | _unknown_ |

#### Type declaration

▸ (`tree`: _any_, `schema`: T): _void_ \| [_GeneratorCallback_](../../angular/nx-devkit/index#generatorcallback) \| _Promise_<void \| [_GeneratorCallback_](../../angular/nx-devkit/index#generatorcallback)\>

#### Parameters

| Name     | Type  |
| :------- | :---- |
| `tree`   | _any_ |
| `schema` | T     |

**Returns:** _void_ \| [_GeneratorCallback_](../../angular/nx-devkit/index#generatorcallback) \| _Promise_<void \| [_GeneratorCallback_](../../angular/nx-devkit/index#generatorcallback)\>

---

### GeneratorCallback

Ƭ **GeneratorCallback**: () => _void_ \| _Promise_<void\>

A callback function that is executed after changes are made to the file system

#### Type declaration

▸ (): _void_ \| _Promise_<void\>

**Returns:** _void_ \| _Promise_<void\>

---

### ImplicitDependencyEntry

Ƭ **ImplicitDependencyEntry**<T\>: _object_

#### Type parameters

| Name | Default             |
| :--- | :------------------ |
| `T`  | `"*"` \| _string_[] |

#### Type declaration

---

### PackageManager

Ƭ **PackageManager**: `"yarn"` \| `"pnpm"` \| `"npm"`

---

### ProjectType

Ƭ **ProjectType**: `"library"` \| `"application"`

Type of project supported

---

### StringChange

Ƭ **StringChange**: [_StringInsertion_](../../angular/nx-devkit/index#stringinsertion) \| [_StringDeletion_](../../angular/nx-devkit/index#stringdeletion)

A change to be made to a string

---

### TaskGraphExecutor

Ƭ **TaskGraphExecutor**<T\>: (`taskGraph`: [_TaskGraph_](../../angular/nx-devkit/index#taskgraph), `options`: _Record_<string, T\>, `overrides`: T, `context`: [_ExecutorContext_](../../angular/nx-devkit/index#executorcontext)) => _Promise_<Record<string, { `success`: _boolean_ ; `terminalOutput`: _string_ }\>\>

Implementation of a target of a project that handles multiple projects to be batched

#### Type parameters

| Name | Default |
| :--- | :------ |
| `T`  | _any_   |

#### Type declaration

▸ (`taskGraph`: [_TaskGraph_](../../angular/nx-devkit/index#taskgraph), `options`: _Record_<string, T\>, `overrides`: T, `context`: [_ExecutorContext_](../../angular/nx-devkit/index#executorcontext)): _Promise_<Record<string, { `success`: _boolean_ ; `terminalOutput`: _string_ }\>\>

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `taskGraph` | [_TaskGraph_](../../angular/nx-devkit/index#taskgraph)             |
| `options`   | _Record_<string, T\>                                               |
| `overrides` | T                                                                  |
| `context`   | [_ExecutorContext_](../../angular/nx-devkit/index#executorcontext) |

**Returns:** _Promise_<Record<string, { `success`: _boolean_ ; `terminalOutput`: _string_ }\>\>

---

### WorkspaceConfiguration

Ƭ **WorkspaceConfiguration**: _Omit_<[_WorkspaceJsonConfiguration_](../../angular/nx-devkit/index#workspacejsonconfiguration), `"projects"`\> & _Omit_<[_NxJsonConfiguration_](../../angular/nx-devkit/index#nxjsonconfiguration), `"projects"`\>

## Variables

### logger

• `Const` **logger**: NxLogger

## Functions

### addDependenciesToPackageJson

▸ **addDependenciesToPackageJson**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `dependencies`: _Record_<string, string\>, `devDependencies`: _Record_<string, string\>, `packageJsonPath?`: _string_): [_GeneratorCallback_](../../angular/nx-devkit/index#generatorcallback)

Add Dependencies and Dev Dependencies to package.json

For example:

```typescript
addDependenciesToPackageJson(host, { react: 'latest' }, { jest: 'latest' });
```

This will **add** `react` and `jest` to the dependencies and devDependencies sections of package.json respectively.

#### Parameters

| Name              | Type                                         | Default value  | Description                                                             |
| :---------------- | :------------------------------------------- | :------------- | :---------------------------------------------------------------------- |
| `host`            | [_Tree_](../../angular/nx-devkit/index#tree) | -              | Tree representing file system to modify                                 |
| `dependencies`    | _Record_<string, string\>                    | -              | Dependencies to be added to the dependencies section of package.json    |
| `devDependencies` | _Record_<string, string\>                    | -              | Dependencies to be added to the devDependencies section of package.json |
| `packageJsonPath` | _string_                                     | 'package.json' | Path to package.json                                                    |

**Returns:** [_GeneratorCallback_](../../angular/nx-devkit/index#generatorcallback)

Callback to install dependencies only if necessary. undefined is returned if changes are not necessary.

---

### addProjectConfiguration

▸ **addProjectConfiguration**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `projectName`: _string_, `projectConfiguration`: [_ProjectConfiguration_](../../angular/nx-devkit/index#projectconfiguration) & [_NxJsonProjectConfiguration_](../../angular/nx-devkit/index#nxjsonprojectconfiguration), `standalone?`: _boolean_): _void_

Adds project configuration to the Nx workspace.

The project configuration is stored in workspace.json and nx.json. The utility will update
both files.

#### Parameters

| Name                   | Type                                                                                                                                                                    | Default value | Description                                                                                |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :----------------------------------------------------------------------------------------- |
| `host`                 | [_Tree_](../../angular/nx-devkit/index#tree)                                                                                                                            | -             | the file system tree                                                                       |
| `projectName`          | _string_                                                                                                                                                                | -             | unique name. Often directories are part of the name (e.g., mydir-mylib)                    |
| `projectConfiguration` | [_ProjectConfiguration_](../../angular/nx-devkit/index#projectconfiguration) & [_NxJsonProjectConfiguration_](../../angular/nx-devkit/index#nxjsonprojectconfiguration) | -             | project configuration                                                                      |
| `standalone`           | _boolean_                                                                                                                                                               | false         | should the project use package.json? If false, the project config is inside workspace.json |

**Returns:** _void_

---

### applyChangesToString

▸ **applyChangesToString**(`text`: _string_, `changes`: [_StringChange_](../../angular/nx-devkit/index#stringchange)[]): _string_

Applies a list of changes to a string's original value.

This is useful when working with ASTs.

For Example, to rename a property in a method's options:

```typescript
const code = `bootstrap({
  target: document.querySelector('#app')
})`;

const indexOfPropertyName = 13; // Usually determined by analyzing an AST.
const updatedCode = applyChangesToString(code, [
  {
    type: ChangeType.Insert,
    index: indexOfPropertyName,
    text: 'element',
  },
  {
    type: ChangeType.Delete,
    start: indexOfPropertyName,
    length: 6,
  },
]);

bootstrap({
  element: document.querySelector('#app'),
});
```

#### Parameters

| Name      | Type                                                           |
| :-------- | :------------------------------------------------------------- |
| `text`    | _string_                                                       |
| `changes` | [_StringChange_](../../angular/nx-devkit/index#stringchange)[] |

**Returns:** _string_

---

### convertNxExecutor

▸ **convertNxExecutor**(`executor`: [_Executor_](../../angular/nx-devkit/index#executor)): _any_

Convert an Nx Executor into an Angular Devkit Builder

Use this to expose a compatible Angular Builder

#### Parameters

| Name       | Type                                                 |
| :--------- | :--------------------------------------------------- |
| `executor` | [_Executor_](../../angular/nx-devkit/index#executor) |

**Returns:** _any_

---

### convertNxGenerator

▸ **convertNxGenerator**<T\>(`generator`: [_Generator_](../../angular/nx-devkit/index#generator)<T\>): _function_

Convert an Nx Generator into an Angular Devkit Schematic

#### Type parameters

| Name | Default |
| :--- | :------ |
| `T`  | _any_   |

#### Parameters

| Name        | Type                                                       |
| :---------- | :--------------------------------------------------------- |
| `generator` | [_Generator_](../../angular/nx-devkit/index#generator)<T\> |

**Returns:** (`options`: T) => (`tree`: _any_, `context`: _any_) => _Promise_<any\>

---

### detectPackageManager

▸ **detectPackageManager**(`dir?`: _string_): [_PackageManager_](../../angular/nx-devkit/index#packagemanager)

Detects which package manager is used in the workspace based on the lock file.

#### Parameters

| Name  | Type     | Default value |
| :---- | :------- | :------------ |
| `dir` | _string_ | ''            |

**Returns:** [_PackageManager_](../../angular/nx-devkit/index#packagemanager)

---

### formatFiles

▸ **formatFiles**(`host`: [_Tree_](../../angular/nx-devkit/index#tree)): _Promise_<void\>

Formats all the created or updated files using Prettier

#### Parameters

| Name   | Type                                         | Description          |
| :----- | :------------------------------------------- | :------------------- |
| `host` | [_Tree_](../../angular/nx-devkit/index#tree) | the file system tree |

**Returns:** _Promise_<void\>

---

### generateFiles

▸ **generateFiles**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `srcFolder`: _string_, `target`: _string_, `substitutions`: { [k: string]: _any_; }): _void_

Generates a folder of files based on provided templates.

While doing so it performs two substitutions:

- Substitutes segments of file names surrounded by \_\_
- Uses ejs to substitute values in templates

Examples:

```typescript
generateFiles(host, path.join(__dirname, 'files'), './tools/scripts', {
  tmpl: '',
  name: 'myscript',
});
```

This command will take all the files from the `files` directory next to the place where the command is invoked from.
It will replace all `__tmpl__` with '' and all `__name__` with 'myscript' in the file names, and will replace all
`<%= name %>` with `myscript` in the files themselves.
`tmpl: ''` is a common pattern. With it you can name files like this: `index.ts__tmpl__`, so your editor
doesn't get confused about incorrect TypeScript files.

#### Parameters

| Name            | Type                                         | Description                                   |
| :-------------- | :------------------------------------------- | :-------------------------------------------- |
| `host`          | [_Tree_](../../angular/nx-devkit/index#tree) | the file system tree                          |
| `srcFolder`     | _string_                                     | the source folder of files (absolute path)    |
| `target`        | _string_                                     | the target folder (relative to the host root) |
| `substitutions` | _object_                                     | an object of key-value pairs                  |

**Returns:** _void_

---

### getPackageManagerCommand

▸ **getPackageManagerCommand**(`packageManager?`: [_PackageManager_](../../angular/nx-devkit/index#packagemanager)): PackageManagerCommands

Returns commands for the package manager used in the workspace.
By default, the package manager is derived based on the lock file,
but it can also be passed in explicitly.

Example:

```javascript
execSync(`${getPackageManagerCommand().addDev} my-dev-package`);
```

#### Parameters

| Name             | Type                                                             |
| :--------------- | :--------------------------------------------------------------- |
| `packageManager` | [_PackageManager_](../../angular/nx-devkit/index#packagemanager) |

**Returns:** PackageManagerCommands

---

### getPackageManagerVersion

▸ **getPackageManagerVersion**(`packageManager?`: [_PackageManager_](../../angular/nx-devkit/index#packagemanager)): _string_

Returns the version of the package manager used in the workspace.
By default, the package manager is derived based on the lock file,
but it can also be passed in explicitly.

#### Parameters

| Name             | Type                                                             |
| :--------------- | :--------------------------------------------------------------- |
| `packageManager` | [_PackageManager_](../../angular/nx-devkit/index#packagemanager) |

**Returns:** _string_

---

### getProjects

▸ **getProjects**(`host`: [_Tree_](../../angular/nx-devkit/index#tree)): _Map_<string, [_ProjectConfiguration_](../../angular/nx-devkit/index#projectconfiguration) & [_NxJsonProjectConfiguration_](../../angular/nx-devkit/index#nxjsonprojectconfiguration)\>

Get a map of all projects in a workspace.

Use [readProjectConfiguration](../../angular/nx-devkit/index#readprojectconfiguration) if only one project is needed.

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `host` | [_Tree_](../../angular/nx-devkit/index#tree) |

**Returns:** _Map_<string, [_ProjectConfiguration_](../../angular/nx-devkit/index#projectconfiguration) & [_NxJsonProjectConfiguration_](../../angular/nx-devkit/index#nxjsonprojectconfiguration)\>

---

### getWorkspaceLayout

▸ **getWorkspaceLayout**(`host`: [_Tree_](../../angular/nx-devkit/index#tree)): _object_

Returns workspace defaults. It includes defaults folders for apps and libs,
and the default scope.

Example:

```typescript
{ appsDir: 'apps', libsDir: 'libs', npmScope: 'myorg' }
```

#### Parameters

| Name   | Type                                         | Description      |
| :----- | :------------------------------------------- | :--------------- |
| `host` | [_Tree_](../../angular/nx-devkit/index#tree) | file system tree |

**Returns:** _object_

| Name       | Type     |
| :--------- | :------- |
| `appsDir`  | _string_ |
| `libsDir`  | _string_ |
| `npmScope` | _string_ |

---

### getWorkspacePath

▸ **getWorkspacePath**(`host`: [_Tree_](../../angular/nx-devkit/index#tree)): _string_

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `host` | [_Tree_](../../angular/nx-devkit/index#tree) |

**Returns:** _string_

---

### installPackagesTask

▸ **installPackagesTask**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `alwaysRun?`: _boolean_, `cwd?`: _string_, `packageManager?`: [_PackageManager_](../../angular/nx-devkit/index#packagemanager)): _void_

Runs `npm install` or `yarn install`. It will skip running the install if
`package.json` hasn't changed at all or it hasn't changed since the last invocation.

#### Parameters

| Name             | Type                                                             | Default value | Description                                                   |
| :--------------- | :--------------------------------------------------------------- | :------------ | :------------------------------------------------------------ |
| `host`           | [_Tree_](../../angular/nx-devkit/index#tree)                     | -             | the file system tree                                          |
| `alwaysRun`      | _boolean_                                                        | false         | always run the command even if `package.json` hasn't changed. |
| `cwd`            | _string_                                                         | ''            | -                                                             |
| `packageManager` | [_PackageManager_](../../angular/nx-devkit/index#packagemanager) | -             | -                                                             |

**Returns:** _void_

---

### joinPathFragments

▸ **joinPathFragments**(...`fragments`: _string_[]): _string_

Normalized path fragments and joins them

#### Parameters

| Name           | Type       |
| :------------- | :--------- |
| `...fragments` | _string_[] |

**Returns:** _string_

---

### moveFilesToNewDirectory

▸ **moveFilesToNewDirectory**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `oldDir`: _string_, `newDir`: _string_): _void_

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `host`   | [_Tree_](../../angular/nx-devkit/index#tree) |
| `oldDir` | _string_                                     |
| `newDir` | _string_                                     |

**Returns:** _void_

---

### names

▸ **names**(`name`: _string_): _object_

Util function to generate different strings based off the provided name.

Examples:

```typescript
names('my-name'); // {name: 'my-name', className: 'MyName', propertyName: 'myName', constantName: 'MY_NAME', fileName: 'my-name'}
names('myName'); // {name: 'my-name', className: 'MyName', propertyName: 'myName', constantName: 'MY_NAME', fileName: 'my-name'}
```

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | _string_ |

**Returns:** _object_

| Name           | Type     |
| :------------- | :------- |
| `className`    | _string_ |
| `constantName` | _string_ |
| `fileName`     | _string_ |
| `name`         | _string_ |
| `propertyName` | _string_ |

---

### normalizePath

▸ **normalizePath**(`osSpecificPath`: _string_): _string_

Coverts an os specific path to a unix style path

#### Parameters

| Name             | Type     |
| :--------------- | :------- |
| `osSpecificPath` | _string_ |

**Returns:** _string_

---

### offsetFromRoot

▸ **offsetFromRoot**(`fullPathToDir`: _string_): _string_

Calculates an offset from the root of the workspace, which is useful for
constructing relative URLs.

Examples:

```typescript
offsetFromRoot('apps/mydir/myapp/'); // returns "../../../"
```

#### Parameters

| Name            | Type     | Description    |
| :-------------- | :------- | :------------- |
| `fullPathToDir` | _string_ | directory path |

**Returns:** _string_

---

### parseJson

▸ **parseJson**<T\>(`input`: _string_, `options?`: [_JsonParseOptions_](../../angular/nx-devkit/index#jsonparseoptions)): T

Parses the given JSON string and returns the object the JSON content represents.
By default javascript-style comments are allowed.

#### Type parameters

| Name | Type     | Default |
| :--- | :------- | :------ |
| `T`  | _object_ | _any_   |

#### Parameters

| Name       | Type                                                                 | Description            |
| :--------- | :------------------------------------------------------------------- | :--------------------- |
| `input`    | _string_                                                             | JSON content as string |
| `options?` | [_JsonParseOptions_](../../angular/nx-devkit/index#jsonparseoptions) | JSON parse options     |

**Returns:** T

Object the JSON content represents

---

### parseTargetString

▸ **parseTargetString**(`targetString`: _string_): [_Target_](../../angular/nx-devkit/index#target)

Parses a target string into {project, target, configuration}

Examples:

```typescript
parseTargetString('proj:test'); // returns { project: "proj", target: "test" }
parseTargetString('proj:test:production'); // returns { project: "proj", target: "test", configuration: "production" }
```

#### Parameters

| Name           | Type     | Description      |
| :------------- | :------- | :--------------- |
| `targetString` | _string_ | target reference |

**Returns:** [_Target_](../../angular/nx-devkit/index#target)

---

### readJson

▸ **readJson**<T\>(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `path`: _string_, `options?`: [_JsonParseOptions_](../../angular/nx-devkit/index#jsonparseoptions)): T

Reads a document for host, removes all comments and parses JSON.

#### Type parameters

| Name | Type     | Default |
| :--- | :------- | :------ |
| `T`  | _object_ | _any_   |

#### Parameters

| Name       | Type                                                                 | Description                 |
| :--------- | :------------------------------------------------------------------- | :-------------------------- |
| `host`     | [_Tree_](../../angular/nx-devkit/index#tree)                         | file system tree            |
| `path`     | _string_                                                             | file path                   |
| `options?` | [_JsonParseOptions_](../../angular/nx-devkit/index#jsonparseoptions) | Optional JSON Parse Options |

**Returns:** T

---

### readJsonFile

▸ **readJsonFile**<T\>(`path`: _string_, `options?`: JsonReadOptions): T

Reads a JSON file and returns the object the JSON content represents.

#### Type parameters

| Name | Type     | Default |
| :--- | :------- | :------ |
| `T`  | _object_ | _any_   |

#### Parameters

| Name       | Type            | Description        |
| :--------- | :-------------- | :----------------- |
| `path`     | _string_        | A path to a file.  |
| `options?` | JsonReadOptions | JSON parse options |

**Returns:** T

Object the JSON content of the file represents

---

### readProjectConfiguration

▸ **readProjectConfiguration**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `projectName`: _string_): [_ProjectConfiguration_](../../angular/nx-devkit/index#projectconfiguration) & [_NxJsonProjectConfiguration_](../../angular/nx-devkit/index#nxjsonprojectconfiguration)

Reads a project configuration.

The project configuration is stored in workspace.json and nx.json. The utility will read
both files.

**`throws`** If supplied projectName cannot be found

#### Parameters

| Name          | Type                                         | Description                                                             |
| :------------ | :------------------------------------------- | :---------------------------------------------------------------------- |
| `host`        | [_Tree_](../../angular/nx-devkit/index#tree) | the file system tree                                                    |
| `projectName` | _string_                                     | unique name. Often directories are part of the name (e.g., mydir-mylib) |

**Returns:** [_ProjectConfiguration_](../../angular/nx-devkit/index#projectconfiguration) & [_NxJsonProjectConfiguration_](../../angular/nx-devkit/index#nxjsonprojectconfiguration)

---

### readTargetOptions

▸ **readTargetOptions**<T\>(`__namedParameters`: [_Target_](../../angular/nx-devkit/index#target), `context`: [_ExecutorContext_](../../angular/nx-devkit/index#executorcontext)): T

Reads and combines options for a given target.

Works as if you invoked the target yourself without passing any command lint overrides.

#### Type parameters

| Name | Default |
| :--- | :------ |
| `T`  | _any_   |

#### Parameters

| Name                | Type                                                               |
| :------------------ | :----------------------------------------------------------------- |
| `__namedParameters` | [_Target_](../../angular/nx-devkit/index#target)                   |
| `context`           | [_ExecutorContext_](../../angular/nx-devkit/index#executorcontext) |

**Returns:** T

---

### readWorkspaceConfiguration

▸ **readWorkspaceConfiguration**(`host`: [_Tree_](../../angular/nx-devkit/index#tree)): [_WorkspaceConfiguration_](../../angular/nx-devkit/index#workspaceconfiguration)

Read general workspace configuration such as the default project or cli settings

This does _not_ provide projects configuration, use [readProjectConfiguration](../../angular/nx-devkit/index#readprojectconfiguration) instead.

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `host` | [_Tree_](../../angular/nx-devkit/index#tree) |

**Returns:** [_WorkspaceConfiguration_](../../angular/nx-devkit/index#workspaceconfiguration)

---

### removeDependenciesFromPackageJson

▸ **removeDependenciesFromPackageJson**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `dependencies`: _string_[], `devDependencies`: _string_[], `packageJsonPath?`: _string_): [_GeneratorCallback_](../../angular/nx-devkit/index#generatorcallback)

Remove Dependencies and Dev Dependencies from package.json

For example:

```typescript
removeDependenciesFromPackageJson(host, ['react'], ['jest']);
```

This will **remove** `react` and `jest` from the dependencies and devDependencies sections of package.json respectively.

#### Parameters

| Name              | Type                                         | Default value  | Description                                                                 |
| :---------------- | :------------------------------------------- | :------------- | :-------------------------------------------------------------------------- |
| `host`            | [_Tree_](../../angular/nx-devkit/index#tree) | -              | -                                                                           |
| `dependencies`    | _string_[]                                   | -              | Dependencies to be removed from the dependencies section of package.json    |
| `devDependencies` | _string_[]                                   | -              | Dependencies to be removed from the devDependencies section of package.json |
| `packageJsonPath` | _string_                                     | 'package.json' | -                                                                           |

**Returns:** [_GeneratorCallback_](../../angular/nx-devkit/index#generatorcallback)

Callback to uninstall dependencies only if necessary. undefined is returned if changes are not necessary.

---

### removeProjectConfiguration

▸ **removeProjectConfiguration**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `projectName`: _string_): _void_

Removes the configuration of an existing project.

The project configuration is stored in workspace.json and nx.json.
The utility will update both files.

#### Parameters

| Name          | Type                                         |
| :------------ | :------------------------------------------- |
| `host`        | [_Tree_](../../angular/nx-devkit/index#tree) |
| `projectName` | _string_                                     |

**Returns:** _void_

---

### runExecutor

▸ **runExecutor**<T\>(`targetDescription`: { `configuration?`: _string_ ; `project`: _string_ ; `target`: _string_ }, `options`: { [k: string]: _any_; }, `context`: [_ExecutorContext_](../../angular/nx-devkit/index#executorcontext)): _Promise_<AsyncIterableIterator<T\>\>

Loads and invokes executor.

This is analogous to invoking executor from the terminal, with the exception
that the params aren't parsed from the string, but instead provided parsed already.

Apart from that, it works the same way:

- it will load the workspace configuration
- it will resolve the target
- it will load the executor and the schema
- it will load the options for the appropriate configuration
- it will run the validations and will set the default
- and, of course, it will invoke the executor

Example:

```typescript
for await (const s of await runExecutor(
  { project: 'myproj', target: 'serve' },
  { watch: true },
  context
)) {
  // s.success
}
```

Note that the return value is a promise of an iterator, so you need to await before iterating over it.

#### Type parameters

| Name        | Type      |
| :---------- | :-------- |
| `T`         | _object_  |
| `T.success` | _boolean_ |

#### Parameters

| Name                               | Type                                                               |
| :--------------------------------- | :----------------------------------------------------------------- |
| `targetDescription`                | _object_                                                           |
| `targetDescription.configuration?` | _string_                                                           |
| `targetDescription.project`        | _string_                                                           |
| `targetDescription.target`         | _string_                                                           |
| `options`                          | _object_                                                           |
| `context`                          | [_ExecutorContext_](../../angular/nx-devkit/index#executorcontext) |

**Returns:** _Promise_<AsyncIterableIterator<T\>\>

---

### serializeJson

▸ **serializeJson**<T\>(`input`: T, `options?`: [_JsonSerializeOptions_](../../angular/nx-devkit/index#jsonserializeoptions)): _string_

Serializes the given data to a JSON string.
By default the JSON string is formatted with a 2 space intendation to be easy readable.

#### Type parameters

| Name | Type     | Default  |
| :--- | :------- | :------- |
| `T`  | _object_ | _object_ |

#### Parameters

| Name       | Type                                                                         | Description                               |
| :--------- | :--------------------------------------------------------------------------- | :---------------------------------------- |
| `input`    | T                                                                            | Object which should be serialized to JSON |
| `options?` | [_JsonSerializeOptions_](../../angular/nx-devkit/index#jsonserializeoptions) | JSON serialize options                    |

**Returns:** _string_

the formatted JSON representation of the object

---

### stripIndents

▸ **stripIndents**(`strings`: TemplateStringsArray, ...`values`: _any_[]): _string_

Removes indents, which is useful for printing warning and messages.

Example:

```typescript
stripIndents`
 Options:
 - option1
 - option2
`;
```

#### Parameters

| Name        | Type                 |
| :---------- | :------------------- |
| `strings`   | TemplateStringsArray |
| `...values` | _any_[]              |

**Returns:** _string_

---

### stripJsonComments

▸ `Const` **stripJsonComments**(`text`: _string_, `replaceCh?`: _string_): _string_

Takes JSON with JavaScript-style comments and remove
them. Optionally replaces every none-newline character
of comments with a replaceCharacter

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `text`       | _string_ |
| `replaceCh?` | _string_ |

**Returns:** _string_

---

### targetToTargetString

▸ **targetToTargetString**(`__namedParameters`: [_Target_](../../angular/nx-devkit/index#target)): _string_

Returns a string in the format "project:target[:configuration]" for the target

#### Parameters

| Name                | Type                                             |
| :------------------ | :----------------------------------------------- |
| `__namedParameters` | [_Target_](../../angular/nx-devkit/index#target) |

**Returns:** _string_

---

### toJS

▸ **toJS**(`tree`: [_Tree_](../../angular/nx-devkit/index#tree)): _void_

Rename and transpile any new typescript files created to javascript files

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `tree` | [_Tree_](../../angular/nx-devkit/index#tree) |

**Returns:** _void_

---

### updateJson

▸ **updateJson**<T, U\>(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `path`: _string_, `updater`: (`value`: T) => U, `options?`: [_JsonParseOptions_](../../angular/nx-devkit/index#jsonparseoptions) & [_JsonSerializeOptions_](../../angular/nx-devkit/index#jsonserializeoptions)): _void_

Updates a JSON value to the file system tree

#### Type parameters

| Name | Type     | Default |
| :--- | :------- | :------ |
| `T`  | _object_ | _any_   |
| `U`  | _object_ | T       |

#### Parameters

| Name       | Type                                                                                                                                                | Description                                                                                          |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `host`     | [_Tree_](../../angular/nx-devkit/index#tree)                                                                                                        | File system tree                                                                                     |
| `path`     | _string_                                                                                                                                            | Path of JSON file in the Tree                                                                        |
| `updater`  | (`value`: T) => U                                                                                                                                   | Function that maps the current value of a JSON document to a new value to be written to the document |
| `options?` | [_JsonParseOptions_](../../angular/nx-devkit/index#jsonparseoptions) & [_JsonSerializeOptions_](../../angular/nx-devkit/index#jsonserializeoptions) | Optional JSON Parse and Serialize Options                                                            |

**Returns:** _void_

---

### updateProjectConfiguration

▸ **updateProjectConfiguration**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `projectName`: _string_, `projectConfiguration`: [_ProjectConfiguration_](../../angular/nx-devkit/index#projectconfiguration) & [_NxJsonProjectConfiguration_](../../angular/nx-devkit/index#nxjsonprojectconfiguration)): _void_

Updates the configuration of an existing project.

The project configuration is stored in workspace.json and nx.json. The utility will update
both files.

#### Parameters

| Name                   | Type                                                                                                                                                                    | Description                                                             |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| `host`                 | [_Tree_](../../angular/nx-devkit/index#tree)                                                                                                                            | the file system tree                                                    |
| `projectName`          | _string_                                                                                                                                                                | unique name. Often directories are part of the name (e.g., mydir-mylib) |
| `projectConfiguration` | [_ProjectConfiguration_](../../angular/nx-devkit/index#projectconfiguration) & [_NxJsonProjectConfiguration_](../../angular/nx-devkit/index#nxjsonprojectconfiguration) | project configuration                                                   |

**Returns:** _void_

---

### updateTsConfigsToJs

▸ **updateTsConfigsToJs**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `options`: { `projectRoot`: _string_ }): _void_

#### Parameters

| Name                  | Type                                         |
| :-------------------- | :------------------------------------------- |
| `host`                | [_Tree_](../../angular/nx-devkit/index#tree) |
| `options`             | _object_                                     |
| `options.projectRoot` | _string_                                     |

**Returns:** _void_

---

### updateWorkspaceConfiguration

▸ **updateWorkspaceConfiguration**(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `workspaceConfig`: [_WorkspaceConfiguration_](../../angular/nx-devkit/index#workspaceconfiguration)): _void_

Update general workspace configuration such as the default project or cli settings.

This does _not_ update projects configuration, use [updateProjectConfiguration](../../angular/nx-devkit/index#updateprojectconfiguration) or [addProjectConfiguration](../../angular/nx-devkit/index#addprojectconfiguration) instead.

#### Parameters

| Name              | Type                                                                             |
| :---------------- | :------------------------------------------------------------------------------- |
| `host`            | [_Tree_](../../angular/nx-devkit/index#tree)                                     |
| `workspaceConfig` | [_WorkspaceConfiguration_](../../angular/nx-devkit/index#workspaceconfiguration) |

**Returns:** _void_

---

### visitNotIgnoredFiles

▸ **visitNotIgnoredFiles**(`tree`: [_Tree_](../../angular/nx-devkit/index#tree), `dirPath?`: _string_, `visitor`: (`path`: _string_) => _void_): _void_

Utility to act on all files in a tree that are not ignored by git.

#### Parameters

| Name      | Type                                         |
| :-------- | :------------------------------------------- |
| `tree`    | [_Tree_](../../angular/nx-devkit/index#tree) |
| `dirPath` | _string_                                     |
| `visitor` | (`path`: _string_) => _void_                 |

**Returns:** _void_

---

### writeJson

▸ **writeJson**<T\>(`host`: [_Tree_](../../angular/nx-devkit/index#tree), `path`: _string_, `value`: T, `options?`: [_JsonSerializeOptions_](../../angular/nx-devkit/index#jsonserializeoptions)): _void_

Writes a JSON value to the file system tree

#### Type parameters

| Name | Type     | Default  |
| :--- | :------- | :------- |
| `T`  | _object_ | _object_ |

#### Parameters

| Name       | Type                                                                         | Description                     |
| :--------- | :--------------------------------------------------------------------------- | :------------------------------ |
| `host`     | [_Tree_](../../angular/nx-devkit/index#tree)                                 | File system tree                |
| `path`     | _string_                                                                     | Path of JSON file in the Tree   |
| `value`    | T                                                                            | Serializable value to write     |
| `options?` | [_JsonSerializeOptions_](../../angular/nx-devkit/index#jsonserializeoptions) | Optional JSON Serialize Options |

**Returns:** _void_

---

### writeJsonFile

▸ **writeJsonFile**<T\>(`path`: _string_, `data`: T, `options?`: JsonWriteOptions): _void_

Serializes the given data to JSON and writes it to a file.

#### Type parameters

| Name | Type     | Default  |
| :--- | :------- | :------- |
| `T`  | _object_ | _object_ |

#### Parameters

| Name       | Type             | Description                                                     |
| :--------- | :--------------- | :-------------------------------------------------------------- |
| `path`     | _string_         | A path to a file.                                               |
| `data`     | T                | data which should be serialized to JSON and written to the file |
| `options?` | JsonWriteOptions | JSON serialize options                                          |

**Returns:** _void_
