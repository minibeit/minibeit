import React, { useState } from "react";
import * as S from "../style";

export default function PBProfileJoin({ handleJoin, handleDelete, usergroup }) {
  const [nickname, setNickname] = useState("");
  const onChange = (e) => {
    const { value } = e.target;
    setNickname(value);
  };

  return (
    <>
      <S.JoinContainer>
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
        {usergroup.length >= 1
          ? usergroup.map((user) => (
              <div key={user.id}>
                {" "}
                <S.BPuser>{user.nickname}</S.BPuser>
                <S.BPuserdelete
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleDelete(user.nickname);
                    setNickname("");
                  }}
                >
                  x
                </S.BPuserdelete>
              </div>
            ))
          : null}
      </S.JoinContainer>
    </>
  );
}
