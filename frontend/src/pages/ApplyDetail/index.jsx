import React from "react";
import { NavBar } from "../../components/Common";
import ApplyDetailComponent from "../../components/ApplyDetail";
import FooterComponent from "../../components/Common/Footer";

function ApplyDetail({ match, location }) {
  const feedId = parseInt(match.params.postId);
  const date = location.search.slice(1);
  return (
    <>
      <NavBar />
      <ApplyDetailComponent feedId={feedId} date={date} />
      <FooterComponent />
    </>
  );
}
export default ApplyDetail;
