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
  reason,
  setReason,
  cancleAlert,
  setCancleAlert,
  rejectApply,
  changeAttend,
  setApproveUser,
  approveUser,
  setSecondAlert,
  secondAlert,
  askAttend,
  setAskAttend,
  selectUser,
  setSelectUser,
}) {
  return (
    <S.UserListView>
      <S.ManageTable>
        <S.TableHeader>
          <tr>
            <td> </td>
            <td>실명</td>
            <td>생년월일</td>
            <td>성별</td>
            <td>연락처</td>
            <td>직업</td>
            <td>처리상태</td>
          </tr>
          <tr>
            <S.DateView colSpan={7}>
              {moment(date).format("YYYY.MM.DD")}
            </S.DateView>
          </tr>
        </S.TableHeader>
        {userList.map((time, i) => {
          return (
            <S.TableBody key={i}>
              {time.userInfoList.map((user, j) => {
                return (
                  <React.Fragment key={j}>
                    <S.TableRow>
                      <S.TimeView display={j}>
                        {j === 0 && `${time.startTime}-${time.endTime}`}
                      </S.TimeView>
                      <td>{user.name}</td>
                      <td>{user.birth}</td>
                      <td>{user.gender === "MALE" ? "남" : "여"}</td>
                      <td>{user.phoneNum}</td>
                      <td>{user.job}</td>
                      <td>
                        {tab === "대기자" ? (
                          <>
                            <S.Btn
                              disabled={user.status === "APPROVE"}
                              onClick={() => {
                                setSelectUser({
                                  postDoDateId: time.postDoDateId,
                                  userId: user.id,
                                });
                                setApproveUser(true);
                              }}
                            >
                              확정
                            </S.Btn>
                            <S.Btn
                              onClick={(e) => {
                                if (user.status === "APPROVE") {
                                  setSelectUser({
                                    postDoDateId: time.postDoDateId,
                                    userId: user.id,
                                  });
                                  setCancleAlert(true);
                                } else {
                                  setSelectUser({
                                    postDoDateId: time.postDoDateId,
                                    userName: user.name,
                                    userId: user.id,
                                    isAttend: user.isAttend,
                                  });
                                  viewRejectInput(e);
                                }
                              }}
                            >
                              {user.status === "APPROVE" ? "취소" : "반려"}
                            </S.Btn>
                          </>
                        ) : (
                          <>
                            <S.Btn disabled={true}>
                              {user.isAttend ? "참여" : "불참"}
                            </S.Btn>
                            <S.Btn
                              attend={user.isAttend}
                              onClick={() => {
                                setSelectUser({
                                  postDoDateId: time.postDoDateId,
                                  userId: user.id,
                                  isAttend: user.isAttend,
                                });
                                setAskAttend(true);
                              }}
                            >
                              {user.isAttend ? "불참" : "참여"}
                            </S.Btn>
                          </>
                        )}
                      </td>
                    </S.TableRow>
                    <tr style={{ display: "none" }}>
                      <S.RejectInput colSpan={7}>
                        <input
                          placeholder="반려사유를 작성해주세요."
                          onChange={(e) => setReason(e.target.value)}
                        />
                        <button
                          onClick={(e) => {
                            e.target.parentNode.parentNode.style.display =
                              "none";
                            setRejectAlert(true);
                          }}
                        >
                          확인
                        </button>
                      </S.RejectInput>
                    </tr>
                  </React.Fragment>
                );
              })}
            </S.TableBody>
          );
        })}
      </S.ManageTable>
      {approveUser && (
        <AskAppove
          setApproveUser={setApproveUser}
          applyApprove={applyApprove}
          time={selectUser.postDoDateId}
          id={selectUser.userId}
          setSecondAlert={setSecondAlert}
          secondAlert={secondAlert}
        />
      )}
      {askAttend && (
        <AskAttendance
          setAskAttend={setAskAttend}
          setSecondAlert={setSecondAlert}
          secondAlert={secondAlert}
          time={selectUser.postDoDateId}
          id={selectUser.userId}
          isAttend={selectUser.isAttend}
          changeAttend={changeAttend}
        />
      )}
      {cancleAlert && (
        <AskCancelConfirm
          cancleApprove={cancleApprove}
          setCancleAlert={setCancleAlert}
          postDoDateId={selectUser.postDoDateId}
          userId={selectUser.userId}
        />
      )}
      {rejectAlert && (
        <RejectApplicant
          setRejectAlert={setRejectAlert}
          rejectApply={rejectApply}
          userName={selectUser.userName}
          postDoDateId={selectUser.postDoDateId}
          userId={selectUser.userId}
          reason={reason}
        />
      )}
    </S.UserListView>
  );
}
