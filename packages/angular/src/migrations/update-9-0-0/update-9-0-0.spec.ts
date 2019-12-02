import { Tree } from '@angular-devkit/schematics';
import { readJsonInTree, updateJsonInTree } from '@nrwl/workspace';
import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';
import { serializeJson } from '@nrwl/workspace';
import { join } from 'path';
import { callRule, runMigration } from '../../utils/testing';

describe('Update 8.5.0', () => {
  let tree: Tree;
  let schematicRunner: SchematicTestRunner;

  beforeEach(async () => {
    tree = new UnitTestTree(Tree.empty());

    tree = await callRule(
      updateJsonInTree('package.json', () => ({
        devDependencies: {
          '@angular/cli': '8.3.3'
        }
      })),
      tree
    );
  });

  describe('postinstall', () => {
    it('should be added if none exists', async () => {
      const result = await runMigration('update-9-0-0', {}, tree);

      expect(
        readJsonInTree(result, 'package.json').scripts.postinstall
      ).toEqual('ngcc');
    });

    it('should be added if script exists', async () => {
      tree = await callRule(
        updateJsonInTree('package.json', json => {
          json.scripts = {
            postinstall: './postinstall.sh'
          };
          return json;
        }),
        tree
      );

      const result = await runMigration('update-9-0-0', {}, tree);

      expect(
        readJsonInTree(result, 'package.json').scripts.postinstall
      ).toEqual('./postinstall.sh && ngcc');
    });
  });
});
