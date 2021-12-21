import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
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

  const logout = () => {
    logoutFunc().then(() => {
      toast.info("로그아웃이 되었습니다!");
      setTimeout(() => {
        window.location.replace("/");
        localStorage.clear();
      }, 500);
    });
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
        {user.isLogin === true ? (
          <>
            <Link to={"/profile?approve"}>
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
