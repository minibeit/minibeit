import React from "react";

import { NavBar } from "../../components/Common";
import ProfileComponent from "../../components/Profile";

export default function Profile({ match }) {
  return (
    <>
      <NavBar />
      <ProfileComponent view={match.params.view} />
    </>
  );
}
