import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
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
import TitleContiner from "./TitleContiner";

import * as S from "./style";
import { useHistory } from "react-router";
import AskCompleteApplication from "../Common/Alert/AskCompleteApplication";
import CompleteApplication from "../Common/Alert/CompleteApplication";
import CreateAuthModal from "../Common/Modal/CreateAuthModal";

ApplyDetailComponent.propTypes = {
  feedId: PropTypes.number.isRequired,
  date: PropTypes.string,
};

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
            alert("삭제된 게시물 입니다.");
            history.goBack();
          }
        });
    },
    [user.isLogin, history]
  );

  const postBookmark = async (postId) => {
    await bookmarkApi(postId).then().catch();
  };

  const clickBookmark = (e) => {
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
    postBookmark(e.target.id);
  };

  const editDetail = (postId, data) => {
    feedEditApi(postId, data).then((res) => getFeedDetail(res.data.data.id));
  };

  const [applyAlert, setApplyAlert] = useState(0);
  const [sliderSwitch, setSliderSwitch] = useState(false);
  const [modalSwitch, setModalSwitch] = useState(false);

  const submit = async (postDoDateId) => {
    if (applyAlert) {
      applyApi(postDoDateId)
        .then((res) => {
          setApplyAlert(2);
        })
        .catch((err) => {
          alert("지원이 실패하였습니다");
          setApplyAlert(0);
          //   신청한 실험일 때, 날짜를 고르지 않았을 때 에러 추가해야함
        });
    }
  };

  const checkLogin = () => {
    if (user.isLogin) {
      setApplyAlert(1);
    } else {
      let value = window.confirm("이용하려면 로그인 먼저 해주세요!");
      if (value) {
        setModalSwitch(true);
      }
    }
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
          category={feedDetailData.category}
          isLogin={user.isLogin}
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
            sliderSwitch={sliderSwitch}
            setSliderSwitch={setSliderSwitch}
          />
          <ApplyController
            apply={apply}
            feedDetailData={feedDetailData}
            checkLogin={checkLogin}
          />
          {applyAlert === 1 && (
            <AskCompleteApplication
              apply={apply}
              setApplyAlert={setApplyAlert}
              submit={submit}
            />
          )}
          {applyAlert === 2 && (
            <CompleteApplication user={user} setApplyAlert={setApplyAlert} />
          )}
          {modalSwitch && <CreateAuthModal setModalSwitch={setModalSwitch} />}
        </div>
      )}
    </S.FeedContainer>
  );
}
