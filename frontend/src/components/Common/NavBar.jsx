import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import { logoutFunc } from "../../utils/auth";
import * as S from "./style";

export default function NavBar() {
  const data = useRecoilValue(userState);
  const [loginState, setloginState] = useState(data.isLogin);
  const username = data.name;

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
              <Link to="/login">
                <p>로그인</p>
              </Link>
              <Link to="/signup">
                <p>회원가입</p>
              </Link>
            </S.NavBarAuth>
          )}
        </S.NavBarAuth>
      </S.NavBarMenuContainer>
    </S.NavBarContainer>
  );
}
