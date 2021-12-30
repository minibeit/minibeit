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

  return (
    <S.NavBar>
      <S.Logo onClick={() => history.push("/")}>MINI</S.Logo>
      <S.NavItems>
        <S.Items onClick={() => history.push("/apply")}>참여하기</S.Items>
        <S.Items
          onClick={() =>
            isLogin ? history.push("/recruit") : setModalSwitch(true)
          }
        >
          모집하기
        </S.Items>
        <S.Items>이용하기</S.Items>
      </S.NavItems>
      <S.AuthBox>
        {isLogin && (
          <S.ProfileImg
            img={user.avatar}
            onClick={() => history.push("/profile?approve")}
          />
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
    </S.NavBar>
  );
}
