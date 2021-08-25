import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.REACT_APP_API_URL) // 3000;


axios.defaults.withCredentials = true;
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
