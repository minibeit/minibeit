import React from "react";
import moment from "moment";
import * as S from "./style";
import RejectApplicant from "../../../Common/Alert/RejectApplicant";
import AskCancelConfirm from "../../../Common/Alert/AskCancelConfirm";

export default function Presenter({
  tab,
  date,
  userList,
  applyApprove,
  cancleApprove,
  viewRejectInput, 
  setRejectAlert, 
  rejectAlert,
  rejectApplyAlert,
  rejectUserInfo,
  reason,
  setReason,
  cancleAlert,
  setCancleAlert,
  cancleOn,
  cancleUserInfo, 
  rejectApply,
  changeAttend,
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
      {userList.map((time, i) => {
        return (
          <S.DataNavBar key={i}>
            <S.DateInfoBox>
              <div>
                {time.userInfoList[0].startTime}-{time.userInfoList[0].endTime}
              </div>
              {time.userInfoList.map((user, j) => {
                return (
                  <div key={j}>
                    <S.UserInfoBox>
                      <div>{user.name}</div>
                      <div>{user.birth}</div>
                      <div>{user.gender === "MALE" ? "남" : "여"}</div>
                      <div>{user.phoneNum}</div>
                      <div>{user.job}</div>
                      {tab === "대기자" ? (
                        user.status === "WAIT" ? (
                          <S.ButtonBox>
                            <S.Btn
                              onClick={() =>
                                applyApprove(
                                  time.postDoDateId,
                                  user.id,
                                  user.email
                                )
                              }
                            >
                              확정
                            </S.Btn>
                            <S.Btn onClick={viewRejectInput}>반려</S.Btn>
                          </S.ButtonBox>
                        ) : (
                          <S.ButtonBox>
                            <S.Btn disabled={true}>확정</S.Btn>
                            <S.Btn
                              onClick={()=>cancleOn(user)}>
                              취소
                            </S.Btn>
                            {cancleAlert && <AskCancelConfirm cancleApprove={cancleApprove} setCancleAlert={setCancleAlert} cancleUserInfo={cancleUserInfo}/>}
                          </S.ButtonBox>
                        )
                      ) : (
                        <S.ButtonBox>
                          <S.Btn disabled={true}>
                            {user.isAttend ? "참여" : "불참"}
                          </S.Btn>
                          <S.Btn
                            attend={user.isAttend}
                            onClick={(e) => {
                              changeAttend(
                                time.postDoDateId,
                                user.id,
                                user.isAttend
                              );
                            }}
                          >
                            {user.isAttend ? "불참" : "참여"}
                          </S.Btn>
                        </S.ButtonBox>
                      )}
                    </S.UserInfoBox>
                    <S.RejectInput style={{ display: "none" }}>
                      <p>반려사유</p>
                      <div>
                        <input placeholder="반려사유를 작성해주세요" value={reason} onChange={(e)=>setReason(e.target.value)}/>
                        <button
                          onClick={()=>rejectApplyAlert(user)} >
                          확인
                        </button>
                      </div>
                      {rejectAlert && <RejectApplicant setRejectAlert={setRejectAlert} rejectApply={rejectApply} rejectUserInfo={rejectUserInfo} reason={reason}/>}
                    </S.RejectInput>
                  </div>
                  
                );
              })
              }
            </S.DateInfoBox>
          </S.DataNavBar>
        );
      })}

    </S.UserListView>
  );
}
