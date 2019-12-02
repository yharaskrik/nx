import {
  chain,
  Rule,
  SchematicContext,
  TaskId,
  Tree
} from '@angular-devkit/schematics';
import { addUpdateTask, updateJsonInTree } from '@nrwl/workspace';
import { stripIndents } from '@angular-devkit/core/src/utils/literals';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { join } from 'path';

function addUpdateTasks(dependencies: TaskId[]) {
  return chain([
    addUpdateTask('@angular/core', '9.0.0-rc.4', dependencies),
    addUpdateTask('@angular/cli', '9.0.0-rc.4', dependencies)
  ]);
}

export const addPostinstall: () => Rule = () =>
  chain([
    showInfo,
    updateJsonInTree('package.json', json => {
      json.scripts = json.scripts || {};

      if (json.scripts.postinstall) {
        json.scripts.postinstall += ' && ngcc';
      } else {
        json.scripts.postinstall = 'ngcc';
      }

      return json;
    })
  ]);

function showInfo(_, context) {
  context.logger.info(
    stripIndents`A "postinstall" script has been added to package.json to run ngcc.`
  );
}

let postInstallTaskId: TaskId;

function addPostInstallTask(_, context: SchematicContext) {
  postInstallTaskId = context.addTask(
    new RunSchematicTask(
      join(__dirname, '../../../migrations.json'),
      'add-postinstall',
      {}
    )
  );
}

export default function() {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      addPostInstallTask,
      () => addUpdateTasks([postInstallTaskId])
    ]);
  };
}
