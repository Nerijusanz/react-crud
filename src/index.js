import React from 'react';
import ReactDOM from 'react-dom';

// redux setups
import { Provider } from 'react-redux';
import store from './store/store';

// App component
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
