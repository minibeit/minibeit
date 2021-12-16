import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import {
  approveOneApi,
  cancelOneApi,
  feedDetailApi,
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

export default function BManageModal({ postId, setModalSwitch }) {
  const [tab, setTab] = useState("대기자");
  const [feedData, setFeedData] = useState({});
  const [userList, setUserList] = useState([]);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const getFeedData = useCallback(() => {
    feedDetailApi(postId, true)
      .then((res) => {
        setFeedData(res.data.data);
      })
      .catch((err) => toast.error("데이터를 불러오지 못했습니다"));
  }, [postId]);

  const getList = useCallback(() => {
    if (tab === "대기자") {
      getWaitListApi(postId, date)
        .then((res) => setUserList(res.data.data))
        .catch((err) => toast.error("데이터를 불러오지 못했습니다"));
    } else {
      getApproveListApi(postId, date)
        .then((res) => setUserList(res.data.data))
        .catch((err) => toast.error("데이터를 불러오지 못했습니다"));
    }
  }, [date, postId, tab]);

  const applyApprove = (postDoDateId, userId) => {
    let value = window.confirm("해당 실험자의 실험 참여를 허락하시겠습니까?");
    if (value) {
      approveOneApi(postDoDateId, userId)
        .then((res) => {
          toast.info("해당 실험자의 실험 참여가 허락되었습니다");
          getList();
        })
        .catch((err) =>
          toast.error("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
        );
    }
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

  const changeAttend = (postDoDateId, userId, status) => {
    let value = window.confirm(
      `해당 실험자를 ${status ? "'불참'" : "'참여'"} 처리하시겠습니까?`
    );
    if (value) {
      setAttendApi(postDoDateId, userId, status ? false : true)
        .then((res) => {
          toast.info(
            `해당 실험자의 실험 참여가 ${
              status ? "'불참'" : "'참여'"
            } 처리되었습니다`
          );
          getList();
        })
        .catch((err) =>
          toast.error("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
        );
    }
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
    getFeedData();
  }, [getFeedData]);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <Portal>
      <S.ModalBackground
        onClick={(e) => e.target === e.currentTarget && setModalSwitch(false)}
      >
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
            />
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
