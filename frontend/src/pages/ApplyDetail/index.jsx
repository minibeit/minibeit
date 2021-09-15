import React from "react";
import { NavBar } from "../../components/Common";
import { FeedInfoContainer } from "../../components/ApplyDetail";

function ApplyDetail({ match, location }) {
  const feedId = parseInt(match.params.postId);
  const date = location.search.slice(1);
  return (
    <>
      <NavBar />
      <FeedInfoContainer feedId={feedId} date={date} />
    </>
  );
}
export default ApplyDetail;
