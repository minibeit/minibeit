import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { reviewListGetApi } from "../../../utils";
import Presenter from "./presenter";

export default function BProfileReviewList({ businessId }) {
  const [reviewlist, setReviewlist] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [paging, setPaging] = useState({
    first: "",
    last: "",
  });
  const getReviewlist = useCallback(async () => {
    await reviewListGetApi(businessId, page, 10)
      .then((res) => {
        setReviewlist(res.data.data.content);
        setCount(res.data.data.totalElements);
        setPaging({ first: res.data.first, last: res.data.data.last });
      })
      .catch((err) => console.log(err));
  }, [businessId, page]);
  const handlepage = async (page) => {
    setPage(page);
  };
  useEffect(() => {
    getReviewlist();
  }, [getReviewlist]);

  return (
    <Presenter
      page={page}
      count={count}
      reviewlist={reviewlist}
      handlepage={handlepage}
      paging={paging}
    />
  );
}
