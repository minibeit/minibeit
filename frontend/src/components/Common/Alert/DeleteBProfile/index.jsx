import React, { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import Portal from "../Portal";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";
import { deleteBprofile } from "../../../../utils";

import * as S from "./style";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/userState";

// 비즈니스 프로필 삭제 확인

export default function DeliteBProfile({ BProfileId, setDeleteAlert }) {
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
        toast.info("삭제가 완료되었습니다.");
      })
      .catch((err) => setSecondAlert(true));
  };

  return (
    <Portal>
      <S.AlertBox>
        {!secondAlert ? (
          <S.AlertContent>
            <InfoIcon />
            <p>
              <span>정말로 삭제하시겠어요?</span>
              <br />
              비즈니스 프로필이 없으면,
              <br />
              게시글을 통해서 모집을 할 수 없어요.
            </p>
            <div>
              <S.GrayButton onClick={() => setDeleteAlert(false)}>
                아니오, 관둘래요
              </S.GrayButton>
              <S.BlueButton onClick={() => deleteBusiness(BProfileId)}>
                네, 삭제할래요
              </S.BlueButton>
            </div>
          </S.AlertContent>
        ) : (
          <S.AlertContent2>
            <InfoIcon />
            <p>
              삭제할 수 없는 프로필입니다.
              <p>
                글내리기를 눌러 게시글을 삭제하거나
                <br />
                비즈니스 프로필의 관리자를 바꾼 뒤 다시 진행해주세요.
              </p>
            </p>
            <div>
              <S.BlueButton
                onClick={() => {
                  setDeleteAlert(false);
                  setSecondAlert(false);
                }}
              >
                네, 알겠어요.
              </S.BlueButton>
            </div>
          </S.AlertContent2>
        )}
      </S.AlertBox>
    </Portal>
  );
}
