import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import NicknameCombo from "./NicknameCombo";
import Portal from "../../../Common/Modal/Portal";
import * as S from "../../style";

export default function PBProfileJoin({
  closeModal,
  handleJoin,
  usergroup,
  state,
  setState,
  cheifId,
  setCheifId,
  currentUser,
  handleAssign,
  handleDelete,
  setNickname,
}) {
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <p>소속인원 목록</p>
            <S.CloseModalBtn onClick={closeModal}>
              <CloseIcon />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <NicknameCombo handleJoin={handleJoin} />
            <S.JoinContainer>
              <S.JoinBox1>
                <S.JoinEditCont>
                  <p>소속인원 /{usergroup.length}명</p>
                  {state === "EDIT" ? (
                    <S.JoinEdit
                      onClick={() => {
                        setState("None");
                        setCheifId();
                      }}
                    >
                      <p>완료</p>
                    </S.JoinEdit>
                  ) : (
                    <S.JoinEdit
                      onClick={() => {
                        setState("EDIT");
                        setCheifId();
                      }}
                    >
                      <p>수정</p>
                    </S.JoinEdit>
                  )}
                </S.JoinEditCont>
                <S.JoinAssign>
                  {state === "ASSIGN" ? (
                    <S.JoinEdit
                      onClick={async () => {
                        await handleAssign(cheifId);
                        setState("None");
                        setCheifId();
                      }}
                    >
                      <p>완료</p>
                    </S.JoinEdit>
                  ) : (
                    <S.JoinEdit
                      onClick={() => {
                        setState("ASSIGN");
                      }}
                    >
                      <p>관리자 양도</p>
                    </S.JoinEdit>
                  )}
                </S.JoinAssign>
              </S.JoinBox1>
              <S.JoinBox2>
                {usergroup.length >= 1
                  ? usergroup.map((user) => (
                      <div key={user.id}>
                        {state !== "EDIT" ? null : currentUser ===
                          user.nickname ? null : (
                          <S.BPuserdelete
                            onClick={async (e) => {
                              e.preventDefault();
                              await handleDelete(user.id, user.nickname);
                              setNickname("");
                            }}
                          >
                            <CloseIcon />
                          </S.BPuserdelete>
                        )}{" "}
                        {cheifId === user.id ? (
                          <S.BPuser2
                            onClick={async (e) => {
                              e.preventDefault();
                              if (state === "ASSIGN") {
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
                              if (state === "ASSIGN") {
                                setCheifId(user.id);
                              }
                            }}
                          >
                            {user.nickname}
                          </S.BPuser>
                        )}
                      </div>
                    ))
                  : null}
              </S.JoinBox2>
            </S.JoinContainer>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
