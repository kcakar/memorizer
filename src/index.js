import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import Memorizer from './components/Memorizer';
import 'material-components-web/dist/material-components-web.css'

const root=document.getElementById('root');
if(root)
{
    ReactDOM.render(<Memorizer />, document.getElementById('root'));
}
registerServiceWorker();
