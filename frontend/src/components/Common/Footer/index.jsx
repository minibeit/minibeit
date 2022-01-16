import React from "react";
import { ReactComponent as BeitIcon } from "../../../svg/beitIcon.svg";

import * as S from "./style";

export default function Footer() {
  return (
    <S.FooterContainer>
      <div>
        <S.FooterHeader>
          <S.FooterIcon>
            <BeitIcon /> Minibeit
          </S.FooterIcon>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://minibeit.oopy.io/cb915f58-18aa-4e32-a99c-dbf720acd3d5"
          >
            이용약관
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://minibeit.oopy.io/d437485d-6f56-40f1-a1ea-46168ce8a958"
          >
            개인정보 처리 방침
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://minibeit.oopy.io/inconvenience"
          >
            서비스개선
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://minibeit.oopy.io/8aa99516-2ab6-4698-b574-65276dc217b3"
          >
            인재채용
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://minibeit.oopy.io/4fe83919-60e4-4886-90c8-c41d2b0403dd"
          >
            Q&amp;A
          </a>
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
            href="https://www.instagram.com/_minibeit_/?hl=ko"
          >
            <img src="/images/insta.png" alt="instaIcon" />
          </a>
        </S.FooterHeader>
        <S.FooterFooter>
          <p>미니바이트 | 서울시 동대문구 제기로6길 37-2 103호</p>
          <p>Produced by CLMOI - Korea University StartUp Team</p>
          <p>ⓒminibeit</p>
        </S.FooterFooter>
      </div>
    </S.FooterContainer>
  );
}
