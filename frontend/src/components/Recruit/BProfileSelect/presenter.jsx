import React from "react";
import { ReactComponent as CheckIcon } from "../../../svg/체크.svg";
import BProfileCreateModal from "../../Common/Modal/BProfileCreateModal";
import { ReactComponent as AddIcon } from "../../../svg/플러스.svg";

import * as S from "../style";

export default function Presenter({
  bpList,
  selectBP,
  recruit,
  modalSwitch,
  setModalSwitch,
}) {
  return (
    <S.Page>
      <S.BProfileContainer>
        {bpList.length !== 0 ? (
          <>
            <p>어떤 프로필을 사용하여 참여자를 모집하시겠어요?</p>
            <p>사용하실 비즈니스 프로필을 선택하세요</p>
            <S.BProfileListBox>
              {bpList.map((a) => {
                return (
                  <div key={a.id}>
                    <S.BProfileCheck
                      display={
                        recruit.businessProfile.id === a.id ? "flex" : "none"
                      }
                    >
                      <CheckIcon />
                    </S.BProfileCheck>
                    <S.BProfileImgBox
                      onClick={() => selectBP(a.id, a.name)}
                      id={a.id}
                      className={
                        recruit.businessProfile.id === a.id && "selected"
                      }
                      img={
                        a.avatar ? a.avatar : "/images/기본비즈니스프로필.png"
                      }
                    ></S.BProfileImgBox>
                    <p>{a.name}</p>
                  </div>
                );
              })}
            </S.BProfileListBox>
          </>
        ) : (
          <S.NoneContainer>
            <div>
              <img src="images/달력아이콘.png" alt="달력" />
            </div>
            <p>모집 공고를 올리기 위해서는 비즈니스 프로필이 필요해요</p>
            <p>비즈니스 프로필을 생성할까요?</p>
            <div onClick={() => setModalSwitch(true)}>
              <AddIcon />
            </div>
          </S.NoneContainer>
        )}
      </S.BProfileContainer>
      {modalSwitch && <BProfileCreateModal setModalSwitch={setModalSwitch} />}
    </S.Page>
  );
}
