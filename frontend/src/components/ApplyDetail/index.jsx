import React, { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";
import {
  applyApi,
  bookmarkApi,
  feedDetailApi,
  feedEditApi,
} from "../../utils/feedApi";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { applyState } from "../../recoil/applyState";
import { userState } from "../../recoil/userState";

import FeedInfoContainer from "./FeedInfoContainter";
import ApplyController from "./ApplyController";
import ApplyControllerForMobile from "./ApplyControllerForMobile";
import TitleContiner from "./TitleContiner";

import * as S from "./style";
import { useHistory } from "react-router";
import AskCompleteApplication from "../Common/Alert/AskCompleteApplication";
import CreateAuthModal from "../Common/Modal/CreateAuthModal";

export default function ApplyDetailComponent({ feedId, date }) {
  const [feedDetailData, setFeedDetailData] = useState();
  const user = useRecoilValue(userState);
  const apply = useRecoilValue(applyState);
  const history = useHistory();

  const resetApply = useResetRecoilState(applyState);

  const getFeedDetail = useCallback(
    (feedId) => {
      feedDetailApi(feedId, user.isLogin)
        .then((res) => setFeedDetailData(res.data.data))
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error("삭제된 게시물 입니다.");
            history.goBack();
          }
        });
    },
    [user.isLogin, history]
  );

  const postBookmark = async (postId) => {
    await bookmarkApi(postId).then().catch();
  };

  const clickBookmark = (feedId) => {
    if (user.isLogin) {
      postBookmark(feedId);
      if (feedDetailData.isLike) {
        setFeedDetailData({
          ...feedDetailData,
          isLike: false,
          likes: feedDetailData.likes - 1,
        });
      } else {
        setFeedDetailData({
          ...feedDetailData,
          isLike: true,
          likes: feedDetailData.likes + 1,
        });
      }
    } else {
      setModalSwitch(true);
    }
  };

  const editDetail = (postId, data) => {
    feedEditApi(postId, data).then((res) => getFeedDetail(res.data.data.id));
  };

  const [applyAlert, setApplyAlert] = useState(false);
  const [sliderSwitch, setSliderSwitch] = useState(false);
  const [modalSwitch, setModalSwitch] = useState(false);

  const checkLogin = () => {
    if (user.isLogin) {
      setApplyAlert(true);
    } else {
      setModalSwitch(true);
    }
  };

  useEffect(() => {
    getFeedDetail(feedId);
    resetApply();
  }, [feedId, getFeedDetail, resetApply]);

  return (
    <div>
      {feedDetailData && apply.postId !== null && (
        <ApplyControllerForMobile
          apply={apply}
          feedDetailData={feedDetailData}
          checkLogin={checkLogin}
        />
      )}
      <S.Container>
        {feedDetailData && (
          <TitleContiner
            feedDetailData={feedDetailData}
            clickBookmark={clickBookmark}
          />
        )}
        {feedDetailData && (
          <S.UnderTitle>
            <FeedInfoContainer
              feedDetailData={feedDetailData}
              date={date}
              editDetail={editDetail}
              sliderSwitch={sliderSwitch}
              setSliderSwitch={setSliderSwitch}
            />
            <ApplyController
              apply={apply}
              feedDetailData={feedDetailData}
              checkLogin={checkLogin}
            />
            {applyAlert && (
              <AskCompleteApplication
                apply={apply}
                setApplyAlert={setApplyAlert}
                applyAlert={applyAlert}
                applyApi={applyApi}
              />
            )}
            {modalSwitch && (
              <CreateAuthModal
                setModalSwitch={setModalSwitch}
                modalSwitch={modalSwitch}
              />
            )}
          </S.UnderTitle>
        )}
      </S.Container>
    </div>
  );
}
