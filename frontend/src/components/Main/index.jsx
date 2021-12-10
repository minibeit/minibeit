import React, { useState } from "react";
import * as S from "./style";
import MainSlide from "./MainSlide";
import { Link } from "react-scroll";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import CreateAuthModal from "../Common/Modal/CreateAuthModal";

import { ReactComponent as ArrowDown } from "../../svg/체크.svg";

export default function MainComponent() {
  const history = useHistory();
  const isLogin = useRecoilValue(userState).isLogin;
  const [modalSwitch, setModalSwitch] = useState(false);

  const goApply = () => {
    if (isLogin) {
      history.push("/apply");
    } else {
      let value = window.confirm("이용하려면 로그인 먼저 해주세요!");
      if (value) {
        setModalSwitch(true);
      }
    }
  };

  const goRecruit = () => {
    if (isLogin) {
      history.push("/recruit");
    } else {
      let value = window.confirm("이용하려면 로그인 먼저 해주세요!");
      if (value) {
        setModalSwitch(true);
      }
    }
  };

  return (
    <S.BackGround>
      <div>
        <p>
          초단기 구인구직을 위한
          <br /> 딱 맞는 퍼즐, 미니바이트
        </p>
        <div>
          <Link to="1" spy={true} smooth={true}>
            <S.WhiteButton>참여하기</S.WhiteButton>
          </Link>
          <Link to="2" spy={true} smooth={true}>
            <S.WhiteButton>모집하기</S.WhiteButton>
          </Link>
        </div>
        <p>일단 둘러볼래요</p>
        <Link to="3" spy={true} smooth={true}>
          <S.Icon>
            <ArrowDown />
          </S.Icon>
        </Link>
      </div>
      <S.Section id="1">
        <S.BlueButton onClick={goApply}>참여하기</S.BlueButton>
        <p>
          가까운 위치에, 남는 시간에 <br /> 간편하게 지원하기
        </p>
        <MainSlide />
      </S.Section>
      {modalSwitch && <CreateAuthModal setModalSwitch={setModalSwitch} />}
      <S.Section id="2">
        <S.BlueButton onClick={goRecruit}>모집하기</S.BlueButton>
        <p>
          가장 쉽고 빠르게 <br /> 원하는 스케줄로 모집하기
        </p>
        <MainSlide />
      </S.Section>
      <div id="3">
        <S.LastJumbo>
          <p>
            세상에 없었던
            <br />
            새로운 <span>구인구직</span> 서비스,
            <br />
            미니바이트
          </p>
        </S.LastJumbo>
      </div>
    </S.BackGround>
  );
}
