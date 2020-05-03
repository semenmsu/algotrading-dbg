import React from 'react'
import Wallets from "./components/wallets"

class Exchange extends React.Component {

    state = {show:false}

    onClick() {
        this.setState({show: !this.state.show})
        
    }
    render() {
        return(
            <div>
                {this.state.show && <Wallets exchange="bitfinex" />}
                <button onClick={() => this.onClick()}>click</button>
            </div>
        );
    }
}

export default Exchange