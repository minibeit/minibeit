import React from "react";

import { NavBar } from "../../components/Common";

import BProfileComponent from "../../components/BProfile";

export default function BProfile({ match }) {
  const { businessId } = match.params;
  return (
    <>
      <NavBar />
      <BProfileComponent businessId={parseInt(businessId)} />
    </>
  );
}
