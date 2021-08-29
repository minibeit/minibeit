import React from "react";
import { BProfileEditCont } from "../../components/BProfileEdit";

export default function BProfileEdit({ match }) {
  const { businessId } = match.params;
  return (
    <>
      <BProfileEditCont businessId={businessId} />
    </>
  );
}
