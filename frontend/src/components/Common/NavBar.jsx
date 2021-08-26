import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import { logoutFunc } from "../../utils/auth";
import * as S from "./style";

export default function NavBar() {
  const data = useRecoilValue(userState);
  const [loginState, setloginState] = useState(data.isLogin);
  const username = data.name;
  const history = useHistory();

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
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };
  const onclick = async (e) => {
    alert("hi");
    try {
      window.location.replace(
        "http://3.36.95.15:8080/oauth2/authorization/kakao"
      );
    } catch (e) {
      alert(e);
    }

    alert("hi");
    console.log(window.location);

    console.log(e);
  };
  const google = async (e) => {
    window.location.replace(
      "http://3.36.95.15:8080/api/oauth2/authorization/kakao"
    );
    console.log(e);
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
            <S.NavBarAuth onClick={logout}>
              <p>{username} 님 안녕하세요</p>
              <p>로그아웃</p>
            </S.NavBarAuth>
          ) : (
            <S.NavBarAuth>
              <Link to="/signup">
                <p>회원가입</p>
              </Link>
              <Link to="/login">
                <p>로그인</p>
              </Link>
              <div onClick={onclick}>카카오아이디로 로그인</div>

              <p onClick={google}>구글로 로그인</p>
            </S.NavBarAuth>
          )}
        </S.NavBarAuth>
      </S.NavBarMenuContainer>
    </S.NavBarContainer>
  );
}
