import React from "react";
import MainComponent from "../../components/Main";
import SignUpComponent from "../../components/SignUp";
import { NavBar } from "../../components/Common";

export default function SignUp() {
  return (
    <>
      <NavBar />
      <MainComponent />
      <SignUpComponent />
    </>
  );
}
