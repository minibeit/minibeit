import React, { useEffect, useState } from "react";
import PFeedInfoContainer from "./PFeedInfoContainer";
import PropTypes from "prop-types";
import { feedDetailApi } from "../../../utils/feedApi";
import ApplyConfirmModal from "../../Common/Modal/ApplyConfirmModal";
import { LoadingSpinner } from "../../Common";
import { useResetRecoilState } from "recoil";
import { applyState } from "../../../recoil/applyState";

FeedInfoContainer.propTypes = {
  feedId: PropTypes.number.isRequired,
  date: PropTypes.string,
};

export default function FeedInfoContainer({ feedId, date }) {
  const [feedDetailData, setFeedDetailData] = useState();
  const [modalSwitch, setModalSwitch] = useState(false);

  const resetApply = useResetRecoilState(applyState);

  const getFeedDetail = async (feedId) => {
    await feedDetailApi(feedId)
      .then((res) => setFeedDetailData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFeedDetail(feedId);
    resetApply();
  }, [feedId, resetApply]);
  return (
    <>
      {feedDetailData ? (
        <PFeedInfoContainer
          feedDetailData={feedDetailData}
          date={date}
          setModalSwitch={setModalSwitch}
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
