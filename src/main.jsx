import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Make sure this import is correct
import { Provider } from 'react-redux';
import App from './App.jsx';
import { store } from '../src/redux/store.js'; // Adjust the path if needed

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create a root

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);