import React, { useState } from "react";
import moment from "moment";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

import * as S from "./style";
import Portal from "../../../Common/Modal/Portal";
import { createBusinessReviewApi } from "../../../../utils";

export default function FeedCloseModal({
  data,
  changeFeedData,
  setModalSwitch,
}) {
  const [mode, setMode] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [goodItem] = useState([
    "예상보다 소요 시간이 적었어요",
    "참여 경험이 흥미로웠어요",
    "참여에 대한 보상이 충분해요",
    "구성원들이 친절하고 편안했어요",
  ]);
  const [badItem] = useState([
    "예상 소요 시간을 초과하였어요",
    "참여에 대한 보상이 아쉬워요",
    "참여 경험이 다소 지루했어요",
    "구성원들이 다소 불편했어요",
  ]);

  const submit = () => {
    if (reviewData) {
      if (mode === "bad") {
        alert("후기 작성을 완료했습니다");
        setModalSwitch(false);
      } else if (mode === "good") {
        createBusinessReviewApi(
          data.businessProfileId,
          data.postDoDateId,
          reviewData
        )
          .then((res) => {
            alert("평가가 완료되었습니다");
            changeFeedData();
            setModalSwitch(false);
          })
          .catch((err) => {
            alert("평가에 실패했습니다");
            changeFeedData();
            setModalSwitch(false);
          });
      }
    } else {
      alert("이유를 선택해주세요");
    }
  };

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <div>
            <CloseIcon onClick={() => setModalSwitch(false)} />
          </div>
          <S.ModalContent>
            {!mode && (
              <>
                <S.TitleBox>
                  <InfoIcon />
                  <p>해당 실험이 어떠셨나요?</p>
                  <p>{data.title}</p>
                  <p>
                    참여날짜 : {moment(data.doDate).format("YYYY.MM.DD")} |
                    참여시간: {data.startTime} ~ {data.endTime}
                  </p>
                </S.TitleBox>
                <S.ButtonBox>
                  <button onClick={() => setMode("good")}>만족했어요</button>
                  <button onClick={() => setMode("bad")}>불만족했어요</button>
                </S.ButtonBox>
              </>
            )}
            {mode === "good" && (
              <>
                <S.TitleBox>
                  <InfoIcon />
                  <p>만족 사유를 알려주세요</p>
                </S.TitleBox>
                <S.SelectBox>
                  <select
                    defaultValue="default"
                    onClick={(e) => setReviewData(e.target.value)}
                  >
                    <option value="default" disabled></option>
                    {goodItem.map((a, i) => (
                      <option value={i + 1} key={i}>
                        {a}
                      </option>
                    ))}
                  </select>
                </S.SelectBox>
                <S.ButtonBox>
                  <button onClick={submit}>확인</button>
                </S.ButtonBox>
              </>
            )}
            {mode === "bad" && (
              <>
                <S.TitleBox>
                  <InfoIcon />
                  <p>불만족 사유를 알려주세요</p>
                </S.TitleBox>
                <S.SelectBox>
                  <select
                    defaultValue="default"
                    onClick={(e) => setReviewData(e.target.value)}
                  >
                    <option value="default" disabled></option>
                    {badItem.map((a, i) => (
                      <option value={i + 1} key={i}>
                        {a}
                      </option>
                    ))}
                  </select>
                </S.SelectBox>
                <S.ButtonBox>
                  <button onClick={submit}>확인</button>
                </S.ButtonBox>
              </>
            )}
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
