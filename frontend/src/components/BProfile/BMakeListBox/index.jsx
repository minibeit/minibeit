import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { changeState } from "../../../recoil/changeState";
import { getMakelistApi } from "../../../utils";
import PBMakeListBox from "./PBMakeListBox";

export default function BMakeListBox({ businessId, state, status }) {
  const [makelist, setMakelist] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [, setChange] = useRecoilState(changeState);
  const [paging, setPaging] = useState({
    first: "",
    last: "",
  });
  const getMakelist = useCallback(async () => {
    await getMakelistApi(businessId, page, status)
      .then(async (res) => {
        if (res.data.content.length === 0) {
          await getMakelistApi(businessId, 1, status).then((res) => {
            setMakelist(res.data.content);
            setPaging({ first: res.data.first, last: res.data.last });
            setCount(res.data.totalElements);
            setChange(0);
          });
        } else {
          setMakelist(res.data.content);
          setPaging({ first: res.data.first, last: res.data.last });
          setCount(res.data.totalElements);
          setChange(0);
        }
      })
      .catch((err) => console.log(err));
  }, [businessId, page, setChange, status]);
  const handlepage = async (page) => {
    setPage(page);
  };
  useEffect(() => {
    getMakelist();
  }, [getMakelist]);
  return (
    <PBMakeListBox
      makelist={makelist}
      paging={paging}
      page={page}
      count={count}
      handlepage={handlepage}
      state={state}
      getMakelist={getMakelist}
    />
  );
}
