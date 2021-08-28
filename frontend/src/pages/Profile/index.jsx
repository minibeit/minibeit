import React from "react";

import NavBar from "../../components/Common/NavBar";
import { BProfileSection, UserInfo } from "../../components/Profile";

export default function Profile() {
  return (
    <>
      <NavBar />
      <UserInfo />
      <BProfileSection />
    </>
  );
}
