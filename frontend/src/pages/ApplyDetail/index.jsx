import React from "react";
import NavBar from "../../components/Common/NavBar";
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
