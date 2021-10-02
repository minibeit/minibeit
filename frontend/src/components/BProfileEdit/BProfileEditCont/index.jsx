import React, { useEffect, useState } from "react";
import { editBprofile, getBprofileInfo } from "../../../utils/bprofileApi";
import PBProfileEditCont from "./PBProfileEditCont";
import { LoadingSpinner } from "../../Common";
import Portal from "../../Common/Modal/Portal";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "../style";

export default function BProfileEditCont({ businessId, setModal2Switch }) {
  const [BProfileData, setBProfileData] = useState();
  const bpEditHandler = async (inputs, img, basicImg) => {
    editBprofile(businessId, inputs, img, basicImg)
      .then((res) => {
        window.location.replace("/business/" + businessId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProfile = async () => {
    getBprofileInfo(businessId).then((res) => setBProfileData(res.data));
  };
  useEffect(() => {
    getProfile();
  }, []);
  const closeModal = () => {
    setModal2Switch(false);
  };
  return (
    <>
      {BProfileData ? (
        <Portal>
          <S.ModalBackground>
            <S.ModalBox>
              <S.ModalHeader>
                <p>비즈니스 프로필 수정하기</p>
                <S.CloseModalBtn onClick={closeModal}>
                  <CloseIcon />
                </S.CloseModalBtn>
              </S.ModalHeader>
              <S.ModalContent>
                <PBProfileEditCont
                  bpEditHandler={bpEditHandler}
                  BProfileData={BProfileData}
                />
              </S.ModalContent>
            </S.ModalBox>
          </S.ModalBackground>
        </Portal>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
