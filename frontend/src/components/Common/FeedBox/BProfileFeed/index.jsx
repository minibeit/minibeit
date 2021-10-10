import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { changeState } from "../../../../recoil/changeState";
import {
  feedDeleteApi,
  reviewOneReadApi,
  stateCompleteApi,
} from "../../../../utils";
import BManageModal from "../../../BProfile/BManageModal";
import ReviewModal from "../../ReviewModal";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import * as S from "../style";
import BCompleteModal from "../../../BProfile/BCompleteModal";

export default function BProfileFeed({ state, feedInfo, getMakelist }) {
  return (
    <>
      <S.FeedTag>
        <p>
          {state === "new"
            ? "모집중"
            : state === "finish"
            ? "모집완료"
            : "후기"}
        </p>
      </S.FeedTag>
      <S.FeedCont>
        {state === "new" ? (
          <NewFeedBlock feedInfo={feedInfo} getMakelist={getMakelist} />
        ) : state === "review" ? (
          <ReviewFeedBlock feedInfo={feedInfo} />
        ) : state === "finish" ? (
          <FinishFeedBlock feedInfo={feedInfo} getMakelist={getMakelist} />
        ) : null}
      </S.FeedCont>
    </>
  );
}
function NewFeedBlock({ feedInfo, getMakelist }) {
  const [modalSwitch, setModalSwitch] = useState(false);
  const [modalSwitch2, setModalSwitch2] = useState(false);
  const postId = feedInfo.id;
  const [, setChange] = useRecoilState(changeState);
  const stateComplete = async (rejectComment) => {
    await stateCompleteApi(postId, rejectComment)
      .then(async () => {
        window.alert(feedInfo.title + "이 모집완료 되었습니다");
        await getMakelist();
        setChange(1);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <S.FeedTitle>
        <p>실험명</p>
        <Link to={`/apply/${feedInfo.id}`}>
          <p>{feedInfo.title}</p>
        </Link>
      </S.FeedTitle>
      <S.FeedContent>
        {modalSwitch ? (
          <BManageModal
            postId={postId}
            title={feedInfo.title}
            setModalSwitch={setModalSwitch}
          />
        ) : null}
        {modalSwitch2 ? (
          <BCompleteModal
            stateComplete={stateComplete}
            setModalSwitch2={setModalSwitch2}
          />
        ) : null}
        <S.FeedBookmark>
          <StarBorderIcon />
          <p>{feedInfo.likes}</p>
        </S.FeedBookmark>
        <S.BtnCont>
          <S.FeedBtn
            onClick={(e) => {
              e.preventDefault();
              setModalSwitch(true);
            }}
          >
            <p>참여 관리 하기</p>
          </S.FeedBtn>
          <S.FeedBtn
            onClick={async (e) => {
              e.preventDefault();
              setModalSwitch2(true);
            }}
          >
            <p>모집완료</p>
          </S.FeedBtn>
        </S.BtnCont>
      </S.FeedContent>
    </>
  );
}
function ReviewFeedBlock({ feedInfo }) {
  const [modalSwitch, setModalSwitch] = useState(false);
  const [postInfo, setPostInfo] = useState({});
  const readReview = async (businessProfileReviewId) => {
    await reviewOneReadApi(businessProfileReviewId)
      .then(async (res) => setPostInfo(res.data))
      .then(() => setModalSwitch(true))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Link to={`/apply/${feedInfo.id}`}>
        <S.FeedTitle>{feedInfo.postTitle}</S.FeedTitle>
      </Link>
      <S.FeedContent>
        <S.FeedDateNum>
          <p>실험날짜</p>
          <p> {feedInfo.doDate} /</p>
          <p>실험실 시간 </p>
          <p>
            {" "}
            {feedInfo.startTime}~{feedInfo.endTime}
          </p>
        </S.FeedDateNum>
        <S.Review>
          {" "}
          <p>후기</p>
          <p> {feedInfo.content} </p>
        </S.Review>
        <S.FeedBtn
          onClick={async () => {
            await readReview(feedInfo.id);
          }}
        >
          <p>더보기</p>
        </S.FeedBtn>
      </S.FeedContent>

      {modalSwitch ? (
        <ReviewModal
          setModalSwitch={setModalSwitch}
          state="READ"
          postInfo={postInfo}
        />
      ) : null}
    </>
  );
}

function FinishFeedBlock({ feedInfo, getMakelist }) {
  const [change] = useRecoilState(changeState);
  if (change === 1) {
    getMakelist();
  }
  const postDelete = async (postId) => {
    await feedDeleteApi(postId)
      .then(() => {
        window.alert(feedInfo.title + "이 삭제되었습니다.");
        getMakelist();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <S.FeedTitle>
        <p>실험명</p>
        <Link to={`/apply/${feedInfo.id}`}>
          <p>{feedInfo.title}</p>
        </Link>
      </S.FeedTitle>
      <S.FeedContent>
        <S.FeedBookmark>
          <StarBorderIcon />
          <p>{feedInfo.likes}</p>
        </S.FeedBookmark>
        <S.BtnCont>
          <S.FeedBtn
            onClick={async (e) => {
              e.preventDefault();
              await postDelete(feedInfo.id);
            }}
          >
            <p>삭제하기</p>
          </S.FeedBtn>
        </S.BtnCont>
      </S.FeedContent>
    </>
  );
}
