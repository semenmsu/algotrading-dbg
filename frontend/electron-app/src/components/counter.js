import React, {Component} from "react"
const { ipcRenderer } = window.require("electron")

export default class Counter extends Component {

    state = {
        counter: 0
    }

    componentDidMount() {
        ipcRenderer.on("react:counter:update", (event, counter) => {
            //console.log(event, counter)
            this.setState({counter})
        })
    }

    render() {
        return(
            <div>
                Counter: {this.state.counter}
            </div>
        )
    }
}

