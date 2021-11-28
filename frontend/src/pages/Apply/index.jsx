import React from "react";
import { NavBar } from "../../components/Common";
import ApplyComponent from "../../components/Apply";
import FooterComponent from "../../components/Common/Footer";

export default function Apply({ location }) {
  const page =
    location.search.slice(1) === "" ? null : parseInt(location.search.slice(1));
  return (
    <>
      <NavBar />
      <ApplyComponent page={page} />
      <FooterComponent />
    </>
  );
}
