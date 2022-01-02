import React, { useState } from "react";
import Conditions from "../Alert/Conditions";
import PersonalInformation from "../Alert/PersonalInformation";
import { ReactComponent as BeitIcon } from "../../../svg/beitIcon.svg";

import * as S from "./style";

export default function Footer() {
  const [personalInfoAlert, setPersonalInfoAlert] = useState(false);
  const [conditionsAlert, setConditionsAlert] = useState(false);
  return (
    <S.FooterContainer>
      <div>
        <S.FooterHeader>
          <S.FooterIcon>
            <BeitIcon /> Minibeit
          </S.FooterIcon>
          <p>기업소개</p>
          <p onClick={() => setConditionsAlert(true)}>이용약관</p>
          <p onClick={() => setPersonalInfoAlert(true)}>개인정보 처리 방침</p>
          <p>고객센터</p>
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
      {conditionsAlert && (
        <Conditions setConditionsAlert={setConditionsAlert} />
      )}
      {personalInfoAlert && (
        <PersonalInformation setPersonalInfoAlert={setPersonalInfoAlert} />
      )}
    </S.FooterContainer>
  );
}
