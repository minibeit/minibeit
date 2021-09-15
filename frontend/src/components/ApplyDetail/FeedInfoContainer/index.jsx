import React, { useEffect, useState } from "react";
import PFeedInfoContainer from "./PFeedInfoContainer";
import PropTypes from "prop-types";
import { applyApi, feedDetailApi } from "../../../utils/feedApi";
import { LoadingSpinner } from "../../Common";

FeedInfoContainer.propTypes = {
  feedId: PropTypes.number.isRequired,
  date: PropTypes.string,
};

export default function FeedInfoContainer({ feedId, date }) {
  const [feedDetailData, setFeedDetailData] = useState();

  const getFeedDetail = async (feedId) => {
    await feedDetailApi(feedId)
      .then((res) => setFeedDetailData(res.data))
      .catch((err) => console.log(err));
  };

  const applyForPost = async (feedId, postDoDateId) => {
    applyApi(feedId, postDoDateId);
  };

  useEffect(() => {
    getFeedDetail(feedId);
  }, []);
  return (
    <>
      {feedDetailData ? (
        <PFeedInfoContainer
          applyForPost={applyForPost}
          feedDetailData={feedDetailData}
          date={date}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
