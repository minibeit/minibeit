import React from "react";
import moment from "moment";
import * as S from "./style";
import RejectApplicant from "../../../Common/Alert/RejectApplicant";

export default function Presenter({
  date,
  userList,
  applyApprove,
  cancleApprove,
  viewRejectInput, 
  setRejectAlert, 
  rejectAlert,
  rejectApplyAlert,
  rejectUserInfo,
  RejectApply,
  reason,
  inputReason
}) {

  return (
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
        {userList.map((time) => {
          return (
            <S.DateInfoBox key={time.postDoDateId}>
              <div>
                {time.userInfoList[0].startTime}-{time.userInfoList[0].endTime}
              </div>
              <div>
                {time.userInfoList.map((user) => {
                  return (
                    <>
                      <S.UserInfoBox key={user.id}>
                        <div>{user.name}</div>
                        <div>{user.birth}</div>
                        <div>{user.gender === "MALE" ? "남" : "여"}</div>
                        <div>{user.phoneNum}</div>
                        <div>{user.job}</div>
                        {user.status === "WAIT" ? (
                          <div>
                            <button
                              onClick={() =>
                                applyApprove(time.postDoDateId, user.id)
                              }
                            >
                              확정
                            </button>
                            <button onClick={viewRejectInput} >반려</button>
                          </div>
                        ) : (
                          <div>
                            <button disabled={true}>확정</button>
                            <button
                              onClick={() =>
                                cancleApprove(time.postDoDateId, user.id)
                              }
                            >
                              취소
                            </button>
                          </div>
                        )}
                      </S.UserInfoBox>
                      <S.RejectInput style={{ display: "none" }}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                        <p>반려사유</p>
                        <div>
                          <input placeholder="반려사유를 작성해주세요" value={reason} onChange={inputReason}/>
                          <button onClick={()=>rejectApplyAlert(user)}>
                            확인
                          </button>
                        </div>
                      </S.RejectInput>
                      {rejectAlert && <RejectApplicant reason={reason} rejectUserInfo={rejectUserInfo} RejectApply={RejectApply} setRejectAlert={setRejectAlert} />}
                    </>
                  );
                })}
              </div>
            </S.DateInfoBox>
          );
        })}
      </div>
      
    </S.UserListView>
  );
}
