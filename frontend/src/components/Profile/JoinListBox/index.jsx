import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import {
  getCancellistApi,
  getFinishlistApi,
  getJoinlistApi,
} from "../../../utils";

import Presenter from "./presenter";

export default function JoinListBox({ state }) {
  const [joinlist, setJoinlist] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [paging, setPaging] = useState({
    first: "",
    last: "",
  });
  const getJoinlist = useCallback(async () => {
    await getJoinlistApi(page, state)
      .then((res) => {
        setJoinlist(res.data.data.content);
        setPaging({ first: res.data.data.first, last: res.data.data.last });
        setCount(res.data.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [page, state]);
  const getCancellist = useCallback(async () => {
    await getCancellistApi(page)
      .then((res) => {
        setJoinlist(res.data.data.content);
        setPaging({ first: res.data.data.first, last: res.data.data.last });
        setCount(res.data.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [page]);
  const getFinishlist = useCallback(async () => {
    await getFinishlistApi(page)
      .then((res) => {
        setJoinlist(res.data.data.content);
        setPaging({ first: res.data.data.first, last: res.data.data.last });
        setCount(res.data.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [page]);
  const handlepage = async (page) => {
    setPage(page);
  };
  useEffect(() => {
    if (state === "CANCEL") {
      getCancellist();
    } else if (state === "FINISH") {
      getFinishlist();
    } else {
      getJoinlist();
    }
  }, [state, getCancellist, getFinishlist, getJoinlist]);

  return (
    <Presenter
      joinlist={joinlist}
      getCancellist={getCancellist}
      getJoinlist={getJoinlist}
      getFinishlist={getFinishlist}
      state={state}
      page={page}
      count={count}
      handlepage={handlepage}
      paging={paging}
    />
  );
}
