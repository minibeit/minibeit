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
          setWaitlist(res.data);
        })
        .catch((err) => console.log(err));
    } else if (state === "APPROVE") {
      await getApproveListApi(postId, date)
        .then((res) => {
          setWaitlist(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [date, postId, state]);
  const handleState = async () => {
    if (state === "APPROVE") {
      setState("WAIT");
    } else if (state === "WAIT") {
      setState("APPROVE");
    }
  };
  const changeState = async (order, postdoDateId, userId, rejectValue) => {
    console.log(order, postdoDateId, userId, rejectValue);
    if (order === "approve") {
      await approveOneApi(postId, postdoDateId, userId)
        .then((res) => {
          window.alert("참여가 허락되었습니다.");
          getList();
        })
        .catch((err) => console.log(err));
    } else if (order === "cancel") {
      await cancelOneApi(postId, postdoDateId, userId)
        .then((res) => {
          window.alert("참여 허락이 취소되었습니다.");
          getList();
        })
        .catch((err) => console.log(err));
    } else if (order === "reject") {
      await rejectOneApi(postId, postdoDateId, userId, rejectValue)
        .then((res) => {
          window.alert("참여가 반려되었습니다.");
          getList();
        })
        .catch((err) => console.log(err));
    } else {
      const attend = order === "Attend" ? true : false;
      await setAttendApi(postId, postdoDateId, userId, attend)
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
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.ModalTopContent>
              <p>{title}</p>
              <S.BMDate
                type="date"
                id="start"
                name="date"
                value={date}
                onChange={onClick}
                min="2021-01-01"
                max="2021-12-31"
              ></S.BMDate>
            </S.ModalTopContent>
            <S.ModalSecondContent>
              {waitlist.map((timeBox) => {
                console.log(timeBox);
                return (
                  <S.BMTimeBox key={timeBox.postDoDateId}>
                    <hr />
                    <S.BMTime>
                      {timeBox.userInfoList[0].startTime}~
                      {timeBox.userInfoList[0].endTime}
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
            </S.ModalSecondContent>
            <S.BMBtn onClick={handleState}>
              {state === "WAIT" ? " 확정자 명단" : "대기자 명단 "}
            </S.BMBtn>
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
            <>
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
                확정
              </S.BMBtn>
              <S.BMBtn
                onClick={async (e) => {
                  e.preventDefault();
                  await rejectFunc(waitEle.id);
                }}
              >
                반려
              </S.BMBtn>
            </>
          ) : (
            <>
              <p>확정</p>
              <S.BMBtn
                onClick={async (e) => {
                  e.preventDefault();
                  await changeState("cancel", waitEle.postDoDateId, waitEle.id);
                }}
              >
                취소
              </S.BMBtn>
            </>
          )}
          {reject.state && reject.id === waitEle.id ? (
            <>
              <p>반려사유</p>
              <S.BMrejectInput value={rejectValue} onChange={onChange} />
              <S.BMBtn
                onClick={async (e) => {
                  e.preventDefault();
                  await changeState(
                    "reject",
                    waitEle.postDoDateId,
                    waitEle.id,
                    rejectValue
                  );
                }}
              >
                확인
              </S.BMBtn>{" "}
            </>
          ) : null}
        </S.BMperson>
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
          <>
            <p>확정</p>
            <S.BMBtn
              onClick={async (e) => {
                e.preventDefault();
                await changeState("notAttend", person.postDoDateId, person.id);
              }}
            >
              불참
            </S.BMBtn>
          </>
        ) : (
          <>
            <p>불참</p>
            <S.BMBtn
              onClick={async (e) => {
                e.preventDefault();
                await changeState("Attend", person.postDoDateId, person.id);
              }}
            >
              확정
            </S.BMBtn>
          </>
        )}
      </S.BMperson>
    );
  });
}
