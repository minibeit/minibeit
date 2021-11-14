import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import {
  approveOneApi,
  cancelOneApi,
  feedDetailApi,
  getApproveListApi,
  getWaitListApi,
  rejectOneApi,
} from "../../../../utils";
import Portal from "../../../Common/Modal/Portal";
import Presenter from "./presenter";
import CloseIcon from "@mui/icons-material/Close";
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
        setDate(res.data.data.startDate);
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

  const applyApprove = (postDoDateId, userId) => {
    let value = window.confirm("해당 실험자의 실험 참여를 허락하시겠습니까?");
    if (value) {
      approveOneApi(postDoDateId, userId)
        .then((res) => {
          alert("해당 실험자의 실험 참여가 허락되었습니다");
          getList();
        })
        .catch((err) =>
          alert("정상적으로 실행되지 않았습니다. 다시 시도해주세요")
        );
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
  }

  const inputReason = (e) => {
    setReason(e.target.value);
  }
  const rejectApplyAlert = (user) => {
    setRejectUserInfo(user);
    setRejectAlert(true);
  };

  const RejectApply = (postDoDateId, userId, comment) => {
    if (rejectAlert) {
      rejectOneApi(postDoDateId, userId, comment)
        .then((res) => {
          setRejectAlert(false);
          setReason(null);
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
              <input
                type="date"
                id="start"
                name="date"
                defaultValue={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </S.ModalHeader>
          <S.ModalContent>
            <Presenter
              date={date}
              userList={userList}
              applyApprove={applyApprove}
              cancleApprove={cancleApprove}
              viewRejectInput={viewRejectInput}
              RejectApply={RejectApply}
              rejectAlert={rejectAlert}
              setRejectAlert={setRejectAlert}
              rejectApplyAlert={rejectApplyAlert}
              rejectUserInfo={rejectUserInfo}
              reason={reason}
              inputReason={inputReason}
              cancleAlert={cancleAlert} 
              setCancleAlert={setCancleAlert}
              cancleOn={cancleOn}
              cancleUserInfo={cancleUserInfo} 
              setCancleUserInfo={setCancleUserInfo}
            />
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
