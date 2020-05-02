import React from 'react'
import Wallets from "./Wallets"

class Exchange extends React.Component {

    state = {show:true}

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