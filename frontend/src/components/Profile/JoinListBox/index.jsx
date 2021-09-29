import React, { useEffect } from "react";
import { useState } from "react";
import { getCancellistApi, getJoinlistApi } from "../../../utils";
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
  const getCancellist = async () => {
    await getCancellistApi(page)
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
    if (state === "CANCEL") {
      getCancellist();
    } else {
      getJoinlist();
    }
  }, [page, state]);

  return (
    <PJoinListBox
      joinlist={joinlist}
      getCancellist={getCancellist}
      getJoinlist={getJoinlist}
      state={state}
      handlepage={handlepage}
      paging={paging}
    />
  );
}
