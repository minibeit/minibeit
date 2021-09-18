import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filterState } from "../../../recoil/filterState";
import { schoolGetApi } from "../../../utils/schoolApi";
import PropTypes from "prop-types";

import * as S from "./style";
import { signupState } from "../../../recoil/signupState";
import { userState } from "../../../recoil/userState";

SchoolSearch.propTypes = {
  use: PropTypes.string.isRequired,
};

export default function SchoolSearch({ use }) {
  const [filter, setFilter] = useRecoilState(filterState);
  const user = useRecoilValue(userState);
  const [signup, setSignup] = useRecoilState(signupState);
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
    switch (use) {
      case "ApplyList":
        const filter_cp = { ...filter };
        filter_cp["schoolId"] = parseInt(e.target.id);
        filter_cp["schoolName"] = e.target.textContent;
        setFilter(filter_cp);
        break;
      case "Signup":
        const signupRC = { ...signup };
        signupRC["schoolId"] = parseInt(e.target.id);
        signupRC["schoolName"] = e.target.textContent;
        setSignup(signupRC);
        break;
      default:
        alert("다시 시도해주세요");
    }
    e.target.parentNode.previousSibling.value = e.target.textContent;
    setListSwitch(false);
  };
  useEffect(() => {
    searchSchool();
  }, []);
  return (
    <S.SchoolSearchBox>
      <S.SearchInput
        defaultValue={
          user.schoolId && schoolItem
            ? schoolItem.find((ele) => ele.id === user.schoolId).name
            : null
        }
        onFocus={onFocus}
        onChange={searchSchool}
      ></S.SearchInput>
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
