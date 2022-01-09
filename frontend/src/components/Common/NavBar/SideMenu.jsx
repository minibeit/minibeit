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
            href="https://minibeit.oopy.io/550d11c3-378c-468c-829a-0ebb111cac15"
          >
            이용하기
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
            href="https://minibeit.oopy.io/a3356202-d590-42e8-adfb-3277e7add842"
          >
            공지사항
          </S.Items>
        </div>
      </S.SideMenu>
    </Drawer>
  );
}
