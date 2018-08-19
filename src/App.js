import React, { Component } from 'react';
import './css/App.css';
import Memorizer from './components/Memorizer';
import Landing from './components/Landing';
import 'material-components-web/dist/material-components-web.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Memorizer/> */}
        <Landing/>
      </div>
    );
  }
}

export default App;
