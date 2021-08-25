import React, { useEffect, useState } from "react";
import { feedDetailApi } from "../../../utils";
import PFDBottomContainer from "./PFDBottomContainer";

function FDBottomContainer({ postId }) {
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
  return <PFDBottomContainer post={post} />;
}
export default FDBottomContainer;
