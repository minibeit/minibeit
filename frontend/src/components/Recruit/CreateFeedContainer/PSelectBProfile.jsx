import React from "react";
import PropTypes from "prop-types";
import { PVImg } from "../../Common";

import * as S from "../style";

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

export default function PSelectBProfile({
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

  return (
    <S.BProfilePage>
      <div>
        <p>모집하기에서</p>
        <p>어떤 프로필을 사용할 것인가요?</p>
        <p>사용하실 비즈니스 프로필을 선택하세요</p>
        <S.BProfileListBox>
          {bpList.map((a) => {
            return (
              <div key={a.id}>
                <S.BProfileImgBox
                  onClick={selectBP}
                  id={a.id}
                  className={recruit.businessProfile.id === a.id && "selected"}
                >
                  <PVImg
                    img={a.avatar ? a.avatar : "/기본비즈니스프로필.jpeg"}
                  />
                </S.BProfileImgBox>
                <p>{a.name}</p>
              </div>
            );
          })}
        </S.BProfileListBox>
      </div>
    </S.BProfilePage>
  );
}
