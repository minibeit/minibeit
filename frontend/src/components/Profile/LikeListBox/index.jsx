import React, { useEffect, useState } from "react";
import { getLikeListApi } from "../../../utils";
import PLikeListBox from "./PLikeListBox";

export default function LikeListBox() {
  const [page, setPage] = useState(1);
  const [last, setLast] = useState();
  const [likeList, setLikeList] = useState([]);
  const getLikeList = async (page) => {
    await getLikeListApi(page)
      .then((res) => {
        setLikeList(res.data["content"]);
        setLast(res.data.last);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getLikeList(page);
  }, [page]);
  const handlepage = async (msg) => {
    if (msg === "prev") {
      setPage(page - 1);
    } else if (msg === "next") {
      setPage(page + 1);
    }
  };
  return (
    <PLikeListBox
      likeList={likeList}
      handlepage={handlepage}
      page={page}
      last={last}
    />
  );
}
