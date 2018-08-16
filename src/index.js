import React from 'react';
import ReactDOM from 'react-dom';

//redux setup
import {Provider} from 'react-redux';
import store from './store';
//main component
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

