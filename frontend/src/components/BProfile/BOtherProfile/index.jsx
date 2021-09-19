import React from "react";
import PBOtherProfile from "./PBOtherProfile";

export default function BOtherProfile({ businessId }) {
  return (
    <div>
      <PBOtherProfile originalId={businessId} />
    </div>
  );
}
