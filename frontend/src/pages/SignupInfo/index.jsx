import React from "react";
import  MainComponent from "../../components/Main";
import { SignupInfoForm } from "../../components/SignupInfo";
import { NavBar } from "../../components/Common";

export default function SignupInfo() {
  return (
    <>
      <NavBar />
      <MainComponent />
      <SignupInfoForm />
    </>
  );
}
