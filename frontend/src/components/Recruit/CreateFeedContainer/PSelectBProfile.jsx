import React from "react";
import PropTypes from "prop-types";

PSelectBProfile.propTypes = {
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

export default function PSelectBProfile({ bpList, recruit, setRecruit }) {
  const selectBP = (e) => {
    const copy = { ...recruit };
    copy.businessProfile = {
      id: parseInt(e.target.id),
      name: e.target.textContent,
    };
    setRecruit(copy);
  };
  return (
    <>
      <h2>모집하기에서</h2>
      <h2>어떤 프로필을 사용할 것인가요?</h2>
      <p>사용하실 비즈니스 프로필을 선택하세요</p>
      {bpList.map((a) => {
        return (
          <button
            onClick={selectBP}
            id={a.id}
            key={a.id}
            disabled={recruit.businessProfile.id === a.id ? true : false}
          >
            {a.name}
          </button>
        );
      })}
      {recruit.businessProfile.id ? <button>확인</button> : null}
    </>
  );
}
