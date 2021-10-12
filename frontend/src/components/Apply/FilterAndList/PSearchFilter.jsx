import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  search,
  filter,
  setFilter,
  date,
  setDate,
}) {
  const userSchoolId = useRecoilValue(userState).schoolId;
  return (
    <>
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
      <DatePicker
        selected={date["date"]}
        onChange={(date) => {
          const copy = { ...date };
          copy.date = date;
          setDate(copy);
        }}
      />
      <S.SearchBtn onClick={search}>검색</S.SearchBtn>
    </>
  );
}
