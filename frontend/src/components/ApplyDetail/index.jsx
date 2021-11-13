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
    feedEditApi(postId, data).then((res) => getFeedDetail(res.data.data.id));
  };

  const [askApplyAlert,setAskApplyAlert] = useState(false);
  const [endApplyAlert,setEndApplyAlert] = useState(false);
  const applyAlert =() => {
    setAskApplyAlert(true);
  }
  const submit = async (postDoDateId) => {
    if (askApplyAlert) {
      applyApi(postDoDateId)
        .then((res) => {
          setEndApplyAlert(true);          
        })
        .catch((err) => {
          alert("지원이 실패하였습니다");
          //   신청한 실험일 때, 날짜를 고르지 않았을 때 에러 추가해야함
        });
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
          />
          <ApplyController
            apply={apply}
            submit={submit}
            feedDetailData={feedDetailData}
            applyAlert={applyAlert}
          />
          {askApplyAlert ? <AskCompleteApplication apply={apply} setAskApplyAlert={setAskApplyAlert} submit={submit}/>:null}
          {endApplyAlert ? <CompleteApplication user={user}/>:null}
        </div>
      )}
    </S.FeedContainer>
  );
}
