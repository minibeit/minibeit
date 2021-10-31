import React from "react";

import { NavBar } from "../../components/Common";
import ProfileTestComponent from "../../components/ProfileTest";

export default function ProfileTest({ match }) {
  return (
    <>
      <NavBar />
      <ProfileTestComponent userId={match.params.userId} />
    </>
  );
}
