import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import React, { Component } from 'react';
import Memorizer from './components/Memorizer';
import Landing from './components/Landing';
import 'material-components-web/dist/material-components-web.css'
import {BrowserRouter as Router,Route} from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/memorizer" component={Memorizer}/>
        </div>
      </Router>
    );
  }
}

const root=document.getElementById('root');
if(root)
{
    ReactDOM.render(<App />, document.getElementById('root'));
}
registerServiceWorker();
