import React from "react";
import PropTypes from "prop-types";
import { SchoolSearch } from "../../Common";

PSchoolSelect.propTypes = {
  recruit: PropTypes.shape({
    businessProfile: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    school: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    headCount: PropTypes.number,
    doTime: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    timeList: PropTypes.arrayOf(PropTypes.string),
    dateList: PropTypes.arrayOf(PropTypes.string),
    exceptDateList: PropTypes.arrayOf(PropTypes.string),
    doDateList: PropTypes.arrayOf(
      PropTypes.shape({
        dodate: PropTypes.string,
      })
    ),
    category: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    condition: PropTypes.bool,
    conditionDetail: PropTypes.array,
    payment: PropTypes.string,
    pay: PropTypes.string,
    payMemo: PropTypes.string,
    images: PropTypes.array,
    address: PropTypes.string,
    contact: PropTypes.string,
  }),
  setRecruit: PropTypes.func.isRequired,
};

export default function PSchoolSelect({ recruit, setRecruit }) {
  return (
    <>
      <h2>{recruit.businessProfile.name}님!</h2>
      <h2>원하는 위치 근처의 학교를 선택하세요 </h2>
      <SchoolSearch use="recruit" recruit={recruit} setRecruit={setRecruit} />
      {recruit.school.id ? <button>확인</button> : null}
    </>
  );
}
