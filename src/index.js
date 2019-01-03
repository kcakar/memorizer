import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import Memorizer from './components/Memorizer';

const root=document.getElementById('root');
if(root)
{
    ReactDOM.render(<Memorizer />, document.getElementById('root'));
}
registerServiceWorker();
