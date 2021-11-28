import React from "react";
import { NavBar } from "../../components/Common";
import FooterComponent from "../../components/Common/Footer";
import MainComponent from "../../components/Main";

function Main() {
  return (
    <>
      <NavBar />
      <MainComponent />
      <FooterComponent />
    </>
  );
}
export default Main;
