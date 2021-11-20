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

export default function PApplyControll({ apply, feedDetailData, setApplyAlert}) {
  return (
    <S.RemoteBox>
      <S.Controller>
        <p>선택한 일정</p>
        <S.ApplyData key={apply}>
          <div>
            <span>날짜 </span> {apply.doDate}
          </div>
          <div>
            <span>시간 </span> {apply.doTime}
          </div>
        </S.ApplyData>
        <S.ApplyBtnGroup>
          <button
            disabled={apply.postDoDateId ? false : true}
            onClick={() => setApplyAlert(1)}>
            신청하기
          </button>
          <button>공유하기</button>
        </S.ApplyBtnGroup>
      </S.Controller>
    </S.RemoteBox>
  );
}
