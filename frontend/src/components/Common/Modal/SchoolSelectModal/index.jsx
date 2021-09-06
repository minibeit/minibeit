import React from "react";
import { useRecoilState } from "recoil";
import { LoadingSpinner } from "../..";
import { filterState } from "../../../../recoil/filterState";
import Portal from "../Portal";
import * as S from "./style";
import PropTypes from "prop-types";

SchoolSelectModal.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
  schoolList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default function SchoolSelectModal({ setModalSwitch, schoolList }) {
  console.log(schoolList);
  const [filter, setFilter] = useRecoilState(filterState);
  const closeModal = () => {
    setModalSwitch(false);
  };
  const selectSchool = async (e) => {
    const filter_cp = { ...filter };
    filter_cp["schoolId"] = parseInt(e.target.id);
    await setFilter(filter_cp);
    await closeModal();
  };
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.SchoolSearchInput />
            <S.SchoolList>
              {schoolList ? (
                schoolList.map((a) => {
                  return (
                    <div key={a.id} id={a.id} onClick={selectSchool}>
                      {a.name}
                    </div>
                  );
                })
              ) : (
                <LoadingSpinner />
              )}
            </S.SchoolList>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
