import React, { useEffect } from "react";
import { useState } from "react";
import { getJoinlistApi } from "../../../utils/profileApi";
import PJoinListBox from "./PJoinListBox";

export default function JoinListBox() {
  const [joinlist, setJoinlist] = useState([]);
  const getJoinlist = async () => {
    await getJoinlistApi(1)
      .then((res) => setJoinlist(res.data.content))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getJoinlist();
  }, []);

  return <PJoinListBox joinlist={joinlist} getJoinlist={getJoinlist} />;
}
