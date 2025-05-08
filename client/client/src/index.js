import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { withRouter } from './withRouter';
import reportWebVitals from './reportWebVitals';

const WithRouterApp = withRouter(App);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WithRouterApp />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
