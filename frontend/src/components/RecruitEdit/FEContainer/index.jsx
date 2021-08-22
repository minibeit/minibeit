import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { feedCreateApi, feedEditApi } from "../../../utils";
import { feedDetailApi } from "../../../utils";
import PFEContainer from "./PFEContainer";

function FEContainer({ postId }) {
  const history = useHistory();
  const [post, setPost] = useState([]);
  const getFeedDetail = async () => {
    try {
      const result = await feedDetailApi(postId);
      if (result) {
        await setPost(result);
        console.log(result);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };

  useEffect(() => {
    getFeedDetail();
  }, []);

  const FEHandler = async (
    title,
    dueDate,
    doDate,
    pay,
    time,
    place,
    content,
    phoneNum,
    files
  ) => {
    try {
      const result = await feedEditApi(
        title,
        dueDate,
        doDate,
        pay,
        time,
        place,
        content,
        phoneNum,
        files,
        postId
      );
      console.log(result.id);
      if (result.id) {
        window.alert("게시물 수정에 성공!");
        history.push(`/feedList/${result.id}`);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };
  return <PFEContainer post={post} FEHandler={FEHandler} />;
}
export default FEContainer;
