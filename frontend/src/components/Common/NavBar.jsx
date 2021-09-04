import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import { logoutFunc } from "../../utils/auth";
import CreateAuthModal from "./Modal/CreateAuthModal";
import * as S from "./style";

export default function NavBar() {
  const data = useRecoilValue(userState);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [loginState, setloginState] = useState(data.didSignup);
  const username = data.name;
  const onClick = () => {
    setModalSwitch(true);
  };

  const logout = async () => {
    try {
      const result = await logoutFunc();
      if (result) {
        console.log(result);
        window.alert("로그아웃이 되었습니다!");
        window.location.replace("/");
        localStorage.clear();
        setloginState({
          ...loginState,
          isLogin: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(data);
    if (data.didSignup === false && localStorage.getItem("accessToken")) {
      localStorage.clear();
      window.location.replace("/");
    }
  }, []);
  return (
    <S.NavBarContainer>
      <S.NavBarLogoContainer>
        <Link to="/">
          <p>MiNiBEiT</p>
        </Link>
      </S.NavBarLogoContainer>
      <S.NavBarMenuContainer>
        <S.NavBarMenu>
          <Link to="/apply">
            <p>지원하기</p>
          </Link>
        </S.NavBarMenu>
        <S.NavBarMenu>
          <Link to="/recruit">
            <p>모집하기</p>
          </Link>
        </S.NavBarMenu>
        <S.NavBarAuth>
          {loginState === true ? (
            <S.NavBarAuth>
              <Link to={`/user/${username}`}>{username}님 안녕하세요</Link>
              <p onClick={logout}>로그아웃</p>
            </S.NavBarAuth>
          ) : (
            <S.NavBarAuth>
              <p onClick={onClick}>시작하기</p>
              {modalSwitch ? (
                <CreateAuthModal setModalSwitch={setModalSwitch} />
              ) : null}
            </S.NavBarAuth>
          )}
        </S.NavBarAuth>
      </S.NavBarMenuContainer>
    </S.NavBarContainer>
  );
}
