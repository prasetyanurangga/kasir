import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MasterFood from "./Pages/Food/Daftar";
import FormMenu from "./Pages/Food/Form";
import App from "./Pages/Main";
import store from "./Store/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" index={true} element={<App />} />
          <Route path="/food">
            <Route index={true} element={<MasterFood />} />
            <Route index={false} path="form" element={<FormMenu />} />{" "}
            {/*A nested route!*/}
            <Route index={false} path="form/:id" element={<FormMenu />} />{" "}
            {/*A nested route!*/}
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
