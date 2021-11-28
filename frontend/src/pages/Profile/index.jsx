import React from "react";

import { NavBar } from "../../components/Common";
import ProfileComponent from "../../components/Profile";
import FooterComponent from "../../components/Common/Footer";

export default function Profile({ match }) {
  return (
    <>
      <NavBar />
      <ProfileComponent view={match.params.view} />
      <FooterComponent />
    </>
  );
}
