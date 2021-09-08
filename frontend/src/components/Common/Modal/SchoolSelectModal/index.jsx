import React, { useState } from "react";
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
  const [filter, setFilter] = useRecoilState(filterState);
  const [search, setSearch] = useState(null);
  const closeModal = () => {
    setModalSwitch(false);
  };
  const searchSchool = (e) => {
    setSearch(e.target.value);
  };
  const items = schoolList.filter((data) => {
    if (search === null) {
      return data;
    } else if (data.name.toLowerCase().includes(search.toLowerCase())) {
      return data;
    }
  });
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
            <S.SchoolSearchInput onChange={searchSchool} />
            <S.SchoolList>
              {items ? (
                items.map((a) => {
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
