#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

function ncl() {
  const currentDir = process.cwd();
  iterateThroughDir(currentDir);
      console.log(chalk.yellow('Console logs commented out.'));
}

function commentOutConsoleLogs(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  const regex = /(?<!\/\s*)console\.log/gm;
  fileContent = fileContent.replace(regex, '    console.log');
  fs.writeFileSync(filePath, fileContent, 'utf8');
}

function iterateThroughDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      iterateThroughDir(filePath);
    } else if (path.extname(file) === '.js' || path.extname(file) === '.vue') {
      commentOutConsoleLogs(filePath);
    }
  });
}

ncl();
