import * as chalk from 'chalk';

export interface NxLogger {
  warn: (s: string) => void;
  error: (s: string) => void;
  info: (s: string) => void;
  log: (...s: any[]) => void;
  debug: (...s: any[]) => void;
  fatal: (...s: any[]) => void;
}

export const NX_PREFIX = `${chalk.cyan('>')} ${chalk.inverse(
  chalk.bold(chalk.cyan(' NX '))
)}`;

export const NX_ERROR = chalk.inverse(chalk.bold(chalk.red(' ERROR ')));

export const logger: NxLogger = {
  warn: (s) => console.warn(chalk.bold(chalk.yellow(s))),
  error: (s) => {
    if (s.startsWith('NX ')) {
      console.error(`\n${NX_ERROR} ${chalk.bold(chalk.red(s.substr(3)))}\n`);
    } else {
      console.error(chalk.bold(chalk.red(s)));
    }
  },
  info: (s) => {
    if (s.startsWith('NX ')) {
      console.info(`\n${NX_PREFIX} ${chalk.bold(s.substr(3))}\n`);
    } else {
      console.info(chalk.white(s));
    }
  },
  log: (...s) => {
    console.log(...s);
  },
  debug: (...s) => {
    console.debug(...s);
  },
  fatal: (...s) => {
    console.error(...s);
  },
};

export function stripIndent(str: string): string {
  const match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) {
    return str;
  }
  const indent = match.reduce((r, a) => Math.min(r, a.length), Infinity);
  const regex = new RegExp(`^[ \\t]{${indent}}`, 'gm');
  return str.replace(regex, '');
}
