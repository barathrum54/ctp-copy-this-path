#!/usr/bin/env node
import fs from 'fs';
import chalk from 'chalk';
import clipboardy from 'clipboardy';
import path from 'path';

function ctp(path = process.cwd()) {
  const currentDir = path;
  const output = listDir(currentDir);
  const outputText = output.join('\n');
  clipboardy.writeSync(outputText);
  console.log(chalk.yellow('List copied to clipboard.'));
}

function listDir(dir, level = 0, output = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    const indent = ' '.repeat(level * 4);
    const bulletPoint = chalk.blue('- ');

    if (stats.isDirectory()) {
      output.push(`${indent}- ${file}`);
      listDir(filePath, level + 1, output);
    } else {
      output.push(`${indent}- ${file}`);
    }
  });
  return output;
}
const targetPath = process.argv[2] || process.cwd();
ctp(targetPath);
