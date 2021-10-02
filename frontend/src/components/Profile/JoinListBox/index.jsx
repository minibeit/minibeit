import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import {
  getCancellistApi,
  getFinishlistApi,
  getJoinlistApi,
} from "../../../utils";
import PJoinListBox from "./PJoinListBox";

export default function JoinListBox({ state }) {
  const [joinlist, setJoinlist] = useState([]);
  const [page, setPage] = useState(1);
  const [paging, setPaging] = useState({
    first: "",
    last: "",
  });
  const getJoinlist = useCallback(async () => {
    await getJoinlistApi(page, state)
      .then((res) => {
        setJoinlist(res.data.content);
        setPaging({ first: res.data.first, last: res.data.last });
      })
      .catch((err) => console.log(err));
  }, [page, state]);
  const getCancellist = useCallback(async () => {
    await getCancellistApi(page)
      .then((res) => {
        setJoinlist(res.data.content);
        setPaging({ first: res.data.first, last: res.data.last });
      })
      .catch((err) => console.log(err));
  }, [page]);
  const getFinishlist = useCallback(async () => {
    await getFinishlistApi(page)
      .then((res) => {
        setJoinlist(res.data.content);
        setPaging({ first: res.data.first, last: res.data.last });
      })
      .catch((err) => console.log(err));
  }, [page]);
  const handlepage = async (order) => {
    if (order === "PREV") {
      setPage(page - 1);
    } else if (order === "NEXT") {
      setPage(page + 1);
    }
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
    <PJoinListBox
      joinlist={joinlist}
      getCancellist={getCancellist}
      getJoinlist={getJoinlist}
      getFinishlist={getFinishlist}
      state={state}
      handlepage={handlepage}
      paging={paging}
    />
  );
}
