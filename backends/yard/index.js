require("dotenv").config();
const { bashAPI, restAPI, wsAPI } = require("./src/api");
const Bitfinex = require("./src/bitfinex");

const bfx = new Bitfinex(bashAPI);

async function run() {
    //let ticker = await bfx.ticker()
    //console.log(await bfx.ticker())
    //console.log(await bfx.trades())
    //console.log(await bfx.platform_status())
    console.log(await bfx.wallets());

    //script_path = getExchangeScript("bitfinex", "ticker.sh");
    //let { stdout, stderr } = await exec(script_path);
    //console.log(stdout);
    //console.log(bfx.ticker());
    //console.log(bfx.tickers());
    //console.log(bfx.trades())
}

//readFile();

//run();
