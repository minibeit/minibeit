import React, { useEffect } from "react";
import { useState } from "react";
import { reviewListGetApi } from "../../../utils";
import PBReviewBox from "./PBReviewBox";

export default function BReviewBox({ businessId }) {
  const [reviewlist, setReviewlist] = useState([]);
  const getReviewlist = async () => {
    await reviewListGetApi(businessId, 1)
      .then((res) => setReviewlist(res.data.content))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getReviewlist();
  }, []);

  return <PBReviewBox reviewlist={reviewlist} />;
}
