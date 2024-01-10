import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import 'core-js';
import store from "./store/store";
import App from "./App";
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
      <Provider store={store}>
    <GoogleOAuthProvider clientId="774203206459-8588ru43hasqfkqc1n89do7cevjt3d8u.apps.googleusercontent.com">
        <HashRouter>
          <App />
        </HashRouter>
    </GoogleOAuthProvider>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
