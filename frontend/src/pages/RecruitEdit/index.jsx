import React from "react";
import { FEContainer } from "../../components/RecruitEdit";

export default function RecruitEdit({ match }) {
  const { postId } = match.params;

  return (
    <>
      <FEContainer postId={postId} />
    </>
  );
}
