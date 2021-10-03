import React, { useCallback, useEffect, useState } from "react";
import PFeedInfoContainer from "./PFeedInfoContainer";
import PropTypes from "prop-types";
import { bookmarkApi, feedDetailApi } from "../../../utils/feedApi";
import ApplyConfirmModal from "../../Common/Modal/ApplyConfirmModal";
import { LoadingSpinner } from "../../Common";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { applyState } from "../../../recoil/applyState";
import { userState } from "../../../recoil/userState";

FeedInfoContainer.propTypes = {
  feedId: PropTypes.number.isRequired,
  date: PropTypes.string,
};

export default function FeedInfoContainer({ feedId, date }) {
  const [feedDetailData, setFeedDetailData] = useState();
  const [modalSwitch, setModalSwitch] = useState(false);
  const isLogin = useRecoilValue(userState).isLogin;

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

  useEffect(() => {
    getFeedDetail(feedId);
    resetApply();
  }, [feedId, getFeedDetail, resetApply]);
  return (
    <>
      {feedDetailData ? (
        <PFeedInfoContainer
          feedDetailData={feedDetailData}
          date={date}
          setModalSwitch={setModalSwitch}
          postBookmark={postBookmark}
          isLogin={isLogin}
        />
      ) : (
        <LoadingSpinner />
      )}
      {modalSwitch ? (
        <ApplyConfirmModal setModalSwitch={setModalSwitch} />
      ) : null}
    </>
  );
}
