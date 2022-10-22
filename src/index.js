import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import 'react-confirm-alert/src/react-confirm-alert.css';
import FunctionsProvider from './components/Providers/FunctionsProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FunctionsProvider>
        <App />
      </FunctionsProvider>
    </Provider>
  </React.StrictMode>
);