import React, { useEffect, useState } from "react";
import * as S from "./style";
import { Link } from "react-scroll";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import CreateAuthModal from "../Common/Modal/CreateAuthModal";

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
    <S.BackGround>
      <S.MainBox>
        <div>
          <div>
            <Link to="1" spy={true} smooth={true}>
              <S.WhiteButton>참여하기</S.WhiteButton>
            </Link>
            <Link to="2" spy={true} smooth={true}>
              <S.BlueButton>모집하기</S.BlueButton>
            </Link>
          </div>
          <p onClick={() => history.push("/apply")}>일단 둘러볼래요</p>
          <Link to="3" spy={true} smooth={true}>
            <div>
              <ArrowDown />
            </div>
          </Link>
        </div>
      </S.MainBox>
      <S.MainBox2 id="1" data-aos="fade-in">
        <div>
          <div>
            <div>
              <span>가까운 위치</span>에, <span>남는 시간</span>에 <br />{" "}
              간편하게 지원하기
            </div>
            <S.BlueButton onClick={() => history.push("/apply")}>
              참여하기
            </S.BlueButton>
          </div>
          <div>
            <img src="/images/main.png" alt="mainImg" />
          </div>
        </div>
      </S.MainBox2>
      <S.MainBox3 id="2" data-aos="fade-in">
        <div>
          <div>
            <div>
              가장 쉽고 빠르게 <br /> <span>원하는 스케줄</span>로 모집하기
            </div>
            <S.BlueButton onClick={goRecruit}>모집하기</S.BlueButton>
          </div>
          <div>
            <img src="/images/main2.png" alt="mainImg" />
          </div>
        </div>
      </S.MainBox3>
      <S.LastBox id="3" data-aos="fade-in">
        <div>
          <div>
            세상에 없었던
            <br />
            새로운 <span>구인구직</span> 서비스,
            <br />
            미니바이트
          </div>
          <div>
            <img src="/images/mainLogo.png" alt="MainImg" />
          </div>
        </div>
      </S.LastBox>
      {modalSwitch && <CreateAuthModal setModalSwitch={setModalSwitch} />}
    </S.BackGround>
  );
}
