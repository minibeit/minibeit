import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CheckIcon } from "../../../svg/체크.svg";

import * as S from "../style";

export default function Presenter({ bpList, selectBP, recruit }) {
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
                        a.avatar ? a.avatar : "/images/기본비즈니스프로필.jpeg"
                      }
                    ></S.BProfileImgBox>
                    <p>{a.name}</p>
                  </div>
                );
              })}
            </S.BProfileListBox>
          </>
        ) : (
          <>
            <p>비즈니즈 프로필이 존재하지 않습니다</p>
            <Link to={"/profile?business"}>
              <p>비즈니스 프로필 만들기</p>
            </Link>
          </>
        )}
      </S.BProfileContainer>
    </S.Page>
  );
}
