import React from "react";
import { BProfileInfo } from "../../components/BProfile";
import BProfileSection from "../../components/BProfile/BProfileSection";
import { NavBar } from "../../components/Common";

export default function BProfile({ match }) {
  const { businessId } = match.params;

  return (
    <>
      <NavBar />
      {businessId === "0" ? (
        <BProfileSection />
      ) : (
        <BProfileInfo businessId={parseInt(businessId)} />
      )}
    </>
  );
}
