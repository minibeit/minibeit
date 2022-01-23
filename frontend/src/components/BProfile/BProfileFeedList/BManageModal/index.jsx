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
import toast from "react-hot-toast";

import * as S from "./style";

export default function BManageModal({ feedData, setModalSwitch }) {
  const [tab, setTab] = useState("대기자");
  const [userList, setUserList] = useState([]);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [approveUser, setApproveUser] = useState(false);
  const [secondAlert, setSecondAlert] = useState(false);
  const [selectUser, setSelectUser] = useState({
    postDoDateId: null,
    userName: null,
    userId: null,
    isAttend: null,
  });
  const [rejectAlert, setRejectAlert] = useState(false);
  const [reason, setReason] = useState("");
  const [cancleAlert, setCancleAlert] = useState(false);

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
      .catch((err) => {
        if (
          err.response.data.error.info ===
          "지원자의 확정된 모집중 시간이 겹치는 모집이 있습니다."
        ) {
          toast.error("err.response.data.error.info");
        } else {
          toast.error("정상적으로 실행되지 않았습니다. 다시 시도해주세요");
        }
      });
  };

  const viewRejectInput = (e) => {
    var RejectInput = e.target.parentNode.parentNode.nextSibling;
    if (RejectInput.style.display === "none") {
      RejectInput.style.display = "table-row";
    } else {
      RejectInput.style.display = "none";
    }
  };

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
          setReason("");
          setRejectAlert(false);
          getList();
          toast.success("반려 처리되었습니다");
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

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <Portal>
      <S.ModalBox>
        <S.TabBtn
          onClick={() => setTab("대기자")}
          disabled={tab === "대기자" && true}
        >
          대기자 명단
        </S.TabBtn>
        <S.TabBtn
          onClick={() => setTab("확정자")}
          disabled={tab === "확정자" && true}
        >
          확정자 명단
        </S.TabBtn>
        <div>
          <S.ModalHeader>
            <S.CloseModalBtn>
              <p>참여 일정이 있는 날짜를 달력에서 선택해주세요.</p>
              <CloseIcon onClick={() => setModalSwitch(false)} />
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
              setRejectAlert={setRejectAlert}
              rejectAlert={rejectAlert}
              reason={reason}
              setReason={setReason}
              cancleAlert={cancleAlert}
              setCancleAlert={setCancleAlert}
              rejectApply={rejectApply}
              changeAttend={changeAttend}
              setApproveUser={setApproveUser}
              approveUser={approveUser}
              setSecondAlert={setSecondAlert}
              secondAlert={secondAlert}
              askAttend={askAttend}
              setAskAttend={setAskAttend}
              selectUser={selectUser}
              setSelectUser={setSelectUser}
            />
          </S.ModalContent>
        </div>
      </S.ModalBox>
    </Portal>
  );
}
