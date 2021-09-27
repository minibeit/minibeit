import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { changeState } from "../../../recoil/changeState";
import { getMakelistApi } from "../../../utils";
import PBMakeListBox from "./PBMakeListBox";

export default function BMakeListBox({ businessId, state, status }) {
  const [makelist, setMakelist] = useState([]);
  const [page, setPage] = useState(1);
  const [change, setChange] = useRecoilState(changeState);
  const [paging, setPaging] = useState({
    first: "",
    last: "",
  });
  const getMakelist = async () => {
    await getMakelistApi(businessId, page, status)
      .then(async (res) => {
        if (res.data.content.length === 0) {
          console.log(res.data.content.length === 0);
          await getMakelistApi(businessId, 1, status).then((res) => {
            setMakelist(res.data.content);
            setPaging({ first: res.data.first, last: res.data.last });
            setChange(0);
          });
        } else {
          setMakelist(res.data.content);
          setPaging({ first: res.data.first, last: res.data.last });
          setChange(0);
        }
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
    getMakelist();
  }, [page]);
  return (
    <PBMakeListBox
      makelist={makelist}
      paging={paging}
      handlepage={handlepage}
      state={state}
      getMakelist={getMakelist}
    />
  );
}
