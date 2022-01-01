import React from "react";
import Drawer from "@mui/material/Drawer";
import { useHistory } from "react-router";

import * as S from "./style";

export default function SideMenu({
  user,
  onClick,
  isLogin,
  setMenuSwitch,
  setModalSwitch,
}) {
  const history = useHistory();
  return (
    <Drawer anchor={"right"} open={true} onClose={() => setMenuSwitch(false)}>
      <S.SideMenu>
        <div>
          {isLogin && (
            <S.ProfileImg
              sideMenu={true}
              img={user.avatar}
              onClick={() => {
                history.push("/profile?approve");
                setMenuSwitch(false);
              }}
            />
          )}
          <S.LoginBtn
            onClick={() => {
              setMenuSwitch(false);
              onClick();
            }}
          >
            {isLogin ? "로그아웃" : "로그인"}
          </S.LoginBtn>
        </div>
        <div>
          <S.Items
            onClick={() => {
              history.push("/apply");
              setMenuSwitch(false);
            }}
          >
            참여하기
          </S.Items>
          <S.Items
            onClick={() => {
              if (isLogin) {
                history.push("/recruit");
                setMenuSwitch(false);
              } else {
                setModalSwitch(true);
              }
            }}
          >
            모집하기
          </S.Items>
          <S.Items>이용하기</S.Items>
        </div>
      </S.SideMenu>
    </Drawer>
  );
}
