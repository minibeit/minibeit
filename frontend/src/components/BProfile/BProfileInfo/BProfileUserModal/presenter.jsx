import React from "react";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";
import { ReactComponent as PencleIcon } from "../../../../svg/연필.svg";
import UserSearch from "./UserSearch";

import * as S from "./style";
import ExceptMember from "../../../Common/Alert/ExceptMember";
import AskChangeAdmin from "../../../Common/Alert/AskChangeAdmin";

export default function Presenter({
  isAdmin,
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
  setExceptUser,
  secondAlert,
  setSecondAlert,
  exceptUser,
  setchangeAdmin,
  askChangeAdmin,
  user,
  setUser,
}) {
  return (
    <>
      {isAdmin ? (
        <S.SearchInput>
          <UserSearch onChange={(e) => setSearchUser(e)} />
          <button onClick={() => addUser(searchUser)}>초대</button>
        </S.SearchInput>
      ) : (
        <S.SearchInput />
      )}

      <S.UserListView>
        <S.UserEditBox>
          <div>
            <p>소속인원 / {bisnessUsers.length} 명</p>
            {isAdmin && (
              <>
                {editUserMode ? (
                  <S.UserEditBtn
                    onClick={() => setEditUserMode(false)}
                    disabled={editCheifMode && true}
                  >
                    완료
                  </S.UserEditBtn>
                ) : (
                  <S.UserEditBtn
                    onClick={() => setEditUserMode(true)}
                    disabled={editCheifMode && true}
                  >
                    <PencleIcon />
                  </S.UserEditBtn>
                )}
              </>
            )}
          </div>
          <p>
            {editUserMode && "추방할 유저의 x버튼을 클릭해주세요"}
            {editCheifMode &&
              "유저를 선택하고 확인버튼을 눌러 담당자를 변경하세요"}
          </p>
          {isAdmin && (
            <>
              {editCheifMode ? (
                <S.CheifEditBtn
                  onClick={() => {
                    if (adminName) {
                      setchangeAdmin(true);
                    } else {
                      setEditCheifMode(false);
                    }
                  }}
                  disabled={editUserMode}
                >
                  확인
                </S.CheifEditBtn>
              ) : (
                <S.CheifEditBtn
                  onClick={() => setEditCheifMode(!editCheifMode)}
                  disabled={editUserMode}
                >
                  담당자 양도하기
                </S.CheifEditBtn>
              )}
            </>
          )}
        </S.UserEditBox>
        <S.UserListBox>
          {bisnessUsers &&
            bisnessUsers.map((a, i) => {
              return (
                <div key={i}>
                  {editUserMode && (
                    <S.UserDeleteBtn
                      onClick={() => {
                        setExceptUser(true);
                        setUser(a);
                      }}
                    >
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
        {askChangeAdmin && (
          <AskChangeAdmin
            setchangeAdmin={setchangeAdmin}
            changeAdmin={changeAdmin}
            adminName={adminName}
          />
        )}
        {exceptUser && (
          <ExceptMember
            setExceptUser={setExceptUser}
            secondAlert={secondAlert}
            setSecondAlert={setSecondAlert}
            exceptUser={exceptUser}
            deleteUser={deleteUser}
            user={user}
          />
        )}
      </S.UserListView>
    </>
  );
}
