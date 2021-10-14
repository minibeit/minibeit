import React, { useCallback, useEffect, useState } from "react";
import PFeedInfoContainer from "./PFeedInfoContainer";
import PropTypes from "prop-types";
import HomeIcon from "@mui/icons-material/Home";
import {
  bookmarkApi,
  feedDetailApi,
  feedEditApi,
} from "../../../utils/feedApi";
import ApplyConfirmModal from "../../Common/Modal/ApplyConfirmModal";
import { LoadingSpinner } from "../../Common";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { applyState } from "../../../recoil/applyState";
import { userState } from "../../../recoil/userState";
import PApplyControll from "./PApplyControll";

import * as S from "../style";
import { useHistory } from "react-router";

FeedInfoContainer.propTypes = {
  feedId: PropTypes.number.isRequired,
  date: PropTypes.string,
};

export default function FeedInfoContainer({ feedId, date }) {
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
        <S.TitleBox>
          <S.TitleContent>
            <p>카테고리</p>
            <p>{feedDetailData.title}</p>
            <div>
              <HomeIcon />
              <p>{feedDetailData.businessProfileInfo.name}</p>
            </div>
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
          <PFeedInfoContainer
            feedDetailData={feedDetailData}
            date={date}
            editDetail={editDetail}
          />
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
