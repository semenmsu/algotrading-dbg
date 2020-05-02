import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/counter'
import Exchange from './components/Exchange'


function App() {
  return (
    <div className="App-body">
      <Counter/>
      <Exchange/>
    </div>
  );
}

export default App;
