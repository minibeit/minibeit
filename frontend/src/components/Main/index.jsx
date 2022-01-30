import React, { useEffect, useState } from "react";
import * as S from "./style";
import { Link } from "react-scroll";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import CreateAuthModal from "../Common/Modal/CreateAuthModal";
import { Button } from "../atoms";

import { ReactComponent as ArrowDown } from "../../svg/체크.svg";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MainComponent() {
  const history = useHistory();
  const isLogin = useRecoilValue(userState).isLogin;
  const [modalSwitch, setModalSwitch] = useState(false);

  const goRecruit = () => {
    if (isLogin) {
      history.push("/recruit");
    } else {
      setModalSwitch(true);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1500 });
  });

  return (
    <>
      <S.MainBox>
        <div>
          <S.ButtonContainer>
            <Link to="1" spy={true} smooth={true}>
              <Button
                innerText="참여하기"
                fontSize="1.25rem"
                buttonColor="#0642ff"
                textColor="#ffffff"
              />
            </Link>
            <Link to="2" spy={true} smooth={true}>
              <Button
                innerText="모집하기"
                fontSize="1.25rem"
                buttonColor="#ffffff"
                textColor="#0642ff"
              />
            </Link>
          </S.ButtonContainer>
          <p onClick={() => history.push("/apply")}>일단 둘러볼래요</p>
          <Link to="3" spy={true} smooth={true}>
            <ArrowDown />
          </Link>
        </div>
      </S.MainBox>
      <S.MainBox2 id="1" data-aos="fade-in">
        <div>
          <S.TextBox>
            <div>
              <span>가까운 위치</span>에, <span>남는 시간</span>에 <br />{" "}
              간편하게 지원하기
            </div>
            <Button
              innerText="참여하기"
              fontSize="1.25rem"
              buttonColor="#0642ff"
              textColor="#ffffff"
              onClick={() => history.push("/apply")}
            />
          </S.TextBox>
          <S.ImgBox>
            <img src="/images/main.png" alt="mainImg" />
          </S.ImgBox>
        </div>
      </S.MainBox2>
      <S.MainBox2 id="2" data-aos="fade-in" style={{ backgroundColor: "#fff" }}>
        <div>
          <S.TextBox>
            <div>
              가장 쉽고 빠르게 <br /> <span>원하는 스케줄</span>로 모집하기
            </div>
            <Button
              innerText="모집하기"
              fontSize="1.25rem"
              buttonColor="#0642ff"
              textColor="#ffffff"
              onClick={goRecruit}
            />
          </S.TextBox>
          <S.ImgBox2>
            <img src="/images/main2.png" alt="mainImg" />
          </S.ImgBox2>
        </div>
      </S.MainBox2>
      <S.LastBox id="3" data-aos="fade-in">
        <div>
          <S.TextBox2>
            세상에 없었던
            <br />
            새로운 <span>구인구직</span> 서비스,
            <br />
            미니바이트
          </S.TextBox2>
          <S.ImgBox3>
            <img src="/images/appLogo.png" alt="MainImg" />
          </S.ImgBox3>
        </div>
      </S.LastBox>
      {modalSwitch && <CreateAuthModal setModalSwitch={setModalSwitch} />}
    </>
  );
}
