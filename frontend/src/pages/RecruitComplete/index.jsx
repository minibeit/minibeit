import React from "react";
import RecruitCompleteComponent from "../../components/RecruitComplete";

export default function RecruitComplete({ match }) {
  const postId = match.params.postId;
  return (
    <>
      <RecruitCompleteComponent postId={postId} />
    </>
  );
}
