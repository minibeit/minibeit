import React from "react";
import PropTypes from "prop-types";

import * as S from "../style";
import { useRecoilState } from "recoil";
import { recuritState } from "../../../recoil/recuritState";

PSelectBProfile.propTypes = {
  bplist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ),
};

export default function PSelectBProfile({ bpList }) {
  const [recurit, setRecurit] = useRecoilState(recuritState);
  const selectBP = (e) => {
    const recurit_cp = { ...recurit };
    recurit_cp["businessProfile"] = {
      id: parseInt(e.target.id),
      name: e.target.textContent,
    };
    setRecurit(recurit_cp);
  };
  return (
    <>
      <h2>모집하기에서</h2>
      <h2>어떤 프로필을 사용할 것인가요?</h2>
      <p>사용하실 비즈니스 프로필을 선택하세요</p>
      {bpList.map((a) => {
        return (
          <button
            onClick={selectBP}
            id={a.id}
            key={a.id}
            disabled={recurit["businessProfile"].id === a.id ? true : false}
          >
            {a.name}
          </button>
        );
      })}
    </>
  );
}