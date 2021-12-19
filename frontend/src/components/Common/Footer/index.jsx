import React, { useState } from "react";
import * as S from "./style";
import Conditions from "../Alert/Conditions";
import PersonalInformation from "../Alert/PersonalInformation";
import { ReactComponent as BeitIcon } from "../../../svg/beitIcon.svg";

export default function Footer() {
  const [alert, setConditionsAlert] = useState(0);
  return (
    <S.FooterContainer>
      {alert === 1 && <Conditions setConditionsAlert={setConditionsAlert} />}
      {alert === 2 && (
        <PersonalInformation setConditionsAlert={setConditionsAlert} />
      )}
      <div>
        <div>
          <div>
            <BeitIcon /> Minibeit
          </div>
          <div>기업소개</div>
          <div onClick={() => setConditionsAlert(1)}>이용약관</div>
          <div onClick={() => setConditionsAlert(2)}>개인정보 처리방침</div>
          <div>고객센터</div>
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
              href="https://www.instagram.com/_minibeit_/?hl=ko"
            >
              <img src="/images/insta.png" alt="instaIcon" />
            </a>
          </div>
        </div>
        <div>
          <p>미니바이트 | 서울시 동대문구 제기로6길 37-2 103호</p>
          <p>Produced by CLMOI - Korea University StartUp Team</p>
          <p>ⓒminibeit</p>
        </div>
      </div>
    </S.FooterContainer>
  );
}
