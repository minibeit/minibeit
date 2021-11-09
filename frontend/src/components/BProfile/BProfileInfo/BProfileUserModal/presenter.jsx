import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import UserSearch from "./UserSearch";

import * as S from "./style";

export default function Presenter({
  addUser,
  bisnessUsers,
  state,
  deleteUser,
  setState,
  cheifId,
  setCheifId,
  currentUser,
  handleAssign,
  setNickname,
}) {
  const [searchUser, setSearchUser] = useState();
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <S.SearchInput>
        <UserSearch onChange={(e) => setSearchUser(e)} />
        <button onClick={() => addUser(searchUser)}>초대</button>
      </S.SearchInput>

      <S.UserListView>
        <S.UserEditBox>
          <p>소속인원 / {bisnessUsers.length}</p>
          {!editMode && <button onClick={() => setEditMode(true)}>수정</button>}
          {editMode && <button onClick={() => setEditMode(false)}>완료</button>}
          <button>관리자 양도</button>
        </S.UserEditBox>
        <S.UserListBox>
          {bisnessUsers &&
            bisnessUsers.map((a) => {
              return (
                <>
                  {editMode ? (
                    <Chip
                      label={a.nickname}
                      onDelete={() => {
                        deleteUser(a);
                      }}
                    />
                  ) : (
                    <Chip label={a.nickname} />
                  )}
                </>
              );
            })}
        </S.UserListBox>
      </S.UserListView>
    </>
  );
}
