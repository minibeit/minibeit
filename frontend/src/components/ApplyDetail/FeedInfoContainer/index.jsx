import React from "react";
import PFeedInfoContainer from "./PFeedInfoContainer";
import PropTypes from "prop-types";

FeedInfoContainer.propTypes = {
  feedId: PropTypes.number.isRequired,
};

export default function FeedInfoContainer({ feedId }) {
  return (
    <>
      <PFeedInfoContainer />
    </>
  );
}
