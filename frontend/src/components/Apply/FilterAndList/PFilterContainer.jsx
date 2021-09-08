import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filterState } from "../../../recoil/filterState";
import { userState } from "../../../recoil/userState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

export default function PFilterContainer({
  setModalSwitch,
  schoolList,
  getFeedList,
}) {
  const [filter, setFilter] = useRecoilState(filterState);
  const openModal = () => {
    setModalSwitch(true);
  };
  const search = () => {
    if (filter.schoolId) {
      getFeedList(filter.schoolId, filter.date);
    } else if (user.schoolId) {
      getFeedList(user.schoolId, filter.date);
    } else {
      alert("학교를 선택해주세요");
    }
  };
  const changePayment = (e) => {
    const filter_cp = { ...filter };
    filter_cp["payment"] = e.target.value;
    setFilter(filter_cp);
  };
  const user = useRecoilValue(userState);
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
        <DatePicker
          selected={filter["date"]}
          onChange={(date) => {
            const filter_cp = { ...filter };
            filter_cp["date"] = date;
            setFilter(filter_cp);
          }}
        />
        <S.FilterSubmitBtn onClick={search}>검색</S.FilterSubmitBtn>
        <S.PaymentSelect
          defaultValue={filter["payment"]}
          onChange={changePayment}
        >
          <option value="ALL">전체</option>
          <option value="CACHE">현금</option>
          <option value="GOODS">물품</option>
        </S.PaymentSelect>
      </S.FilterBox>
    </>
  );
}
