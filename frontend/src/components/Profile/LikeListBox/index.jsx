import React, { useEffect, useState } from "react";
import { getLikeListApi } from "../../../utils";

import Presenter from "./presenter";

export default function LikeListBox() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [likeList, setLikeList] = useState([]);
  const getLikeList = async (page) => {
    await getLikeListApi(page)
      .then((res) => {
        setLikeList(res.data.data.data["content"]);
        setCount(res.data.data.data.totalElements);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getLikeList(page);
  }, [page]);
  const handlepage = async (page) => {
    setPage(page);
  };
  return (
    <Presenter
      likeList={likeList}
      handlepage={handlepage}
      page={page}
      count={count}
      getLikeList={getLikeList}
    />
  );
}
