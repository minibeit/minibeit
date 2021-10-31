import React, { useCallback, useEffect, useState } from "react";
import {
  approveOneApi,
  cancelOneApi,
  getApproveListApi,
  getWaitListApi,
  rejectOneApi,
  setAttendApi,
} from "../../../utils";
import Portal from "../../Common/Modal/Portal";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./style";

export default function BManageModal({ title, postId, setModalSwitch }) {
  const closeModal = () => {
    setModalSwitch(false);
  };
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let dateString = year + "-" + month + "-" + day;
  const [state, setState] = useState("WAIT");
  const [date, setDate] = useState(dateString);
  const onClick = async (e) => {
    setDate(e.target.value);
  };
  const [waitlist, setWaitlist] = useState([]);
  const getList = useCallback(async () => {
    if (state === "WAIT") {
      await getWaitListApi(postId, date)
        .then((res) => {
          setWaitlist(res.data.data);
        })
        .catch((err) => console.log(err));
    } else if (state === "APPROVE") {
      await getApproveListApi(postId, date)
        .then((res) => {
          setWaitlist(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [date, postId, state]);
  const handleState = async (order) => {
    setState(order);
  };
  const changeState = async (order, postdoDateId, userId, rejectValue) => {
    if (order === "approve") {
      await approveOneApi(postdoDateId, userId)
        .then((res) => {
          window.alert("참여가 허락되었습니다.");
          getList();
        })
        .catch((err) => console.log(err));
    } else if (order === "cancel") {
      await cancelOneApi(postdoDateId, userId)
        .then((res) => {
          window.alert("참여 허락이 취소되었습니다.");
          getList();
        })
        .catch((err) => console.log(err));
    } else if (order === "reject") {
      await rejectOneApi(postdoDateId, userId, rejectValue)
        .then((res) => {
          window.alert("참여가 반려되었습니다.");
          getList();
        })
        .catch((err) => console.log(err));
    } else {
      const attend = order === "Attend" ? true : false;
      await setAttendApi(postdoDateId, userId, attend)
        .then((res) => {
          window.alert("참여여부가 변경되었습니다");
          getList();
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    getList();
  }, [getList]);
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalTab>
          <S.BMBtn2
            state={state === "WAIT" ? "white" : "gray"}
            onClick={async (e) => {
              e.preventDefault();
              await handleState("WAIT");
            }}
          >
            <p>대기자 명단</p>
          </S.BMBtn2>
          <S.BMBtn2
            state={state === "APPROVE" ? "white" : "gray"}
            onClick={async (e) => {
              e.preventDefault();
              await handleState("APPROVE");
            }}
          >
            <p>확정자 명단</p>
          </S.BMBtn2>
        </S.ModalTab>
        <S.ModalBox>
          <S.ModalHeader>
            <p>{title}</p>
            <S.CloseModalBtn>
              <CloseIcon onClick={closeModal} />
              <S.BMDate
                type="date"
                id="start"
                name="date"
                value={date}
                onChange={onClick}
                min="2021-01-01"
                max="2021-12-31"
              ></S.BMDate>
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.ModalSecondContent>
              <S.ModalSecondTopBox>
                <p>실명</p>
                <p>생년월일</p>
                <p>성별</p>
                <p>연락처</p>
                <p>직업</p>
                <p>처리상태</p>
              </S.ModalSecondTopBox>
              <S.ModalSecondBottomBox>
                {waitlist.map((timeBox) => {
                  return (
                    <S.BMTimeBox key={timeBox.postDoDateId}>
                      <S.BMTime>
                        <p>
                          {" "}
                          {timeBox.userInfoList[0].startTime}~
                          {timeBox.userInfoList[0].endTime}
                        </p>
                      </S.BMTime>
                      {state === "WAIT" ? (
                        <ManageWaitBox
                          key={timeBox.postDoDateId}
                          dateId={timeBox.postDoDateId}
                          waitpeople={timeBox.userInfoList}
                          changeState={changeState}
                        />
                      ) : (
                        <ManageApproveBox
                          key={timeBox.postDoDateId}
                          approvepeople={timeBox.userInfoList}
                          changeState={changeState}
                        />
                      )}
                    </S.BMTimeBox>
                  );
                })}
              </S.ModalSecondBottomBox>
            </S.ModalSecondContent>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}

function ManageWaitBox({ dateId, waitpeople, changeState }) {
  const [reject, setReject] = useState({
    state: false,
    id: "",
  });
  const [rejectValue, setRejectValue] = useState("");
  const onChange = async (e) => {
    setRejectValue(e.target.value);
  };
  const rejectFunc = async (elementId) => {
    if (reject.state) {
      setReject({ state: false, id: "" });
    } else {
      setReject({ state: true, id: elementId });
    }
  };
  return waitpeople.map((waitEle) => {
    return (
      <S.BMBoxCont key={String(waitEle.id) + String(dateId)}>
        <S.BMperson>
          <p>{waitEle.name}</p>
          <p>{waitEle.birth}</p>
          <p>{waitEle.gender}</p>
          <p>{waitEle.phoneNum}</p>
          <p>{waitEle.job}</p>
          {waitEle.status === "WAIT" ? (
            <S.BMBtnWrapper>
              <S.BMBtn
                onClick={async (e) => {
                  e.preventDefault();
                  await changeState(
                    "approve",
                    waitEle.postDoDateId,
                    waitEle.id
                  );
                }}
              >
                <p>확정</p>
              </S.BMBtn>
              <S.BMBtn
                onClick={async (e) => {
                  e.preventDefault();
                  await rejectFunc(waitEle.id);
                }}
              >
                <p>반려</p>
              </S.BMBtn>
            </S.BMBtnWrapper>
          ) : (
            <S.BMBtnWrapper>
              <p>확정</p>
              <S.BMBtn
                onClick={async (e) => {
                  e.preventDefault();
                  await changeState("cancel", waitEle.postDoDateId, waitEle.id);
                }}
              >
                <p>취소</p>
              </S.BMBtn>
            </S.BMBtnWrapper>
          )}
        </S.BMperson>
        {reject.state && reject.id === waitEle.id ? (
          <S.BMrejectbox>
            <p>반려사유</p>
            <S.BMrejectInput
              placeholder="반려사유를 입력하세요"
              value={rejectValue}
              onChange={onChange}
            />
            <S.BMBtn
              onClick={async (e) => {
                e.preventDefault();
                if (rejectValue === "") {
                  window.alert("반려사유를 입력하지 않으셨습니다.");
                } else {
                  await changeState(
                    "reject",
                    waitEle.postDoDateId,
                    waitEle.id,
                    rejectValue
                  );
                }
              }}
            >
              <p>확인</p>
            </S.BMBtn>{" "}
          </S.BMrejectbox>
        ) : null}
      </S.BMBoxCont>
    );
  });
}

function ManageApproveBox({ approvepeople, changeState }) {
  return approvepeople.map((person) => {
    return (
      <S.BMperson key={person.id}>
        <p>{person.name}</p>
        <p>{person.birth}</p>
        <p>{person.gender}</p>
        <p>{person.phoneNum}</p>
        <p>{person.job}</p>

        {person.isAttend ? (
          <S.BMBtnWrapper>
            <p>확정</p>
            <S.BMBtn
              onClick={async (e) => {
                e.preventDefault();
                await changeState("notAttend", person.postDoDateId, person.id);
              }}
            >
              <p>불참</p>
            </S.BMBtn>
          </S.BMBtnWrapper>
        ) : (
          <S.BMBtnWrapper>
            <p>불참</p>
            <S.BMBtn
              onClick={async (e) => {
                e.preventDefault();
                await changeState("Attend", person.postDoDateId, person.id);
              }}
            >
              <p>확정</p>
            </S.BMBtn>
          </S.BMBtnWrapper>
        )}
      </S.BMperson>
    );
  });
}
