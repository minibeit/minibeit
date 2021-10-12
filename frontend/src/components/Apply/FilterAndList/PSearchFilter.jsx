import React from "react";
import DatePicker from "react-datepicker";
import "../date-picker.css";
import PropTypes, { number } from "prop-types";

import SchoolSelect from "../../Common/SchoolSelect";

import * as S from "../style";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";

PSearchFilter.propTypes = {
  search: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    schoolId: PropTypes.number,
    schoolName: PropTypes.string,
    paymentType: PropTypes.string,
    minPay: PropTypes.string,
    doTime: PropTypes.string,
    startAndEnd: PropTypes.arrayOf(number),
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }),
  setFilter: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired,
};

export default function PSearchFilter({
  feedList,
  search,
  filter,
  setFilter,
  date,
  setDate,
}) {
  const userSchoolId = useRecoilValue(userState).schoolId;

  return (
    <S.SearchBox fullScreen={feedList ? false : true}>
      <p>참여하기</p>
      <p>내 일정에 맞는 리서치를 검색하시고 보상을 획득하세요!</p>
      <div>
        <S.SchoolSelect>
          <SchoolSelect
            defaultValue={userSchoolId}
            onChange={(e) => {
              if (e) {
                const copy = { ...filter };
                copy.schoolId = e.value;
                copy.schoolName = e.label;
                setFilter(copy);
              }
            }}
          />
        </S.SchoolSelect>
        <S.DateSelect>
          <DatePicker
            selected={date["date"]}
            onChange={(date) => {
              const copy = { ...date };
              copy.date = date;
              setDate(copy);
            }}
            dateFormat="yyyy.MM.dd"
            className="datePickerInput"
          />
        </S.DateSelect>
        <S.SearchBtn onClick={search}>검색하기</S.SearchBtn>
      </div>
    </S.SearchBox>
  );
}
