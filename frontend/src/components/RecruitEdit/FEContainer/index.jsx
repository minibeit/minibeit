import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { feedEditApi } from "../../../utils";
import { feedDetailApi } from "../../../utils";
import PFEContainer from "./PFEContainer";

function FEContainer({ postId }) {
  const history = useHistory();
  const [post, setPost] = useState([]);
  const getFeedDetail = async () => {
    await feedDetailApi(postId)
      .then(async (res) => setPost(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFeedDetail();
  });

  const FEHandler = async (inputs, files) => {
    await feedEditApi(inputs, files, postId)
      .then(async (res) => {
        window.alert("게시물 수정에 성공!");
        history.push(`/feedList/${res.id}`);
      })
      .catch((err) => console.log(err));
  };
  return <PFEContainer post={post} FEHandler={FEHandler} />;
}
export default FEContainer;
