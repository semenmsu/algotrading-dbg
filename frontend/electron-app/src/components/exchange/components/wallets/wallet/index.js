import React from "react";
import './wallet.css'



const Wallet = ({ wallet: {currency, balance} }) => 
    <div className="wallet">
        <div>{ currency }</div>
        <div>{ balance }</div>
    </div>

export default Wallet

