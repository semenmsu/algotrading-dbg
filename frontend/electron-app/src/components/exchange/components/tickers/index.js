import React from 'react'



/*import React from "react";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import DataServerContext from "../Context/DataServerContext";
import { connect } from "react-redux";
import SymbolFinder from "./SymbolFinder";
import SymbolFinder2 from "./SymbolFinder2";
import OrderManager from "./OrderManager";
import Expandable from "./Expandable";
import InstrumentAggr1 from "./InstrumentAggr1";
import "./quotes.css";

class Quotes extends React.Component {
    static contextType = DataServerContext;

    constructor(props) {
        super(props);
        this.state = {
            instruments: new Map(),
            selectedInstrument: undefined,
            initialPrice: undefined
        };
    }

    componentDidMount() {
        const { instruments } = this.state;
        //instruments.set("Si-9.16", {});
        //instruments.set("RTS-9.16", {});
        let subscribedSymbols = JSON.parse(
            localStorage.getItem("subscribed_symbols")
        );
        console.log(
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ typeof ",
            typeof subscribedSymbols
        );
        console.log(subscribedSymbols);
        if (subscribedSymbols) {
            Object.keys(subscribedSymbols).forEach(symbol => {
                this.subscribe(symbol);
            });
        }
    }

    componentWillUnmount() {
        console.log("component will unmount, should unsubscribe");
    }

    onAggr1 = (symbol, data) => {};

    OnMessage = message => {
        console.log("Quotes ", message);
    };

    subscribe = symbol => {
        console.log(symbol);
        //this.context.subscribe(symbol, this.OnMessage);
        const { instruments } = this.state;
        instruments.set(symbol, {});
        this.setState({ instruments: instruments });
    };

    delete = symbol => {
        console.log("detelte", symbol);
        const { instruments } = this.state;
        if (instruments.has(symbol)) {
            instruments.delete(symbol);
            this.setState({ instruments: instruments });
        }
    };

    selectedInstrument = (symbol, initialPrice) => {
        console.log("selectedInstrument", symbol);
        this.setState({ selectedInstrument: symbol, initialPrice });
    };

    render() {
        let keys = Array.from(this.state.instruments.keys());
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "stretch"
                }}
            >
                <Expandable
                    title="SYMBOL FINDER"
                    style={{
                        marginTop: "6px",

                        width: "480px",
                        background: "#1B262D"
                    }}
                >
                    <div>
                        <SymbolFinder2
                            onAggr1={this.onAggr1}
                            subscribe={this.subscribe}
                        />
                    </div>
                </Expandable>

                <Expandable title="QUOTES" style={{ marginTop: "6px" }}>
                    <div
                        style={{
                            background: "#1B262D",
                            width: "480px"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                borderBottom: "1px #141C21 solid"
                            }}
                        >
                            <div
                                style={{ width: "200px", textAlign: "center" }}
                            >
                                Symbol
                            </div>
                            <div
                                style={{ width: "120px", textAlign: "center" }}
                            >
                                BID
                            </div>
                            <div
                                style={{ width: "120px", textAlign: "center" }}
                            >
                                ASK
                            </div>
                            <div
                                style={{ width: "40px", textAlign: "center" }}
                            ></div>
                        </div>
                        {keys.map(key => {
                            return (
                                <InstrumentAggr1
                                    key={key}
                                    symbol={key}
                                    context2={this.context}
                                    delete={this.delete}
                                    selectedInstrument={this.selectedInstrument}
                                />
                            );
                        })}

                    </div>
                </Expandable>
                <Expandable
                    title={
                        this.state.selectedInstrument
                            ? `ORDER MANAGER   (${this.state.selectedInstrument})`
                            : "ORDER MANAGER"
                    }
                    style={{ marginTop: "6px" }}
                >
                    <div
                        style={{
                            background: "#1B262D",
                            width: "480px",
                            paddingBottom: "24px"
                        }}
                    >
                        {this.state.selectedInstrument && (
                            <div key={this.state.selectedInstrument}>
                                <OrderManager
                                    symbol={this.state.selectedInstrument}
                                    initialPrice={this.state.initialPrice}
                                />
                            </div>
                        )}
                    </div>
                </Expandable>
                
            </div>
        );
    }
}

export default Quotes;*/