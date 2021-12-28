import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import {
  approveOneApi,
  cancelOneApi,
  getApproveListApi,
  getWaitListApi,
  rejectOneApi,
  setAttendApi,
} from "../../../../utils";
import Portal from "../../../Common/Modal/Portal";
import { CalendarButton } from "../../../Common";
import Presenter from "./presenter";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";
import { toast } from "react-toastify";

import * as S from "./style";

export default function BManageModal({ feedData, setModalSwitch }) {
  const [tab, setTab] = useState("대기자");
  const [userList, setUserList] = useState([]);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [approveUser, setApproveUser] = useState(false);
  const [secondAlert, setSecondAlert] = useState(false);

  const getList = useCallback(() => {
    if (tab === "대기자") {
      getWaitListApi(feedData.id, date)
        .then((res) => setUserList(res.data.data))
        .catch((err) => toast.error("데이터를 불러오지 못했습니다"));
    } else {
      getApproveListApi(feedData.id, date)
        .then((res) => setUserList(res.data.data))
        .catch((err) => toast.error("데이터를 불러오지 못했습니다"));
    }
  }, [date, tab, feedData]);

  const applyApprove = (postDoDateId, userId) => {
    approveOneApi(postDoDateId, userId)
      .then((res) => {
        setSecondAlert(true);
        getList();
      })
      .catch((err) =>
        toast.error("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
      );
  };

  const viewRejectInput = (e) => {
    var RejectInput = e.target.parentNode.parentNode.nextSibling;
    if (RejectInput.style.display === "none") {
      RejectInput.style.display = "flex";
    } else {
      RejectInput.style.display = "none";
    }
  };

  const [rejectAlert, setRejectAlert] = useState(false);
  const [rejectUserInfo, setRejectUserInfo] = useState();
  const [cancleUserInfo, setCancleUserInfo] = useState();
  const [reason, setReason] = useState([""]);
  const [cancleAlert, setCancleAlert] = useState(false);

  const cancleApprove = (postDoDateId, userId) => {
    if (cancleAlert) {
      cancelOneApi(postDoDateId, userId)
        .then((res) => {
          setCancleAlert(false);
          getList();
        })
        .catch((err) =>
          toast.error("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
        );
    }
  };

  const rejectApply = (postDoDateId, userId, comment) => {
    if (rejectAlert) {
      rejectOneApi(postDoDateId, userId, comment)
        .then((res) => {
          setRejectAlert(false);
          setReason(null);
          getList();
        })
        .catch((err) =>
          toast.error("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
        );
    }
  };
  const [askAttend, setAskAttend] = useState(false);
  const changeAttend = (postDoDateId, userId, status) => {
    setAttendApi(postDoDateId, userId, status ? false : true)
      .then((res) => {
        setSecondAlert(true);
        getList();
      })
      .catch((err) =>
        toast.error("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
      );
  };

  const rejectOn = (user, e) => {
    setRejectUserInfo(user);
    e.currentTarget.previousSibling.value = null;
    setRejectAlert(true);
  };

  const cancleOn = (user) => {
    setCancleUserInfo(user);
    setCancleAlert(true);
  };

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <Portal>
      <S.ModalBox>
        <S.ButtonTab>
          <button
            onClick={() => {
              setTab("대기자");
            }}
            disabled={tab === "대기자" && true}
          >
            대기자 명단
          </button>
          <button
            onClick={() => {
              setTab("확정자");
            }}
            disabled={tab === "확정자" && true}
          >
            확정자 명단
          </button>
        </S.ButtonTab>
        <S.ModalHeader>
          <S.CloseModalBtn onClick={() => setModalSwitch(false)}>
            <CloseIcon />
          </S.CloseModalBtn>
          <div>
            <p>{feedData.title}</p>
            <CalendarButton
              feedId={feedData.id}
              minDate={new Date(feedData.startDate)}
              maxDate={new Date(feedData.endDate)}
              currentDate={new Date(date)}
              setCurrentDate={setDate}
            />
          </div>
        </S.ModalHeader>
        <S.ModalContent>
          <Presenter
            tab={tab}
            date={date}
            userList={userList}
            applyApprove={applyApprove}
            cancleApprove={cancleApprove}
            viewRejectInput={viewRejectInput}
            rejectAlert={rejectAlert}
            setRejectAlert={setRejectAlert}
            setRejectUserInfo={setRejectUserInfo}
            rejectUserInfo={rejectUserInfo}
            reason={reason}
            setReason={setReason}
            cancleAlert={cancleAlert}
            setCancleAlert={setCancleAlert}
            setCancleUserInfo={setCancleUserInfo}
            cancleUserInfo={cancleUserInfo}
            rejectApply={rejectApply}
            changeAttend={changeAttend}
            rejectOn={rejectOn}
            cancleOn={cancleOn}
            approveUser={approveUser}
            setApproveUser={setApproveUser}
            secondAlert={secondAlert}
            setSecondAlert={setSecondAlert}
            setAskAttend={setAskAttend}
            askAttend={askAttend}
          />
        </S.ModalContent>
      </S.ModalBox>
    </Portal>
  );
}
