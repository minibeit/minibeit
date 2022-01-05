import React from "react";
import moment from "moment";
import * as S from "./style";
import RejectApplicant from "../../../Common/Alert/RejectApplicant";
import AskCancelConfirm from "../../../Common/Alert/AskCancelConfirm";
import AskAppove from "../../../Common/Alert/AskApprove";
import AskAttendance from "../../../Common/Alert/AskAttendance";

export default function Presenter({
  tab,
  date,
  userList,
  applyApprove,
  cancleApprove,
  viewRejectInput,
  setRejectAlert,
  rejectAlert,
  rejectOn,
  rejectUserInfo,
  reason,
  setReason,
  cancleAlert,
  setCancleAlert,
  cancleUserInfo,
  rejectApply,
  changeAttend,
  cancleOn,
  setApproveUser,
  approveUser,
  setSecondAlert,
  secondAlert,
  askAttend,
  setAskAttend,
}) {
  return (
    <S.UserListView>
      <div>
        <div>실명</div>
        <div>생년월일</div>
        <div>성별</div>
        <div>연락처</div>
        <div>직업</div>
        <div>처리상태</div>
      </div>
      <div>
        <div>{moment(date).format("YYYY.MM.DD")}</div>
        {userList.map((time, i) => {
          return (
            <S.DataNavBar key={i}>
              <S.DateInfoBox>
                <div>
                  {time.startTime}-{time.endTime}
                </div>
                <div>
                  {time.userInfoList.map((user, j) => {
                    return (
                      <div key={j}>
                        <S.UserInfoBox>
                          <div>
                            <div>{user.name}</div>
                            <div>{user.birth}</div>
                            <div>{user.gender === "MALE" ? "남" : "여"}</div>
                            <div>{user.phoneNum}</div>
                            <div>{user.job}</div>
                          </div>
                          {tab === "대기자" ? (
                            user.status === "WAIT" ? (
                              <S.ButtonBox>
                                <S.Btn onClick={() => setApproveUser(true)}>
                                  확정
                                </S.Btn>
                                <S.Btn onClick={viewRejectInput}>반려</S.Btn>
                              </S.ButtonBox>
                            ) : (
                              <S.ButtonBox>
                                <S.Btn disabled={true}>확정</S.Btn>
                                <S.Btn onClick={() => cancleOn(user)}>
                                  취소
                                </S.Btn>
                                {cancleAlert && (
                                  <AskCancelConfirm
                                    cancleApprove={cancleApprove}
                                    setCancleAlert={setCancleAlert}
                                    postDoDateId={time.postDoDateId}
                                    userId={user.id}
                                  />
                                )}
                              </S.ButtonBox>
                            )
                          ) : (
                            <S.ButtonBox>
                              <S.Btn disabled={true}>
                                {user.isAttend ? "참여" : "불참"}
                              </S.Btn>
                              <S.Btn
                                attend={user.isAttend}
                                onClick={() => setAskAttend(true)}
                              >
                                {user.isAttend ? "불참" : "참여"}
                              </S.Btn>
                            </S.ButtonBox>
                          )}
                        </S.UserInfoBox>
                        <S.RejectInput style={{ display: "none" }}>
                          <input
                            placeholder="반려사유를 작성해주세요"
                            onChange={(e) => setReason(e.target.value)}
                          />
                          <button onClick={(e) => rejectOn(user, e)}>
                            확인
                          </button>
                          {approveUser && (
                            <AskAppove
                              setApproveUser={setApproveUser}
                              applyApprove={applyApprove}
                              time={time.postDoDateId}
                              id={user.id}
                              setSecondAlert={setSecondAlert}
                              secondAlert={secondAlert}
                            />
                          )}
                          {askAttend && (
                            <AskAttendance
                              setAskAttend={setAskAttend}
                              setSecondAlert={setSecondAlert}
                              secondAlert={secondAlert}
                              time={time.postDoDateId}
                              id={user.id}
                              isAttend={user.isAttend}
                              changeAttend={changeAttend}
                            />
                          )}

                          {rejectAlert && (
                            <RejectApplicant
                              setRejectAlert={setRejectAlert}
                              rejectApply={rejectApply}
                              rejectUserInfo={rejectUserInfo}
                              reason={reason}
                            />
                          )}
                        </S.RejectInput>
                      </div>
                    );
                  })}
                </div>
              </S.DateInfoBox>
            </S.DataNavBar>
          );
        })}
      </div>
    </S.UserListView>
  );
}
