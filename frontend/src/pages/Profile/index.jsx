import React from "react";

import { NavBar } from "../../components/Common";
import {
  BProfileSection,
  LikeListBox,
  UserInfo,
} from "../../components/Profile";

export default function Profile() {
  return (
    <>
      <NavBar />
      <UserInfo />
      <LikeListBox />
      <BProfileSection />
    </>
  );
}
