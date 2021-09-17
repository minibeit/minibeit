import React, { useState } from "react";
import * as S from "../style";

export default function PBProfileJoin({ handleJoin, handleDelete, usergroup }) {
  const [nickname, setNickname] = useState("");
  const [editState, setEditState] = useState(false);
  const onChange = (e) => {
    const { value } = e.target;
    setNickname(value);
  };

  return (
    <>
      <S.JoinContainer>
        <S.JoinBox1>
          <S.JoinInput>
            {" "}
            <S.BPNewNickname
              value={nickname}
              name="nickname"
              type="text"
              placeholder="닉네임"
              onChange={onChange}
            />
            <S.BPJoinBtn
              onClick={async (e) => {
                e.preventDefault();
                await handleJoin(nickname);
                setNickname("");
              }}
            >
              초대하기
            </S.BPJoinBtn>
          </S.JoinInput>
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
        </S.JoinBox1>
        <S.JoinBox2>
          <p>소속인원 /{usergroup.length}명</p>
          {usergroup.length >= 1
            ? usergroup.map((user) => (
                <div key={user.id}>
                  {" "}
                  <S.BPuser>{user.nickname}</S.BPuser>
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
