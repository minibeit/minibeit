import React, { useState } from "react";
import PFilterContainer from "./PFilterContainer";
import PListContainer from "./PListContainer";
import { bookmarkApi, feedlistApi } from "../../../utils/feedApi";
import PBtnContainer from "./PBtnContainer";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";

export default function FilterAndList() {
  const user = useRecoilValue(userState);
  const [feedList, setFeedList] = useState();
  const [totalPages, setTotalPages] = useState();

  const getFeedList = async (page, schoolId, date, payment) => {
    await feedlistApi(page, schoolId, date, payment, user.isLogin)
      .then((res) => {
        setFeedList(res.data.content);
        setTotalPages(res.data.totalPages);
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
      {totalPages ? (
        <PBtnContainer totalPages={totalPages} getFeedList={getFeedList} />
      ) : null}
    </>
  );
}
