const { runScript } = require("../utils");

class Wallets {
    constructor(response) {
        let result = [];
        let wallets_ = JSON.parse(response);
        for (let wallet of wallets_) {
            const [wallet_type, currency, balance, unsettled_interest] = wallet;
            result.push({ wallet_type, currency, balance, unsettled_interest });
        }
        this.value = result;
    }
}

class BitfinexBashScipts {
    async ticker() {
        return await runScript("bitfinex", "ticker.sh");
    }

    async tickers() {
        return await runScript("bitfinex", "tickers.sh");
    }

    async trades() {
        return await runScript("bitfinex", "trades.sh");
    }

    async platform_status() {
        return await runScript("bitfinex", "platform_status.sh");
    }

    async wallets() {
        let response = await runScript("bitfinex", "auth_wallets_request.sh");
        return new Wallets(response).value;
    }
}
class Bitfinex {
    constructor(backend) {
        if (backend == "bash") {
            this.backend = new BitfinexBashScipts();
        }
    }

    async wallets() {
        return await this.backend.wallets();
    }
}

module.exports = Bitfinex;
