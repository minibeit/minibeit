import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
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
import Presenter from "./presenter";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import * as S from "./style";
import { sendMailApi } from "../../../../utils/mailApi";

export default function BManageModal({ postId, setModalSwitch }) {
  const [tab, setTab] = useState("대기자");
  const [feedData, setFeedData] = useState({});
  const [userList, setUserList] = useState([]);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [calendarView, setCalendarView] = useState(false);

  const getFeedData = useCallback(() => {
    feedDetailApi(postId, true)
      .then((res) => {
        setFeedData(res.data.data);
      })
      .catch((err) => alert("데이터를 불러오지 못했습니다"));
  }, [postId]);

  const getList = useCallback(() => {
    if (tab === "대기자") {
      getWaitListApi(postId, date)
        .then((res) => setUserList(res.data.data))
        .catch((err) => alert("데이터를 불러오지 못했습니다"));
    } else {
      getApproveListApi(postId, date)
        .then((res) => setUserList(res.data.data))
        .catch((err) => alert("데이터를 불러오지 못했습니다"));
    }
  }, [date, postId, tab]);

  const applyApprove = (postDoDateId, userId, userEmail) => {
    let value = window.confirm("해당 실험자의 실험 참여를 허락하시겠습니까?");
    if (value) {
      approveOneApi(postDoDateId, userId)
        .then((res) => {
          alert("해당 실험자의 실험 참여가 허락되었습니다");
          getList();
        })
        .then(() => {
          sendMailApi("APPROVE", [userEmail]).then().catch();
        })
        .catch((err) =>
          alert("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
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

  const [rejectAlert,setRejectAlert] =useState(false);
  const [rejectUserInfo, setRejectUserInfo] = useState();
  const [cancleUserInfo, setCancleUserInfo] = useState();
  const [reason, setReason] = useState(['']);
  const [cancleAlert, setCancleAlert] = useState(false);

  const cancleOn = (user) => {
    setCancleUserInfo(user);
    setCancleAlert(true);
  };

  const cancleApprove = (postDoDateId, userId, userEmail) => {
    if (cancleAlert) {
      cancelOneApi(postDoDateId, userId)
        .then((res) => {
          setCancleAlert(false);
          getList();
        })
        .then(() => {
          sendMailApi("APPROVECANCEL", [userEmail]).then().catch();
        })
        .catch((err) =>
          alert("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
        );
    }
  };

  const rejectApplyAlert = (user) => {
    setRejectUserInfo(user);
    setRejectAlert(true);
  };

  const rejectApply = (postDoDateId, userId, comment, userEmail) => {
    if (rejectAlert) {
      rejectOneApi(postDoDateId, userId, comment)
        .then((res) => {
          setRejectAlert(false);
          setReason(null);
          getList();
        })
        .then(() => {
          sendMailApi("REJECT", [userEmail]).then().catch();
        })
        .catch((err) =>
          alert("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
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
          alert(
            `해당 실험자의 실험 참여가 ${
              status ? "'불참'" : "'참여'"
            } 처리되었습니다`
          );
          getList();
        })
        .catch((err) =>
          alert("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
        );
    }
  };

  useEffect(() => {
    getFeedData();
  }, [getFeedData]);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <Portal>
      <S.ModalBackground>
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
            <p>{feedData.title}</p>
            <div>
              <S.CloseModalBtn onClick={() => setModalSwitch(false)}>
                <CloseIcon />
              </S.CloseModalBtn>
              <S.CalendarBtn onClick={() => setCalendarView(!calendarView)}>
                <CalendarTodayIcon />
              </S.CalendarBtn>
              {calendarView && (
                <S.CalendarWrapper>
                  <Calendar
                    calendarType="US"
                    defaultValue={new Date()}
                    minDate={new Date(feedData.startDate)}
                    maxDate={new Date(feedData.endDate)}
                    onClickDay={(date) => {
                      setDate(moment(date).format("YYYY-MM-DD"));
                      setCalendarView(false);
                    }}
                    minDetail="month"
                    next2Label={null}
                    prev2Label={null}
                    showNeighboringMonth={false}
                  />
                </S.CalendarWrapper>
              )}
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
              rejectApplyAlert={rejectApplyAlert}
              rejectUserInfo={rejectUserInfo}
              reason={reason}
              setReason={setReason}
              cancleAlert={cancleAlert} 
              setCancleAlert={setCancleAlert}
              cancleOn={cancleOn}
              cancleUserInfo={cancleUserInfo} 
              rejectApply={rejectApply}
              changeAttend={changeAttend}
            />
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
