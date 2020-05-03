import React from "react";


export default class Wallet extends React.Component {
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