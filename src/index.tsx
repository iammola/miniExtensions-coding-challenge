import { render } from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';

import store from './app/store';
import App from './features/app/App';

import './styles.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
