import './App.css';
import React, { Component } from 'react'
import Rotas from './rotas/Rotas';

export const hostBackEnd = 'http://localhost:3000'
export const hostWebSocket = 'ws://localhost:3000'

class App extends Component {

  render() {
    return (
      <div>
        <Rotas/>
      </div>
    );
  }
}

export default App;
