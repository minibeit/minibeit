import React, { useState } from "react";
import moment from "moment";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";
import { toast } from "react-toastify";

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
  const [isActive, setIsActive] = useState(false);
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
      switch (mode) {
        case "good": {
          createBusinessReviewApi(
            data.businessProfile.id,
            data.postDoDateId,
            goodItem.indexOf(reviewData) + 1
          )
            .then((res) => toast.info("평가가 완료되었습니다"))
            .catch((err) => toast.error("평가에 실패했습니다"));
          break;
        }
        case "bad": {
          toast.info("후기 작성을 완료했습니다");
          break;
        }
        default:
      }
      changeFeedData();
      setModalSwitch(false);
    } else {
      toast.info("이유를 선택해주세요");
    }
  };

  return (
    <Portal>
      <S.ModalBox>
        <div>
          <CloseIcon
            onClick={() => {
              setModalSwitch(false);
            }}
          />
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
                <S.Select
                  defaultValue="default"
                  onClick={() => setIsActive(!isActive)}
                  isActive={isActive}
                >
                  {goodItem[reviewData]}
                  <span onClick={() => setIsActive(!isActive)}>▲</span>
                </S.Select>
                <div>
                  {isActive &&
                    goodItem.map((a, i) => (
                      <S.Option
                        onClick={(e) => {
                          setReviewData(goodItem.indexOf(e.target.value));
                          setIsActive(!isActive);
                        }}
                        value={a}
                        key={i}
                      >
                        {a}
                      </S.Option>
                    ))}
                </div>
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
                <S.Select
                  defaultValue="default"
                  onClick={() => setIsActive(!isActive)}
                  isActive={isActive}
                >
                  {badItem[reviewData]}
                  <span onClick={() => setIsActive(!isActive)}>▲</span>
                </S.Select>
                <div>
                  {isActive &&
                    badItem.map((a, i) => (
                      <S.Option
                        onClick={(e) => {
                          setReviewData(badItem.indexOf(e.target.value));
                          setIsActive(!isActive);
                        }}
                        value={a}
                        key={i}
                      >
                        {a}
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
