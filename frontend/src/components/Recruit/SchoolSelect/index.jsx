import React, { useState } from "react";
import PropTypes from "prop-types";
import Presenter from "./presenter";

SchoolSelect.propTypes = {
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

export default function SchoolSelect({ movePage, recruit, setRecruit }) {
  const [school, setSchool] = useState();
  const selectSchool = () => {
    if (school) {
      const copy = { ...recruit };
      copy.school.id = school.value;
      copy.school.name = school.label;
      setRecruit(copy);
    } else {
      const copy = { ...recruit };
      copy.school.id = null;
      copy.school.name = null;
      setRecruit(copy);
    }
  };

  return (
    <Presenter
      recruit={recruit}
      school={school}
      setSchool={setSchool}
      selectSchool={selectSchool}
      movePage={movePage}
    />
  );
}
