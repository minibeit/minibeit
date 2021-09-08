import React from "react";
import { NavBar } from "../../components/Common";
import { FeedInfoContainer } from "../../components/ApplyDetail";

function ApplyDetail({ match }) {
  const feedId = parseInt(match.params.postId);
  return (
    <>
      <NavBar />
      <FeedInfoContainer feedId={feedId} />
    </>
  );
}
export default ApplyDetail;
