import React, { useContext } from "react";
import Wallet from "./wallet"
import "./wallets.css"
import { Context } from '../../../../context'

class Wallets extends React.Component {

    static contextType = Context

    constructor(props) {
        super()
        const { exchange } = props
        this.state = {exchange, wallets:[]}
        this.walletsHandler = this.walletsHandler.bind(this)
    }

    walletsHandler(event, wallets) {
        this.setState({wallets})
    }

    componentDidMount() {
        const { on, send, removeListener } = this.context
        this.setState({on, send, removeListener})

        on(`${this.state.exchange}:response:wallets`, this.walletsHandler ,1000)
        send(`request`, {
            exchange: this.state.exchange,
            channel: "wallets",
            event: "subscribe",
            timeout: 5000,
        })
    }

    componentWillUnmount() {
        const { send, removeListener} = this.state
        removeListener(`${this.state.exchange}:response:wallets`, this.walletsHandler)
        send(`request`, {
            exchange: this.state.exchange,
            channel: "wallets",
            event: "unsubscribe"
        })
    }

    render() {
        const { wallets } = this.state;
        return (
            
            <div className="wallets">
                {wallets.map(wallet => (
                    <Wallet key={wallet.currency} wallet={wallet} />
                ))}
            </div>
        );
    }
}


export default Wallets;