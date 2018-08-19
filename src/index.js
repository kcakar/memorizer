import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const root=document.getElementById('root');
if(root)
{
    ReactDOM.render(<App />, document.getElementById('root'));
}
registerServiceWorker();
