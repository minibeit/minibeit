import React, { useState } from "react";
import moment from "moment";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";
import toast from "react-hot-toast";

import * as S from "./style";
import Portal from "../../../Common/Modal/Portal";
import { createBusinessReviewApi } from "../../../../utils";

export default function FeedCloseModal({
  data,
  changeFeedData,
  setModalSwitch,
}) {
  const [mode, setMode] = useState(null);
  const [reviewData, setReviewData] = useState();
  const [isActive, setIsActive] = useState(false);
  const [itemArr, setItemArr] = useState([]);

  const onClose = () => {
    changeFeedData();
    setModalSwitch(false);
  };

  const modeSelect = (mode) => {
    const goodItem = [
      { id: 1, context: "예상보다 소요 시간이 적었어요" },
      { id: 2, context: "참여 경험이 흥미로웠어요" },
      { id: 3, context: "참여에 대한 보상이 충분해요" },
      { id: 4, context: "구성원들이 친절하고 편안했어요" },
    ];
    const badItem = [
      { id: 6, context: "예상 소요 시간을 초과하였어요" },
      { id: 7, context: "참여에 대한 보상이 아쉬워요" },
      { id: 8, context: "참여 경험이 다소 지루했어요" },
      { id: 9, context: "구성원들이 다소 불편했어요" },
    ];
    setItemArr(mode === "good" ? goodItem : badItem);
  };

  const submit = () => {
    if (reviewData) {
      createBusinessReviewApi(
        data.businessProfile.id,
        data.postDoDateId,
        reviewData.id
      )
        .then((res) => {
          toast.success("평가가 완료되었습니다");
          onClose();
        })
        .catch((err) => toast.error("평가에 실패했습니다"));
    } else {
      toast.error("이유를 선택해주세요");
    }
  };

  return (
    <Portal>
      <S.ModalBox>
        <div>
          <CloseIcon onClick={onClose} />
        </div>
        <S.ModalContent>
          {!mode ? (
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
                <button
                  onClick={() => {
                    setMode("good");
                    modeSelect("good");
                  }}
                >
                  만족했어요
                </button>
                <button
                  onClick={() => {
                    setMode("bad");
                    modeSelect("bad");
                  }}
                >
                  불만족했어요
                </button>
              </S.ButtonBox>
            </>
          ) : (
            <>
              <S.TitleBox>
                <InfoIcon />
                <p>{mode === "good" ? "만족" : "불만족"} 사유를 알려주세요</p>
              </S.TitleBox>
              <S.SelectBox>
                <S.Select onClick={() => setIsActive(!isActive)}>
                  {reviewData ? reviewData.context : "이유를 선택해주세요"}
                  <span onClick={() => setIsActive(!isActive)}>▲</span>
                </S.Select>
                <div>
                  {isActive &&
                    itemArr.map((a) => (
                      <S.Option
                        onClick={() => {
                          setReviewData(a);
                          setIsActive(!isActive);
                        }}
                        value={a}
                        key={a.id}
                      >
                        {a.context}
                      </S.Option>
                    ))}
                </div>
              </S.SelectBox>
              <S.ButtonBox>
                <button onClick={submit}>확인</button>
              </S.ButtonBox>
            </>
          )}
        </S.ModalContent>
      </S.ModalBox>
    </Portal>
  );
}
