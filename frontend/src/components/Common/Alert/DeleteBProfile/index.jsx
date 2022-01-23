import React, { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import Portal from "../Portal";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";
import { deleteBprofile, leaveBprofileApi } from "../../../../utils";

import * as S from "../style";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/userState";

// 비즈니스 프로필 삭제 확인

export default function DeliteBProfile({
  isAdmin,
  BProfileId,
  setDeleteAlert,
}) {
  const [secondAlert, setSecondAlert] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const history = useHistory();

  const deleteBusiness = (id) => {
    deleteBprofile(id)
      .then((res) => {
        setDeleteAlert(false);
        history.push("/profile?business");
        let copy = { ...user };
        copy.bprofile = null;
        setUser(copy);
        toast.success("삭제가 완료되었습니다.");
      })
      .catch((err) => setSecondAlert(true));
  };

  const leaveBusiness = (id) => {
    leaveBprofileApi(id).then((res) => {
      setDeleteAlert(false);
      history.push("/profile?business");
      let copy = { ...user };
      copy.bprofile = null;
      setUser(copy);
      toast.success("탈퇴가 완료되었습니다.");
    });
  };

  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setDeleteAlert(false)} />
        </S.AlertHeader>
        {!secondAlert ? (
          <S.AlertContent>
            <InfoIcon />
            <S.AlertText>
              <p>
                <span>정말로 {isAdmin ? "삭제" : "탈퇴"}하시겠어요?</span>
                <br />
                비즈니스 프로필이 없으면,
                <br />
                게시글을 통해서 모집을 할 수 없어요.
              </p>
            </S.AlertText>
            <S.BtnGroup>
              <S.GrayButton onClick={() => setDeleteAlert(false)}>
                아니오, 관둘래요
              </S.GrayButton>
              <S.BlueButton
                onClick={() =>
                  isAdmin
                    ? deleteBusiness(BProfileId)
                    : leaveBusiness(BProfileId)
                }
              >
                네, {isAdmin ? "삭제" : "탈퇴"}할래요
              </S.BlueButton>
            </S.BtnGroup>
          </S.AlertContent>
        ) : (
          <S.AlertContent>
            <InfoIcon />
            <S.AlertText>
              <p>삭제할 수 없는 프로필입니다.</p>
              <p>
                생성한 모집공고와 완료된 모집공고에서 "종료"를 눌러 일정을
                종료하신 후에 다시 진행해주세요.
              </p>
            </S.AlertText>
            <S.BtnGroup>
              <S.BlueButton
                onClick={() => {
                  setDeleteAlert(false);
                  setSecondAlert(false);
                }}
              >
                네, 알겠어요.
              </S.BlueButton>
            </S.BtnGroup>
          </S.AlertContent>
        )}
      </S.AlertBox>
    </Portal>
  );
}
