import React from "react";
import * as S from "./style";

export default function Footer() {
  return (
    <S.FooterContainer>
      <div>
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/%EB%AF%B8%EB%8B%88%EB%B0%94%EC%9D%B4%ED%8A%B8-minibeit-101946832298611"
          >
            <img src="/images/facebook.png" alt="facebookIcon" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="instagram.com/_minibeit_/?hl=ko"
          >
            <img src="/images/insta.png" alt="instaIcon" />
          </a>
        </div>
        <div>
          <p>미니바이트 | 서울시 동대문구 제기로6길 37-2 103호</p>
          <p>Produced by CLMOI - Korea University StartUp Team</p>
        </div>
        <p>ⓒminibeit</p>
      </div>
    </S.FooterContainer>
  );
}
