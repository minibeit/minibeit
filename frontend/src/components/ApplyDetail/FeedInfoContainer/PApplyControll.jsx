import React from "react";
import PropTypes from "prop-types";

import * as S from "../style";

PApplyControll.propTypes = {
  apply: PropTypes.shape({
    postId: PropTypes.number,
    doDate: PropTypes.string.isRequired,
    doTime: PropTypes.string.isRequired,
    postDoDateId: PropTypes.number,
  }),
  feedDetailData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    doTime: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
    cache: PropTypes.number,
    goods: PropTypes.string,
    place: PropTypes.string.isRequired,
    schoolName: PropTypes.string.isRequired,
    contact: PropTypes.string,
    files: PropTypes.array,
    businessProfileInfo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      contact: PropTypes.string.isRequired,
      introduce: PropTypes.string,
    }),
  }),
  setModalSwitch: PropTypes.func.isRequired,
};

export default function PApplyControll({
  apply,
  feedDetailData,
  setModalSwitch,
}) {
  return (
    <S.ApplyRemote>
      <p>선택 일정</p>
      <S.ApplyData key={apply}>
        <p>날짜: {apply.doDate}</p>
        <p>시간: {apply.doTime}</p>
      </S.ApplyData>
      <div>
        <button onClick={() => setModalSwitch(true)}>신청하기</button>
        <button>공유하기</button>
      </div>
    </S.ApplyRemote>
  );
}
