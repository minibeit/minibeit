import React from "react";
import { BProfileInfo } from "../../components/BProfile";

export default function BProfile({ match }) {
  const { businessId } = match.params;
  return (
    <>
      <BProfileInfo businessId={parseInt(businessId)} />
    </>
  );
}
