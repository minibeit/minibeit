import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import UserSearch from "./UserSearch";

import * as S from "./style";

export default function Presenter({
  bisnessUsers,
  addUser,
  deleteUser,
  changeAdmin,
  adminName,
  setAdminName,
  searchUser,
  setSearchUser,
  editUserMode,
  setEditUserMode,
  editCheifMode,
  setEditCheifMode,
}) {
  return (
    <>
      <S.SearchInput>
        <UserSearch onChange={(e) => setSearchUser(e)} />
        <button onClick={() => addUser(searchUser)}>초대</button>
      </S.SearchInput>

      <S.UserListView>
        <S.UserEditBox>
          <p>소속인원 / {bisnessUsers.length}</p>

          {editUserMode ? (
            <button
              onClick={() => setEditUserMode(false)}
              disabled={editCheifMode && true}
            >
              완료
            </button>
          ) : (
            <button
              onClick={() => setEditUserMode(true)}
              disabled={editCheifMode && true}
            >
              수정
            </button>
          )}
          {editCheifMode ? (
            <button
              onClick={() => {
                changeAdmin(adminName);
                setEditCheifMode(!editCheifMode);
              }}
              disabled={editUserMode}
            >
              확인
            </button>
          ) : (
            <button
              onClick={() => setEditCheifMode(!editCheifMode)}
              disabled={editUserMode}
            >
              관리자 양도
            </button>
          )}
        </S.UserEditBox>
        <S.UserListBox>
          {bisnessUsers &&
            bisnessUsers.map((a, i) => {
              return (
                <div key={i}>
                  {editUserMode && (
                    <S.UserDeleteBtn onClick={() => deleteUser(a)}>
                      <CloseIcon />
                    </S.UserDeleteBtn>
                  )}
                  <S.UserBox
                    color={adminName.nickname === a.nickname ? "true" : "false"}
                    onClick={() => {
                      editCheifMode && setAdminName(a);
                    }}
                  >
                    {a.nickname}
                  </S.UserBox>
                </div>
              );
            })}
        </S.UserListBox>
      </S.UserListView>
    </>
  );
}
