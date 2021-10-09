import React, { useCallback, useEffect, useState } from "react";
import PFeedInfoContainer from "./PFeedInfoContainer";
import PropTypes from "prop-types";
import { bookmarkApi, feedDetailApi } from "../../../utils/feedApi";
import ApplyConfirmModal from "../../Common/Modal/ApplyConfirmModal";
import { LoadingSpinner } from "../../Common";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { applyState } from "../../../recoil/applyState";
import { userState } from "../../../recoil/userState";
import PApplyControll from "./PApplyControll";

import * as S from "../style";

FeedInfoContainer.propTypes = {
  feedId: PropTypes.number.isRequired,
  date: PropTypes.string,
};

export default function FeedInfoContainer({ feedId, date }) {
  const [feedDetailData, setFeedDetailData] = useState();
  const [modalSwitch, setModalSwitch] = useState(false);
  const isLogin = useRecoilValue(userState).isLogin;
  const apply = useRecoilValue(applyState);

  const resetApply = useResetRecoilState(applyState);

  const getFeedDetail = useCallback(
    (feedId) => {
      feedDetailApi(feedId, isLogin)
        .then((res) => setFeedDetailData(res.data))
        .catch((err) => console.log(err));
    },
    [isLogin]
  );

  const postBookmark = async (postId) => {
    await bookmarkApi(postId)
      .then()
      .catch((err) => console.log(err));
  };

  const clickBookmark = (e) => {
    postBookmark(e.target.id);
    if (e.target.textContent === "북마크 중") {
      e.target.textContent = "북마크";
      e.target.nextSibling.textContent =
        parseInt(e.target.nextSibling.textContent) - 1;
    } else {
      e.target.textContent = "북마크 중";
      e.target.nextSibling.textContent =
        parseInt(e.target.nextSibling.textContent) + 1;
    }
  };

  useEffect(() => {
    getFeedDetail(feedId);
    resetApply();
  }, [feedId, getFeedDetail, resetApply]);

  return (
    <S.FeedContainer>
      {feedDetailData && (
        <S.TitleBox>
          <S.TitleContent>
            <p>카테고리</p>
            <h1>{feedDetailData.title}</h1>
            <p>{feedDetailData.businessProfileInfo.name}</p>
          </S.TitleContent>
          <S.TitleBookMark>
            {isLogin ? (
              <button id={feedDetailData.id} onClick={clickBookmark}>
                {feedDetailData.isLike ? "북마크 중" : "북마크"}
              </button>
            ) : null}
            <p>{feedDetailData.likes}</p>
          </S.TitleBookMark>
        </S.TitleBox>
      )}

      <S.FeedContainer>
        {feedDetailData ? (
          <PFeedInfoContainer feedDetailData={feedDetailData} date={date} />
        ) : (
          <LoadingSpinner />
        )}
      </S.FeedContainer>
      {feedDetailData && (
        <PApplyControll
          apply={apply}
          feedDetailData={feedDetailData}
          setModalSwitch={setModalSwitch}
        />
      )}
      {modalSwitch ? (
        <ApplyConfirmModal setModalSwitch={setModalSwitch} />
      ) : null}
    </S.FeedContainer>
  );
}
