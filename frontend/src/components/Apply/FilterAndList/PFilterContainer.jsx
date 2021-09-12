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
  getFeedList: PropTypes.func.isRequired,
};

export default function PFilterContainer({ setModalSwitch, getFeedList }) {
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
        <S.ViewSelect>{filter["schoolName"]}</S.ViewSelect>
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
