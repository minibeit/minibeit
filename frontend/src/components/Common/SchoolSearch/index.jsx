import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filterState } from "../../../recoil/filterState";
import { schoolGetApi } from "../../../utils/schoolApi";

import * as S from "./style";

export default function SchoolSearch() {
  const [filter, setFilter] = useRecoilState(filterState);
  const [schoolItem, setSchoolItem] = useState();
  const [listSwitch, setListSwitch] = useState(false);
  const searchSchool = (e) => {
    if (e === undefined) {
      schoolGetApi("")
        .then((res) => {
          setSchoolItem(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      schoolGetApi(e.target.value)
        .then((res) => {
          setSchoolItem(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onFocus = () => {
    setListSwitch(true);
  };
  const selectSchool = async (e) => {
    const filter_cp = { ...filter };
    filter_cp["schoolId"] = parseInt(e.target.id);
    filter_cp["schoolName"] = e.target.textContent;
    e.target.parentNode.previousSibling.value = e.target.textContent;
    setListSwitch(false);
  };
  useEffect(() => {
    searchSchool();
  }, []);
  return (
    <S.SchoolSearchBox>
      <S.SearchInput onFocus={onFocus} onChange={searchSchool}></S.SearchInput>
      {listSwitch ? (
        <S.SchoolList>
          {schoolItem &&
            schoolItem.map((a) => {
              return (
                <S.SchoolItem key={a.id} id={a.id} onClick={selectSchool}>
                  {a.name}
                </S.SchoolItem>
              );
            })}
        </S.SchoolList>
      ) : null}
    </S.SchoolSearchBox>
  );
}
