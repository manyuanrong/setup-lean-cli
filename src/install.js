const os = require('os');
const fs = require('fs');
const path = require('path');
const process = require('process');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function install(version) {
  const cachedPath = tc.find('lean', version);
  if (cachedPath) {
    core.info(`Using cached LeanCloud CLi installation from ${cachedPath}.`);
    core.addPath(cachedPath);
    return;
  }

  const file = fileName();
  const url = `https://releases.leanapp.cn/leancloud/lean-cli/releases/download/v${version}/${file}`;

  core.info(`Downloading LeanCloud CLi from ${url}.`);

  const filePath = await tc.downloadTool(url);

  const binDir = path.join(__dirname, '.bin');
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, {
      recursive: true,
    });
  }

  const binPath = path.join(
    binDir,
    `lean${process.platform === 'win32' ? '.exe' : ''}`
  );
  fs.copyFileSync(filePath, binPath);
  fs.chmodSync(binPath, 0o755);

  const newCachedPath = await tc.cacheDir(binDir, 'lean', version);
  core.info(`Cached LeanCloud CLi to ${newCachedPath}.`);
  core.addPath(newCachedPath);
}

/** @returns {string} */
function fileName() {
  let arch;
  switch (process.arch) {
    case 'x32':
      arch = 'x86';
      break;
    case 'x64':
      arch = 'x64';
      break;
    default:
      throw new Error(`Unsupported architechture ${process.arch}.`);
  }

  let platform;
  switch (process.platform) {
    case 'linux':
      platform = 'linux';
      break;
    case 'darwin':
      platform = 'macos';
      break;
    case 'win32':
      platform = 'windows';
      break;
    default:
      throw new Error(`Unsupported platform ${process.platform}.`);
  }

  return `lean-${platform}-${arch}${
    process.platform === 'win32' ? '.exe' : ''
  }`;
}

module.exports = {
  install,
};
