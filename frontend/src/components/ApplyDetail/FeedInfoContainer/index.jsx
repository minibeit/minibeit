import React, { useEffect, useState } from "react";
import PFeedInfoContainer from "./PFeedInfoContainer";
import PropTypes from "prop-types";
import { feedDetailApi } from "../../../utils/feedApi";
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
  useEffect(() => {
    getFeedDetail(feedId);
  }, []);
  return (
    <>
      {feedDetailData ? (
        <PFeedInfoContainer feedDetailData={feedDetailData} date={date} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
