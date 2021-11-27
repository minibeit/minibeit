import React from "react";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";
import { ReactComponent as PencleIcon } from "../../../../svg/연필.svg";
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
          <p>소속인원 / {bisnessUsers.length} 명</p>

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
              <PencleIcon />
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
              담당자 양도하기
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
