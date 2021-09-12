import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { LoadingSpinner } from "../..";
import { filterState } from "../../../../recoil/filterState";
import Portal from "../Portal";
import * as S from "./style";
import PropTypes from "prop-types";
import { schoolGetApi } from "../../../../utils/schoolApi";

SchoolSelectModal.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
};

export default function SchoolSelectModal({ setModalSwitch }) {
  const [filter, setFilter] = useRecoilState(filterState);
  const [schoolItem, setSchoolItem] = useState();
  const closeModal = () => {
    setModalSwitch(false);
  };
  const searchSchool = (e) => {
    if (e === undefined) {
      schoolGetApi("")
        .then((res) => {
          setSchoolItem(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      schoolGetApi(e.target.value)
        .then((res) => {
          setSchoolItem(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const selectSchool = async (e) => {
    const filter_cp = { ...filter };
    filter_cp["schoolId"] = parseInt(e.target.id);
    filter_cp["schoolName"] = e.target.textContent;
    await setFilter(filter_cp);
    await closeModal();
  };
  useEffect(() => {
    searchSchool();
  }, []);
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.SchoolSearchInput onChange={searchSchool} />
            <S.SchoolList>
              {schoolItem ? (
                schoolItem.map((a) => {
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
