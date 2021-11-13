import React from "react";
import { NavBar } from "../../components/Common";
import RecruitCompleteComponent from "../../components/RecruitComplete";

export default function RecruitComplete({match}) {
  const postId = match.params.postId
  return (
    <>
      <NavBar />
      <RecruitCompleteComponent postId={postId}/>
    </>
  );
}
