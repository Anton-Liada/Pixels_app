import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './App';

const Root = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

createRoot(document.getElementById('root'))
  .render(<Root />);
