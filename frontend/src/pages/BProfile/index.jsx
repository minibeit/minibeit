import React from "react";
import BProfileComponent from "../../components/BProfile";

export default function BProfile({ match }) {
  const { businessId } = match.params;
  return (
    <>
      <BProfileComponent businessId={parseInt(businessId)} />
    </>
  );
}
