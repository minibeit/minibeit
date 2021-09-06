import React from "react";
import { useRecoilValue } from "recoil";
import { filterState } from "../../../recoil/filterState";
import { userState } from "../../../recoil/userState";
import PropTypes from "prop-types";

import * as S from "../style";

PFilterContainer.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
  schoolList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default function PFilterContainer({ setModalSwitch, schoolList }) {
  const openModal = () => {
    setModalSwitch(true);
  };
  const user = useRecoilValue(userState);
  const filter = useRecoilValue(filterState);
  return (
    <>
      <S.FilterBox>
        <S.ViewSelect>
          {schoolList ? (
            filter["schoolId"] ? (
              schoolList.find((ele) => ele.id === filter["schoolId"]).name
            ) : user["schoolId"] ? (
              schoolList.find((ele) => ele.id === user["schoolId"]).name
            ) : (
              <p>학교를 선택하세요</p>
            )
          ) : (
            <p>학교를 선택하세요</p>
          )}
        </S.ViewSelect>
        <S.SelectBtn onClick={openModal}>학교선택</S.SelectBtn>
        <S.ViewSelect>0000-00-00</S.ViewSelect>
        <S.SelectBtn>시작날짜 선택</S.SelectBtn>
        <S.ViewSelect>0000-00-00</S.ViewSelect>
        <S.SelectBtn>마감날짜 선택</S.SelectBtn>
        <S.FilterSubmitBtn>검색</S.FilterSubmitBtn>
      </S.FilterBox>
    </>
  );
}
