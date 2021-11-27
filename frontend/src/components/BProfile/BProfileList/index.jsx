import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ReactComponent as AddIcon } from "../../../svg/플러스.svg";
import { bprofileListGet, getBprofileInfo } from "../../../utils";
import { PVImg } from "../../Common";

import BProfileCreateModal from "../../Common/Modal/BProfileCreateModal";

import * as S from "../style";

export default function BProfileInfo({ businessId }) {
  const history = useHistory();
  const [modalSwitch, setModalSwitch] = useState(false);
  const [bProfileData, setBProfileData] = useState();
  const [BProfileList, setBProfileList] = useState();

  useEffect(() => {
    bprofileListGet().then((res) => setBProfileList(res.data.data));
  }, []);
  useEffect(() => {
    getBprofileInfo(businessId).then((res) => {
      setBProfileData(res.data.data);
    });
  }, [businessId]);

  return (
    <S.BusinessListBox>
      <p>프로필 목록</p>
      <div>
        {BProfileList &&
          bProfileData &&
          BProfileList.map((a) => {
            return (
              a.id !== bProfileData.id && (
                <S.BusinessProfile key={a.id}>
                  <div>
                    <S.SImgBox
                      onClick={() => history.push(`/business/${a.id}`)}
                    >
                      {a.avatar ? (
                        <PVImg img={a.avatar} />
                      ) : (
                        <PVImg img="/images/기본프로필.png" />
                      )}
                    </S.SImgBox>
                    <p>{a.name}</p>
                  </div>
                </S.BusinessProfile>
              )
            );
          })}
        {BProfileList && BProfileList.length < 3 && (
          <S.ImgBox>
            <S.AddBProfileBtn onClick={() => setModalSwitch(true)}>
              <AddIcon />
            </S.AddBProfileBtn>
            {modalSwitch && (
              <BProfileCreateModal setModalSwitch={setModalSwitch} />
            )}
          </S.ImgBox>
        )}
      </div>
    </S.BusinessListBox>
  );
}
