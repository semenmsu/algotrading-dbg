import React from 'react';
//import logo from '../../images/logo.svg';
import './app.css';
import Counter from '../counter'
import Exchange from '../exchange'
import { Context } from '../../context'
const { ipcRenderer } = window.require("electron")

//<Context.Provider value={{on: ipcRenderer.on, send: ipcRenderer.send, removeListener: ipcRenderer.removeListener}}>
function App() {
  return (
    <Context.Provider value={{
      on: (...args) => ipcRenderer.on(...args),
      send: (...args) => ipcRenderer.send(...args),
      removeListener: (...args) => ipcRenderer.removeListener(...args)}}>
    <div className="App-body">
      <Counter/>
      <Exchange/>
    </div>
    </Context.Provider>
  );
}

export default App;
