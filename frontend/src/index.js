import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";
import dotenv from "dotenv";
import Scrolltop from "./ScrollTop";
dotenv.config();

axios.defaults.withCredentials = true;
ReactDOM.render(
  <BrowserRouter>
    <Scrolltop />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
