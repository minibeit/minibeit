import React, { useState } from "react";
import * as S from "../style";

export default function PBProfileJoin({
  handleAssign,
  handleDelete,
  usergroup,
}) {
  const [nickname, setNickname] = useState("");
  const [editState, setEditState] = useState(false);
  const [assignState, setAssignState] = useState(false);
  const [cheifId, setCheifId] = useState();

  return (
    <>
      <S.JoinContainer>
        <S.JoinBox1>
          {editState ? (
            <S.JoinEdit
              onClick={() => {
                setEditState(false);
              }}
            >
              완료
            </S.JoinEdit>
          ) : (
            <S.JoinEdit
              onClick={() => {
                setEditState(true);
              }}
            >
              수정
            </S.JoinEdit>
          )}
          <S.JoinAssign>
            {assignState ? (
              <S.JoinEdit
                onClick={async () => {
                  await handleAssign(cheifId);
                  setAssignState(false);
                }}
              >
                완료
              </S.JoinEdit>
            ) : (
              <S.JoinEdit
                onClick={() => {
                  setAssignState(true);
                }}
              >
                관리자 양도
              </S.JoinEdit>
            )}
          </S.JoinAssign>
        </S.JoinBox1>
        <S.JoinBox2>
          <p>소속인원 /{usergroup.length}명</p>
          {usergroup.length >= 1
            ? usergroup.map((user) => (
                <div key={user.id}>
                  {" "}
                  {cheifId === user.id ? (
                    <S.BPuser2
                      onClick={async (e) => {
                        e.preventDefault();
                        if (assignState) {
                          setCheifId(user.id);
                        }
                      }}
                    >
                      {" "}
                      {user.nickname}
                    </S.BPuser2>
                  ) : (
                    <S.BPuser
                      onClick={async (e) => {
                        e.preventDefault();
                        if (assignState) {
                          setCheifId(user.id);
                        }
                      }}
                    >
                      {user.nickname}
                    </S.BPuser>
                  )}
                  {editState === false ? null : (
                    <S.BPuserdelete
                      onClick={async (e) => {
                        e.preventDefault();
                        await handleDelete(user.id, user.nickname);
                        setNickname("");
                      }}
                    >
                      x
                    </S.BPuserdelete>
                  )}
                </div>
              ))
            : null}
        </S.JoinBox2>
      </S.JoinContainer>
    </>
  );
}
