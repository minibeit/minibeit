import React, { useEffect, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { schoolGetApi } from "../../../utils/schoolApi";

import { ReactComponent as PlaceIcon } from "../../../svg/위치.svg";

import * as S from "./style";

export default function SchoolInput({ defaultId, onChange }) {
  const [text, setText] = useState("");
  const [schoolList, setSchoolList] = useState([]);
  const [listView, setListView] = useState(false);

  const getSchool = (text) => {
    schoolGetApi(text).then((res) => {
      setSchoolList(res.data.data);
    });
  };

  const selectItem = (e, a) => {
    document.getElementsByClassName("schoolInput")[0].value = a.name;
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
          <input
            type="text"
            className="schoolInput"
            placeholder="위치"
            defaultValue={
              schoolList.length !== 0
                ? defaultId
                  ? schoolList.find((a) => a.id === defaultId).name
                  : null
                : null
            }
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
