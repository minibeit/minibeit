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
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./style";

export default function BManageModal({ title, postId, setModalSwitch }) {
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

  // const changeState = async (order, postdoDateId, userId, rejectValue) => {
  //   if (order === "approve") {
  //     await approveOneApi(postdoDateId, userId)
  //       .then((res) => {
  //         window.alert("참여가 허락되었습니다.");
  //         getList();
  //       })
  //       .catch((err) => console.log(err));
  //   } else if (order === "cancel") {
  //     await cancelOneApi(postdoDateId, userId)
  //       .then((res) => {
  //         window.alert("참여 허락이 취소되었습니다.");
  //         getList();
  //       })
  //       .catch((err) => console.log(err));
  //   } else if (order === "reject") {
  //     await rejectOneApi(postdoDateId, userId, rejectValue)
  //       .then((res) => {
  //         window.alert("참여가 반려되었습니다.");
  //         getList();
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     const attend = order === "Attend" ? true : false;
  //     await setAttendApi(postdoDateId, userId, attend)
  //       .then((res) => {
  //         window.alert("참여여부가 변경되었습니다");
  //         getList();
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

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
              ></input>
            </div>
          </S.ModalHeader>
          <S.ModalContent>
            <S.UserListView>
              <S.DataNavBar>
                <div>{moment(date).format("YYYY.MM.DD")}</div>
                <div>
                  <S.UserInfoBox>
                    <div>실명</div>
                    <div>생년월일</div>
                    <div>성별</div>
                    <div>연락처</div>
                    <div>직업</div>
                    <div>처리상태</div>
                  </S.UserInfoBox>
                </div>
              </S.DataNavBar>
              <div>
                {userList.map((time, i) => {
                  return (
                    <S.DateInfoBox key={time.postDoDateId}>
                      <div>
                        {time.userInfoList[0].startTime}-
                        {time.userInfoList[0].endTime}
                      </div>
                      <div>
                        {time.userInfoList.map((user) => {
                          return (
                            <S.UserInfoBox>
                              <div>{user.name}</div>
                              <div>{user.birth}</div>
                              <div>{user.gender === "MALE" ? "남" : "여"}</div>
                              <div>{user.phoneNum}</div>
                              <div>{user.job}</div>
                              <div>
                                <button>버튼</button>
                                <button>버튼</button>
                              </div>
                            </S.UserInfoBox>
                          );
                        })}
                      </div>
                    </S.DateInfoBox>
                  );
                })}
              </div>
            </S.UserListView>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
