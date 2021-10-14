import React from "react";
import PropTypes from "prop-types";
import SchoolSelect from "../../Common/SchoolSelect";

import * as S from "../style";

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
    startDate: PropTypes.object,
    endDate: PropTypes.object,
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

export default function PSchoolSelect({ movePage, recruit, setRecruit }) {
  const selectSchool = (e) => {
    if (e) {
      const copy = { ...recruit };
      copy.school.id = e.value;
      copy.school.name = e.label;
      setRecruit(copy);
    } else {
      const copy = { ...recruit };
      copy.school.id = null;
      copy.school.name = null;
      setRecruit(copy);
    }
  };
  return (
    <S.SchoolSelectPage>
      <div>
        <p>{recruit.businessProfile.name}님!</p>
        <p>원하는 위치 근처의 학교를 선택하세요</p>
        <S.SchoolSearchBox>
          <p>학교명</p>
          <SchoolSelect onChange={selectSchool} />
          <button
            disabled={recruit.school.id ? false : true}
            onClick={() => {
              movePage(2);
            }}
          >
            적용
          </button>
        </S.SchoolSearchBox>
      </div>
    </S.SchoolSelectPage>
  );
}
