const process = require('process');
const core = require('@actions/core');

const { install } = require('./src/install.js');

async function main() {
  try {
    const version = core.getInput('version');

    core.info(`Going to install version ${version}.`);

    await install(version);

    core.setOutput('version', version);

    core.info('Installation complete.');
  } catch (err) {
    core.setFailed(err);
    process.exit();
  }
}

main();
