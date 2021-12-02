import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { useRecoilValue } from "recoil";
import { dateState } from "../../../recoil/filterState";
import { userState } from "../../../recoil/userState";

import Presenter from "./presenter";

export default function ListContainer({ feedList, postBookmark }) {
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

  const clickBookmark = (e) => {
    var target;
    if (e.target.nodeName === "path") {
      target = e.target.parentNode;
    } else {
      target = e.target;
    }
    postBookmark(target.id);
    if (target.style.color === "rgb(6, 66, 255)") {
      target.style.color = "";
      target.nextSibling.textContent =
        parseInt(target.nextSibling.textContent) - 1;
    } else {
      target.style.color = "rgb(6, 66, 255)";
      target.nextSibling.textContent =
        parseInt(target.nextSibling.textContent) + 1;
    }
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
