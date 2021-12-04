import React from "react";
import ApplyDetailComponent from "../../components/ApplyDetail";

function ApplyDetail({ match, location }) {
  const feedId = parseInt(match.params.postId);
  const date = location.search.slice(1);
  return (
    <>
      <ApplyDetailComponent feedId={feedId} date={date} />
    </>
  );
}
export default ApplyDetail;
