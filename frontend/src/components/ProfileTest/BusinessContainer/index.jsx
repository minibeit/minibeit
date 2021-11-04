import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import { bprofileListGet } from "../../../utils";
import { PVImg } from "../../Common";

import * as S from "../style";

export default function BusinessContainer() {
  const [BProfileList, setBProfileList] = useState();
  const history = useHistory();

  useEffect(() => {
    bprofileListGet().then((res) => setBProfileList(res.data.data));
  }, []);

  return (
    <S.Container>
      {BProfileList && (
        <S.BusinessListBox>
          <p>어떤 비즈니스 프로필을 사용하시겠어요?</p>
          <p>최대 3개까지 생성할 수 있어요</p>
          <div>
            {BProfileList.map((a) => {
              return (
                <S.BusinessProfile key={a.id}>
                  <S.ImgBox onClick={() => history.push(`/business/${a.id}`)}>
                    {a.avatar ? (
                      <PVImg img={a.avatar} />
                    ) : (
                      <PVImg img="/기본비즈니스프로필.jpeg" />
                    )}
                  </S.ImgBox>
                  <p>{a.name}</p>
                </S.BusinessProfile>
              );
            })}
            {BProfileList.length <= 3 && (
              <S.ImgBox>
                <S.AddBProfileBtn>
                  <AddIcon />
                </S.AddBProfileBtn>
              </S.ImgBox>
            )}
          </div>
        </S.BusinessListBox>
      )}
    </S.Container>
  );
}
