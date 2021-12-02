import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { useRecoilValue } from "recoil";
import { dateState } from "../../../recoil/filterState";
import { userState } from "../../../recoil/userState";

import Presenter from "./presenter";

export default function ListContainer({ feedList, postBookmark, setFeedList }) {
  const date = useRecoilValue(dateState).date;
  const user = useRecoilValue(userState);
  const history = useHistory();
  const [modalSwitch, setModalSwitch] = useState(false);

  const goLogin = () => {
    let value = window.confirm("이용하려면 로그인 먼저 해주세요!");
    if (value) {
      setModalSwitch(true);
    }
  };

  const goToDetailPage = (e) => {
    history.push(`/apply/${e.target.id}?${moment(date).format("YYYY-MM-DD")}`);
  };

  const clickBookmark = (e, a) => {
    var Data = [...feedList];
    var likeData = Data[feedList.findIndex((i) => i.id === a.id)];
    if (a.isLike) {
      likeData.likes = likeData.likes - 1;
      likeData.isLike = !likeData.isLike;
      setFeedList(Data);
    } else {
      likeData.likes = likeData.likes + 1;
      likeData.isLike = !likeData.isLike;
      setFeedList(Data);
    }
    // postBookmark(e.target.id);
  };

  return (
    <Presenter
      feedList={feedList}
      goToDetailPage={goToDetailPage}
      user={user}
      clickBookmark={clickBookmark}
      modalSwitch={modalSwitch}
      setModalSwitch={setModalSwitch}
      goLogin={goLogin}
    />
  );
}
