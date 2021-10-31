import React, { useEffect, useState } from "react";
import {
  getCancellistApi,
  getFinishlistApi,
  getJoinlistApi,
  getLikeListApi,
  getMyInfo,
} from "../../../utils";

export default function UserPage() {
  const [userData, setUserData] = useState();
  const [feedSwitch, setFeedSwitch] = useState("대기중");
  const [feedData, setFeedData] = useState([]);

  const changeFeedData = (status) => {
    switch (status) {
      case "대기중":
        getJoinlistApi(1, "WAIT").then((res) =>
          setFeedData(res.data.data.content)
        );
        break;
      case "확정":
        getJoinlistApi(1, "APPROVE").then((res) =>
          setFeedData(res.data.data.content)
        );
        break;
      case "완료":
        getFinishlistApi(1).then((res) => setFeedData(res.data.data.content));
        break;
      case "반려":
        getCancellistApi(1).then((res) => setFeedData(res.data.data.content));
        break;
      case "즐겨찾기":
        getLikeListApi(1).then((res) => setFeedData(res.data.data.content));
        break;
      default:
    }
  };

  useEffect(() => {
    getMyInfo().then((res) => {
      setUserData(res.data.data);
    });
  }, []);

  return (
    <>
      {userData && (
        <div>
          <div>이름 : {userData.name}</div>
          <div>닉네임 : {userData.nickname}</div>
          <div>성별 : {userData.gender === "MALE" ? "남자" : "여자"}</div>
          <div>생년월일 : {userData.birth}</div>
          <div>관심학교 : {userData.schoolName}</div>
          <div>직업 : {userData.job}</div>
          <div>전화번호 : {userData.phoneNum}</div>
        </div>
      )}
      <div>
        <button
          onClick={() => {
            setFeedSwitch("대기중");
            changeFeedData("대기중");
          }}
        >
          대기중 목록
        </button>
        <button
          onClick={() => {
            setFeedSwitch("확정");
            changeFeedData("확정");
          }}
        >
          확정된 목록
        </button>
        <button
          onClick={() => {
            setFeedSwitch("완료");
            changeFeedData("완료");
          }}
        >
          완료한 목록
        </button>
        <button
          onClick={() => {
            setFeedSwitch("반려");
            changeFeedData("반려");
          }}
        >
          반려된 목록
        </button>
        <button
          onClick={() => {
            setFeedSwitch("즐겨찾기");
            changeFeedData("즐겨찾기");
          }}
        >
          즐겨찾기 목록
        </button>
      </div>
      <div>
        {feedData.length === 0 ? (
          <div>{feedSwitch}</div>
        ) : (
          feedData.map((a) => (
            <div key={a.id}>
              <p>{a.title}</p>
              <p>{a.place}</p>
              <p>{a.payment}</p>
              <p>{a.recruitCondition}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
