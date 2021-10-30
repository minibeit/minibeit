import React from "react";
import PropTypes from "prop-types";

import Presenter from "./presenter";

BProfileSelect.propTypes = {
  bplist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ),
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

export default function BProfileSelect({
  movePage,
  bpList,
  recruit,
  setRecruit,
}) {
  const selectBP = (e) => {
    var id = parseInt(e.target.parentNode.id);
    var name = e.target.parentNode.nextSibling.textContent;
    const copy = { ...recruit };
    copy.businessProfile = {
      id: id,
      name: name,
    };
    setRecruit(copy);
    movePage(1);
  };

  return <Presenter bpList={bpList} selectBP={selectBP} recruit={recruit} />;
}
