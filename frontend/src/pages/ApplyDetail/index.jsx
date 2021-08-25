import React from "react";
import {
  FDBottomContainer,
  FDTopContainer,
} from "../../components/ApplyDetail";
import NavBar from "../../components/Common/NavBar";

function ApplyDetail({ match }) {
  const { postId } = match.params;
  return (
    <>
      <NavBar />
      <FDTopContainer />
      <FDBottomContainer postId={postId} />
    </>
  );
}
export default ApplyDetail;
