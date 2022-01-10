import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { logoutFunc } from "../../../utils/auth";
import CreateAuthModal from "../Modal/CreateAuthModal";
import SideMenu from "./SideMenu";
import MenuIcon from "@mui/icons-material/Menu";

import * as S from "./style";

export default function NavBar() {
  const user = useRecoilValue(userState);
  const history = useHistory();
  const [modalSwitch, setModalSwitch] = useState(false);
  const [menuSwitch, setMenuSwitch] = useState(false);
  const isLogin = user.isLogin;

  const onClick = () => {
    if (isLogin) {
      logout();
    } else {
      setModalSwitch(true);
    }
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

  console.log(user);
  return (
    <S.NavBar>
      <div>
        <S.Logo onClick={() => history.push("/")}>
          <img src="/images/mainLogo2.png" alt="logo" />
          미니바이트
        </S.Logo>
        <S.NavItems>
          <S.Items onClick={() => history.push("/apply")}>참여하기</S.Items>
          <S.Items
            onClick={() =>
              isLogin ? history.push("/recruit") : setModalSwitch(true)
            }
          >
            모집하기
          </S.Items>
          <S.Items
            target="_blank"
            rel="noreferrer"
            href="https://minibeit.oopy.io/intro"
          >
            이용방법
          </S.Items>
          <S.Items
            target="_blank"
            rel="noreferrer"
            href="https://minibeit.oopy.io/2b3aa7b3-d43d-4c64-8f6a-071b99e17a1a"
          >
            이벤트
          </S.Items>
          <S.Items
            target="_blank"
            rel="noreferrer"
            href="https://minibeit.oopy.io/notice"
          >
            공지사항
          </S.Items>
        </S.NavItems>
        <S.AuthBox>
          {isLogin && (
            <S.ProfileImgBox onClick={() => history.push("/profile?approve")}>
              {user.avatar !== "noImg" ? (
                <img src={user.avatar} alt="profileImg" />
              ) : (
                <img src="/images/기본프로필.png" alt="profileImg" />
              )}
            </S.ProfileImgBox>
          )}
          <S.LoginBtn onClick={onClick}>
            {isLogin ? "로그아웃" : "로그인"}
          </S.LoginBtn>
        </S.AuthBox>
        <S.MobileListBtn onClick={() => setMenuSwitch(true)}>
          <MenuIcon />
        </S.MobileListBtn>
        {menuSwitch && (
          <SideMenu
            user={user}
            onClick={onClick}
            isLogin={isLogin}
            setMenuSwitch={setMenuSwitch}
            setModalSwitch={setModalSwitch}
          />
        )}
        {modalSwitch && (
          <CreateAuthModal
            setModalSwitch={setModalSwitch}
            modalSwitch={modalSwitch}
          />
        )}
      </div>
    </S.NavBar>
  );
}
