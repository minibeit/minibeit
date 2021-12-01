import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { logoutFunc } from "../../../utils/auth";
import CreateAuthModal from "../Modal/CreateAuthModal";
import * as S from "./style";

export default function NavBar() {
  const user = useRecoilValue(userState);
  const history = useHistory();
  const [modalSwitch, setModalSwitch] = useState(false);
  const isLogin = user.isLogin;
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
          <p>MINI</p>
        </Link>
        <S.NavBarMenu>
          <Link to="/apply">
            <p>참여하기</p>
          </Link>
        </S.NavBarMenu>
        <S.NavBarMenu
          onClick={() =>
            isLogin ? history.push("/recruit") : setModalSwitch(true)
          }
        >
          <p>모집하기</p>
        </S.NavBarMenu>
        <S.NavBarMenu>
          <Link to="/">
            <p>이용하기</p>
          </Link>
        </S.NavBarMenu>
      </S.NavBarLogoContainer>
      <S.NavBarMenuContainer>
        {user.didSignup === true ? (
          <>
            <Link to={"/profile/approve"}>
              <img
                src={
                  user.avatar !== "noImg"
                    ? user.avatar
                    : "/images/기본프로필.png"
                }
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
