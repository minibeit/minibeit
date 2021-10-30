import React from "react";
import { MainContent } from "../../components/Main";
import { SignupInfoForm } from "../../components/SignupInfo";
import { NavBar } from "../../components/Common";

export default function SignupInfo() {
  return (
    <>
      <NavBar />
      <MainContent />
      <SignupInfoForm />
    </>
  );
}
