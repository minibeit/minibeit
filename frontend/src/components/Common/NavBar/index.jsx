import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { logoutFunc } from "../../../utils/auth";
import CreateAuthModal from "../Modal/CreateAuthModal";
import * as S from "./style";

export default function NavBar() {
  const data = useRecoilValue(userState);
  const [modalSwitch, setModalSwitch] = useState(false);
  const username = data.name;
  const onClick = () => {
    setModalSwitch(true);
  };

  const logout = async () => {
    await logoutFunc()
      .then(async () => {
        window.alert("로그아웃이 되었습니다!");
        window.location.replace("/");
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  };

  return (
    <S.NavBarContainer>
      <S.NavBarLogoContainer>
        <Link to="/">
          <div />
          <p>MINI</p>
        </Link>
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
        <S.NavBarMenu>
          <Link to="/">
            <p>이용하기</p>
          </Link>
        </S.NavBarMenu>
      </S.NavBarLogoContainer>
      <S.NavBarMenuContainer>
        {data.didSignup === true ? (
          <>
            <Link to={`/user/${username}`}>
              <img
                src={data.avatar !== "noImg" ? data.avatar : "/기본프로필.png"}
                alt="사진"
              />
            </Link>
            <S.NavBarAuth>
              <p onClick={logout}>로그아웃</p>
            </S.NavBarAuth>
          </>
        ) : (
          <S.NavBarAuth>
            <p onClick={onClick}>시작하기</p>
            {modalSwitch ? (
              <CreateAuthModal setModalSwitch={setModalSwitch} />
            ) : null}
          </S.NavBarAuth>
        )}
      </S.NavBarMenuContainer>
    </S.NavBarContainer>
  );
}
