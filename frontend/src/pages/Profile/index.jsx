import React from "react";
import ProfileComponent from "../../components/Profile";

export default function Profile({ match }) {
  return (
    <>
      <ProfileComponent view={match.params.view} />
    </>
  );
}
