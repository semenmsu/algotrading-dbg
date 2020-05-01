require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const { EXCHANGES_SCRIPTS_PATH } = process.env;

function getExchangeScript(exchange_name, script_name) {
    script_path = path.join(EXCHANGES_SCRIPTS_PATH, exchange_name, script_name);
    return script_path;
}

function getCWD(exchange_name) {
    return path.join(EXCHANGES_SCRIPTS_PATH, exchange_name);
}

async function runScript(exchange_name, script_name, opts) {
    script_path = getExchangeScript(exchange_name, script_name);
    cwd = getCWD(exchange_name);
    cmd = `${script_path} --no-verbose --trace no ${opts}`;
    let { stdout, stderr } = await exec(cmd, { cwd });
    return stdout;
}

module.exports = {
    getExchangeScript,
    getCWD,
    runScript
};
