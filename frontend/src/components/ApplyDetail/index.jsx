import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { bookmarkApi, feedDetailApi, feedEditApi } from "../../utils/feedApi";
import ApplyConfirmModal from "../Common/Modal/ApplyConfirmModal";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { applyState } from "../../recoil/applyState";
import { userState } from "../../recoil/userState";

import FeedInfoContainer from "./FeedInfoContainter";
import ApplyController from "./ApplyController";
import TitleContiner from "./TitleContiner";

import * as S from "./style";
import { useHistory } from "react-router";

ApplyDetailComponent.propTypes = {
  feedId: PropTypes.number.isRequired,
  date: PropTypes.string,
};

export default function ApplyDetailComponent({ feedId, date }) {
  const [feedDetailData, setFeedDetailData] = useState();
  const [modalSwitch, setModalSwitch] = useState(false);
  const isLogin = useRecoilValue(userState).isLogin;
  const apply = useRecoilValue(applyState);
  const history = useHistory();

  const resetApply = useResetRecoilState(applyState);

  const getFeedDetail = useCallback(
    (feedId) => {
      feedDetailApi(feedId, isLogin)
        .then((res) => setFeedDetailData(res.data))
        .catch((err) => {
          if (err.response.status === 400) {
            alert("삭제된 게시물 입니다.");
            history.goBack();
          }
        });
    },
    [isLogin, history]
  );

  const postBookmark = async (postId) => {
    await bookmarkApi(postId).then().catch();
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

  const editDetail = (postId, data) => {
    feedEditApi(postId, data).then((res) => getFeedDetail(res.data.id));
  };

  useEffect(() => {
    getFeedDetail(feedId);
    resetApply();
  }, [feedId, getFeedDetail, resetApply]);

  return (
    <S.FeedContainer>
      {feedDetailData && (
        <TitleContiner
          title={feedDetailData.title}
          businessProfileInfo={feedDetailData.businessProfileInfo}
          clickBookmark={clickBookmark}
          isLogin={isLogin}
          id={feedDetailData.id}
          isLike={feedDetailData.isLike}
          likes={feedDetailData.likes}
        />
      )}
      {feedDetailData && (
        <div>
          <FeedInfoContainer
            feedDetailData={feedDetailData}
            date={date}
            editDetail={editDetail}
          />
          <ApplyController
            apply={apply}
            feedDetailData={feedDetailData}
            setModalSwitch={setModalSwitch}
          />
          {modalSwitch ? (
            <ApplyConfirmModal setModalSwitch={setModalSwitch} />
          ) : null}
        </div>
      )}
    </S.FeedContainer>
  );
}
