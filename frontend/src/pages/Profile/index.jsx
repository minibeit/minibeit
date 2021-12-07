import React from "react";
import { useLocation } from "react-router";
import ProfileComponent from "../../components/Profile";

export default function Profile() {
  const location = useLocation();
  return (
    <>
      <ProfileComponent view={location.search.slice(1)} />
    </>
  );
}
