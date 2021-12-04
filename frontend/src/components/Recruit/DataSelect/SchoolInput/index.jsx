import React, { useEffect, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { schoolGetApi } from "../../../../utils/schoolApi";

import { ReactComponent as PlaceIcon } from "../../../../svg/위치.svg";

import * as S from "./style";

export default function SchoolInput({ onChange }) {
  const [text, setText] = useState("");
  const [selectSchool, setSelectSchool] = useState();
  const [schoolList, setSchoolList] = useState([]);
  const [listView, setListView] = useState(false);

  const getSchool = (text) => {
    schoolGetApi(text).then((res) => {
      setSchoolList(res.data.data);
    });
  };

  const selectItem = (e, a) => {
    document.getElementsByClassName("schoolInput")[0].value = a.name;
    setSelectSchool(a);
    onChange(a);
    setListView(false);
  };

  useEffect(() => {
    getSchool(text);
  }, [text]);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setListView(false);
      }}
    >
      <div>
        <S.SearchInput>
          <PlaceIcon />
          <input
            type="text"
            className="schoolInput"
            placeholder="어느 학교에서 모집하세요?"
            defaultValue={selectSchool && selectSchool.name}
            onClick={() => setListView(true)}
            onChange={(e) => {
              setListView(true);
              setText(e.target.value);
            }}
          />
        </S.SearchInput>
        {listView && (
          <S.SchoolListWrapper>
            {schoolList.length === 0 ? (
              <S.SchoolItem>
                <div>
                  <PlaceIcon />
                </div>
                <p>검색결과 없음</p>
              </S.SchoolItem>
            ) : (
              schoolList.map((a) => {
                return (
                  <S.SchoolItem key={a.id} onClick={(e) => selectItem(e, a)}>
                    <div>
                      <PlaceIcon />
                    </div>
                    <p>{a.name}</p>
                  </S.SchoolItem>
                );
              })
            )}
          </S.SchoolListWrapper>
        )}
      </div>
    </ClickAwayListener>
  );
}
