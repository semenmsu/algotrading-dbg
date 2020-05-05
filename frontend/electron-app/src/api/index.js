const { ipcRenderer } = window.require("electron")

export const ipcAPI = {
    on: (...args) => ipcRenderer.on(...args),
    send: (...args) => ipcRenderer.send(...args),
    removeListener: (...args) => ipcRenderer.removeListener(...args),
}




/*
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

export default App;*/