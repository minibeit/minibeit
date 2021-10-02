import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { reviewListGetApi } from "../../../utils";
import PBReviewBox from "./PBReviewBox";

export default function BReviewBox({ businessId }) {
  const [reviewlist, setReviewlist] = useState([]);
  const [page, setPage] = useState(1);
  const [paging, setPaging] = useState({
    first: "",
    last: "",
  });
  const getReviewlist = useCallback(async () => {
    await reviewListGetApi(businessId, page)
      .then((res) => {
        setReviewlist(res.data.content);
        setPaging({ first: res.data.first, last: res.data.last });
      })
      .catch((err) => console.log(err));
  }, [businessId, page]);
  const handlepage = async (order) => {
    if (order === "PREV") {
      setPage(page - 1);
    } else if (order === "NEXT") {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    getReviewlist();
  }, [getReviewlist]);

  return (
    <PBReviewBox
      reviewlist={reviewlist}
      handlepage={handlepage}
      paging={paging}
    />
  );
}
