import React, { Component } from 'react';
import './css/App.css';
import Memorizer from './components/Memorizer';
import 'material-components-web/dist/material-components-web.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Memorizer/>
      </div>
    );
  }
}

export default App;
