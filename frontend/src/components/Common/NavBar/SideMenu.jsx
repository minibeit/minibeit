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
            <S.ProfileImgBox
              onClick={() => {
                history.push("/profile?approve&1");
                setMenuSwitch(false);
              }}
              sideMenu={true}
            >
              {user.avatar !== "noImg" ? (
                <img src={user.avatar} alt="profileImg" />
              ) : (
                <img src="/images/기본프로필.png" alt="profileImg" />
              )}
            </S.ProfileImgBox>
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
              } else {
                setModalSwitch(true);
              }
              setMenuSwitch(false);
            }}
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
        </div>
      </S.SideMenu>
    </Drawer>
  );
}
