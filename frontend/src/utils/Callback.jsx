import { useEffect } from "react";
import qs from "qs";

const Callback = () => {
  console.log(window.location);
  const ele = window.location.pathname.split("/");
  console.log(ele);
  localStorage.setItem("accessToken", ele[4]);
  localStorage.setItem("userId", ele[2]);
  window.location.replace("/");
};

export default Callback;
