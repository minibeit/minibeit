import React from "react";
import RecruitComponent from "../../components/Recruit";
import { NavBar } from "../../components/Common";
import FooterComponent from "../../components/Common/Footer";

export default function Recruit() {
  return (
    <>
      <NavBar />
      <RecruitComponent />
      <FooterComponent />
    </>
  );
}
