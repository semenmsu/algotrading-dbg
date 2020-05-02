import React from "react";
const { ipcRenderer } = window.require("electron")

class Wallet extends React.Component {
    render() {
        const { wallet } = this.props;
        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "12px"
                    }}
                >
                    <div style={{ width: "40px" }}>{wallet.currency}</div>
                    <div style={{ width: "60px" }}>{wallet.balance}</div>
                </div>
            </div>
        );
    }
}
class Wallets extends React.Component {
    constructor(props) {
        super()
        const { exchange } = props
        this.state = {exchange, wallets:[]}
        this.walletsHandler = this.walletsHandler.bind(this)
    }

    walletsHandler(event, wallets) {
        this.setState({wallets})
        console.log("wallets ", wallets)
    }

    componentDidMount() {
        ipcRenderer.on(`${this.state.exchange}:response:wallets`, this.walletsHandler ,1000)
        ipcRenderer.send(`request`, {
            exchange: this.state.exchange,
            channel: "wallets",
            event: "subscribe",
            timeout: 5000,
        })
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        ipcRenderer.removeListener(`${this.state.exchange}:response:wallets`, this.walletsHandler)
        ipcRenderer.send(`request`, {
            exchange: this.state.exchange,
            channel: "wallets",
            event: "unsubscribe"
        })
        console.log("component will unmount")
    }

    onClick() {
        
    }

    render() {
        const { wallets } = this.state;
        return (
            
            <div>
                <div>{JSON.stringify(wallets)}</div>
                {/*wallets.valueSeq().map(wallet => (
                    <Wallet key={wallet.currency} wallet={wallet} />
                ))*/}
            </div>
        );
    }
}


export default Wallets;