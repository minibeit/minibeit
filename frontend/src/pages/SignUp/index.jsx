import React from "react";
import MainComponent from "../../components/Main";
import SignUpComponent from "../../components/SignUp";
import { NavBar } from "../../components/Common";
import FooterComponent from "../../components/Common/Footer";

export default function SignUP() {
  return (
    <>
      <NavBar />
      <MainComponent />
      <SignUpComponent />
      <FooterComponent />
    </>
  );
}
