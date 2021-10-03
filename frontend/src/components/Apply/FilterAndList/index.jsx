import React, { useState } from "react";
import PFilterContainer from "./PFilterContainer";
import PListContainer from "./PListContainer";
import { bookmarkApi, feedlistApi } from "../../../utils/feedApi";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";

export default function FilterAndList() {
  const user = useRecoilValue(userState);
  const [feedList, setFeedList] = useState();

  const getFeedList = async (page, schoolId, date, filter, category) => {
    await feedlistApi(page, schoolId, date, filter, category, user.isLogin)
      .then((res) => {
        setFeedList(res.data.content);
      })
      .catch((err) => console.log(err));
  };

  const postBookmark = async (postId) => {
    await bookmarkApi(postId)
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PFilterContainer getFeedList={getFeedList} />
      {feedList ? (
        <PListContainer feedList={feedList} postBookmark={postBookmark} />
      ) : null}
    </>
  );
}
