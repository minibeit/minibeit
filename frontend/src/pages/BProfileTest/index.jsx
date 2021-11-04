import React from "react";

import { NavBar } from "../../components/Common";

import BProfileComponent from "../../components/BProfileTest";

export default function BProfileTest({ match }) {
  const { businessId } = match.params;
  return (
    <>
      <NavBar />
      <BProfileComponent businessId={parseInt(businessId)} />
    </>
  );
}
