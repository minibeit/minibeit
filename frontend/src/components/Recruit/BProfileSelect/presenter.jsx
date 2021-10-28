import React from "react";
import { PVImg } from "../../Common";

import * as S from "../style";

export default function Presenter({ bpList, selectBP, recruit }) {
  return (
    <S.Page>
      <S.BProfileContainer>
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
      </S.BProfileContainer>
    </S.Page>
  );
}
