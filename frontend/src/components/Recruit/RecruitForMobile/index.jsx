import React from "react";
import * as S from "./style";

export default function RecruitForMobile() {
  return (
    <S.Container>
      <div>
        <S.ImgBox>
          <img src="/images/달력아이콘.png" alt="img" />
        </S.ImgBox>
        <S.BoxForImgBox>
          <S.ImgBox>
            <img src="/images/돈다발아이콘.png" alt="img" />
          </S.ImgBox>
          <S.ImgBox>
            <img src="/images/하트아이콘.png" alt="img" />
          </S.ImgBox>
        </S.BoxForImgBox>
        <S.BoxForImgBox style={{ gap: "4rem", marginTop: "9rem" }}>
          <S.SImgBox>
            <img src="/images/웃는얼굴아이콘.png" alt="img" />
          </S.SImgBox>
          <S.SImgBox>
            <img src="/images/시간아이콘.png" alt="img" />
          </S.SImgBox>
        </S.BoxForImgBox>
        <S.ImgBox>
          <img src="/images/mainLogo2.png" alt="img" />
        </S.ImgBox>
      </div>
      <S.Txt>
        모집하기는 모바일 환경에서
        <br /> 진행해주세요!
      </S.Txt>
    </S.Container>
  );
}
