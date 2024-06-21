import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import { SocketContextProvider } from "./context/SocketContext";

// import createStore from "react-auth-kit/createStore";
// import AuthProvider from "react-auth-kit";

// const authStore = createStore({
//   authName: "_auth",
//   authType: "cookie",
//   cookieDomain: window.location.hostname,
//   cookieSecure: window.location.protocol === "https:",
//   cookieSecure: true,
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
