import React, { useEffect } from "react";
import { useState } from "react";
import { getJoinlistApi } from "../../../utils/profileApi";
import PJoinListBox from "./PJoinListBox";

export default function JoinListBox({ state }) {
  const [joinlist, setJoinlist] = useState([]);
  const [page, setPage] = useState(1);
  const [paging, setPaging] = useState({
    first: "",
    last: "",
  });
  const getJoinlist = async () => {
    await getJoinlistApi(page, state)
      .then((res) => {
        setJoinlist(res.data.content);
        setPaging({ first: res.data.first, last: res.data.last });
      })
      .catch((err) => console.log(err));
  };
  const handlepage = async (order) => {
    if (order === "PREV") {
      setPage(page - 1);
    } else if (order === "NEXT") {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    getJoinlist();
  }, [page]);

  return (
    <PJoinListBox
      joinlist={joinlist}
      getJoinlist={getJoinlist}
      state={state}
      handlepage={handlepage}
      paging={paging}
    />
  );
}
