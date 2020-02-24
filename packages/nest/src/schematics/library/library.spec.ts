import { Tree } from '@angular-devkit/schematics';
import { NxJson, readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace, getFileContent } from '@nrwl/workspace/testing';
import { runSchematic } from '../../utils/testing';
import { expectTestsPass } from 'e2e/utils';

describe('lib', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = Tree.empty();
    appTree = createEmptyWorkspace(appTree);
  });

  describe('not nested', () => {
    it('should update workspace.json', async () => {
      const tree = await runSchematic('lib', { name: 'myLib' }, appTree);
      const workspaceJson = readJsonInTree(tree, '/workspace.json');
      expect(workspaceJson.projects['my-lib'].root).toEqual('libs/my-lib');
      expect(workspaceJson.projects['my-lib'].architect.build).toBeUndefined();
      expect(workspaceJson.projects['my-lib'].architect.lint).toEqual({
        builder: '@angular-devkit/build-angular:tslint',
        options: {
          exclude: ['**/node_modules/**', '!libs/my-lib/**'],
          tsConfig: [
            'libs/my-lib/tsconfig.lib.json',
            'libs/my-lib/tsconfig.spec.json'
          ]
        }
      });
      expect(workspaceJson.projects['my-lib'].architect.test).toEqual({
        builder: '@nrwl/jest:jest',
        options: {
          jestConfig: 'libs/my-lib/jest.config.js',
          tsConfig: 'libs/my-lib/tsconfig.spec.json',
          passWithNoTests: true
        }
      });
    });

    it('should include a controller', async () => {
      const tree = await runSchematic(
        'lib',
        { name: 'myLib', controller: true },
        appTree
      );
      const service = getFileContent(
        tree,
        'libs/my-lib/src/lib/my-lib.controller.ts'
      );
      expect(service).toBeTruthy();
    });

    it('should include a service', async () => {
      const tree = await runSchematic(
        'lib',
        { name: 'myLib', service: true },
        appTree
      );
      const service = getFileContent(
        tree,
        'libs/my-lib/src/lib/my-lib.service.ts'
      );
      expect(service).toBeTruthy();
    });

    it('should add the @Global decorator', async () => {
      const tree = await runSchematic(
        'lib',
        { name: 'myLib', global: true },
        appTree
      );
      const module = getFileContent(
        tree,
        'libs/my-lib/src/lib/my-lib.module.ts'
      );
      expect(module).toEqual(
        "import { Module, Global } from '@nestjs/common';\n" +
          '\n' +
          '@Global()\n' +
          '@Module({' +
          '\n  controllers: [],' +
          '\n  providers: [],' +
          '\n  exports: []\n})\n' +
          'export class MyLibModule {}\n'
      );
    });

    it('should provider the controller and service', async () => {
      const tree = await runSchematic(
        'lib',
        { name: 'myLib', service: true, controller: true },
        appTree
      );
      const module = getFileContent(
        tree,
        'libs/my-lib/src/lib/my-lib.module.ts'
      );
      expect(module).toEqual(
        "import { Module } from '@nestjs/common';" +
          "\nimport { MyLibService } from './my-lib.service';" +
          '\n\n' +
          '@Module({' +
          '\n  controllers: [MyLibController],' +
          '\n  providers: [MyLibService],' +
          '\n  exports: [MyLibService]\n' +
          '})\n' +
          'export class MyLibModule {}\n'
      );

      const barrel = getFileContent(tree, 'libs/my-lib/src/index.ts');
      expect(barrel).toEqual(
        "export * from './lib/my-lib.module';" +
          "\nexport * from './lib/my-lib.service';" +
          "\nexport * from './lib/my-lib.controller';\n"
      );
    });

    it('should update nx.json', async () => {
      const tree = await runSchematic(
        'lib',
        { name: 'myLib', tags: 'one,two' },
        appTree
      );
      const nxJson = readJsonInTree<NxJson>(tree, '/nx.json');
      expect(nxJson).toEqual({
        npmScope: 'proj',
        projects: {
          'my-lib': {
            tags: ['one', 'two']
          }
        }
      });
    });

    it('should update root tsconfig.json', async () => {
      const tree = await runSchematic('lib', { name: 'myLib' }, appTree);
      const tsconfigJson = readJsonInTree(tree, '/tsconfig.json');
      expect(tsconfigJson.compilerOptions.paths['@proj/my-lib']).toEqual([
        'libs/my-lib/src/index.ts'
      ]);
    });

    it('should create a local tsconfig.json', async () => {
      const tree = await runSchematic('lib', { name: 'myLib' }, appTree);
      const tsconfigJson = readJsonInTree(tree, 'libs/my-lib/tsconfig.json');
      expect(tsconfigJson).toEqual({
        extends: '../../tsconfig.json',
        compilerOptions: {
          types: ['node', 'jest']
        },
        include: ['**/*.ts']
      });
    });

    it('should extend the local tsconfig.json with tsconfig.spec.json', async () => {
      const tree = await runSchematic('lib', { name: 'myLib' }, appTree);
      const tsconfigJson = readJsonInTree(
        tree,
        'libs/my-lib/tsconfig.spec.json'
      );
      expect(tsconfigJson.extends).toEqual('./tsconfig.json');
    });

    it('should extend the local tsconfig.json with tsconfig.lib.json', async () => {
      const tree = await runSchematic('lib', { name: 'myLib' }, appTree);
      const tsconfigJson = readJsonInTree(
        tree,
        'libs/my-lib/tsconfig.lib.json'
      );
      expect(tsconfigJson.extends).toEqual('./tsconfig.json');
    });

    it('should generate files', async () => {
      const tree = await runSchematic('lib', { name: 'myLib' }, appTree);
      expect(tree.exists(`libs/my-lib/jest.config.js`)).toBeTruthy();
      expect(tree.exists('libs/my-lib/src/index.ts')).toBeTruthy();
    });
  });

  describe('nested', () => {
    it('should update nx.json', async () => {
      const tree = await runSchematic(
        'lib',
        {
          name: 'myLib',
          directory: 'myDir',
          tags: 'one'
        },
        appTree
      );
      const nxJson = readJsonInTree<NxJson>(tree, '/nx.json');
      expect(nxJson).toEqual({
        npmScope: 'proj',
        projects: {
          'my-dir-my-lib': {
            tags: ['one']
          }
        }
      });

      const tree2 = await runSchematic(
        'lib',
        {
          name: 'myLib2',
          directory: 'myDir',
          tags: 'one,two'
        },
        tree
      );
      const nxJson2 = readJsonInTree<NxJson>(tree2, '/nx.json');
      expect(nxJson2).toEqual({
        npmScope: 'proj',
        projects: {
          'my-dir-my-lib': {
            tags: ['one']
          },
          'my-dir-my-lib2': {
            tags: ['one', 'two']
          }
        }
      });
    });

    it('should generate files', async () => {
      const tree = await runSchematic(
        'lib',
        { name: 'myLib', directory: 'myDir' },
        appTree
      );
      expect(tree.exists(`libs/my-dir/my-lib/jest.config.js`)).toBeTruthy();
      expect(tree.exists('libs/my-dir/my-lib/src/index.ts')).toBeTruthy();
    });

    it('should update workspace.json', async () => {
      const tree = await runSchematic(
        'lib',
        { name: 'myLib', directory: 'myDir' },
        appTree
      );
      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(workspaceJson.projects['my-dir-my-lib'].root).toEqual(
        'libs/my-dir/my-lib'
      );
      expect(workspaceJson.projects['my-dir-my-lib'].architect.lint).toEqual({
        builder: '@angular-devkit/build-angular:tslint',
        options: {
          exclude: ['**/node_modules/**', '!libs/my-dir/my-lib/**'],
          tsConfig: [
            'libs/my-dir/my-lib/tsconfig.lib.json',
            'libs/my-dir/my-lib/tsconfig.spec.json'
          ]
        }
      });
    });

    it('should update tsconfig.json', async () => {
      const tree = await runSchematic(
        'lib',
        { name: 'myLib', directory: 'myDir' },
        appTree
      );
      const tsconfigJson = readJsonInTree(tree, '/tsconfig.json');
      expect(tsconfigJson.compilerOptions.paths['@proj/my-dir/my-lib']).toEqual(
        ['libs/my-dir/my-lib/src/index.ts']
      );
      expect(
        tsconfigJson.compilerOptions.paths['my-dir-my-lib/*']
      ).toBeUndefined();
    });

    it('should create a local tsconfig.json', async () => {
      const tree = await runSchematic(
        'lib',
        { name: 'myLib', directory: 'myDir' },
        appTree
      );

      const tsconfigJson = readJsonInTree(
        tree,
        'libs/my-dir/my-lib/tsconfig.json'
      );
      expect(tsconfigJson).toEqual({
        extends: '../../../tsconfig.json',
        compilerOptions: {
          types: ['node', 'jest']
        },
        include: ['**/*.ts']
      });
    });
  });

  describe('--unit-test-runner none', () => {
    it('should not generate test configuration', async () => {
      const resultTree = await runSchematic(
        'lib',
        { name: 'myLib', unitTestRunner: 'none' },
        appTree
      );
      expect(resultTree.exists('libs/my-lib/tsconfig.spec.json')).toBeFalsy();
      expect(resultTree.exists('libs/my-lib/jest.config.js')).toBeFalsy();
      expect(resultTree.exists('libs/my-lib/lib/my-lib.spec.ts')).toBeFalsy();
      const workspaceJson = readJsonInTree(resultTree, 'workspace.json');
      expect(workspaceJson.projects['my-lib'].architect.test).toBeUndefined();
      const tsconfigJson = readJsonInTree(
        resultTree,
        'libs/my-lib/tsconfig.json'
      );
      expect(tsconfigJson).toEqual({
        extends: '../../tsconfig.json',
        compilerOptions: {
          types: ['node']
        },
        include: ['**/*.ts']
      });
      expect(
        workspaceJson.projects['my-lib'].architect.lint.options.tsConfig
      ).toEqual(['libs/my-lib/tsconfig.lib.json']);
    });
  });

  describe('publishable package', () => {
    it('should update package.json', async () => {
      const publishableTree = await runSchematic(
        'lib',
        { name: 'mylib', publishable: true },
        appTree
      );

      let packageJsonContent = readJsonInTree(
        publishableTree,
        'libs/mylib/package.json'
      );

      expect(packageJsonContent.name).toEqual('@proj/mylib');
    });
  });
});
