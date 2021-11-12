import React, { useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";

import { feedDeleteApi } from "../../../../utils";
import FeedCloseModal from "../FeedCloseModal";
import BManageModal from "../BManageModal";

import * as S from "../../style";

export default function FeedBox({ status, data, changeFeedData }) {
  const [manageModal, setManageModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const deleteFeed = async (id) => {
    await feedDeleteApi(id)
      .then(() => {
        alert("게시물이 삭제되었습니다.");
        changeFeedData("완료된 모집공고");
      })
      .catch(() => alert("삭제할 수 없는 게시물입니다"));
  };

  return (
    <>
      <S.FeedLabel>
        {status === "생성한 모집공고" && "모집중"}
        {status === "완료된 모집공고" && "모집완료"}
        {status === "후기 모아보기" && "???"}
      </S.FeedLabel>
      <S.FeedBox>
        <S.FeedTitleBox>
          <p>게시글 제목</p>
          <Link to={`/apply/${data.id}`}>
            <p>{data.title}</p>
          </Link>
        </S.FeedTitleBox>
        <S.FeedContentBox>
          {status === "생성한 모집공고" && (
            <>
              <S.FeedInfo>
                <div>
                  <StarBorderIcon />
                  {data.likes}
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button onClick={() => setManageModal(true)}>
                  참여자 관리
                </button>
                {manageModal && (
                  <BManageModal
                    title={data.title}
                    postId={data.id}
                    setModalSwitch={setManageModal}
                  />
                )}
                <button onClick={() => setCloseModal(true)}>모집종료</button>
                {closeModal && (
                  <FeedCloseModal
                    postId={data.id}
                    changeFeedData={changeFeedData}
                    setModalSwitch={setCloseModal}
                  />
                )}
              </S.FeedButton>
            </>
          )}
          {status === "완료된 모집공고" && (
            <>
              <S.FeedInfo>
                <div>
                  <StarBorderIcon />
                  {data.likes}
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button onClick={() => deleteFeed(data.id)}>일정종료</button>
              </S.FeedButton>
            </>
          )}
          {status === "후기 모아보기" && (
            <>
              <S.FeedInfo>
                <div>
                  <p>후기 사라지는 거 보고 바꿀 예정</p>
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button>더보기</button>
              </S.FeedButton>
            </>
          )}
        </S.FeedContentBox>
      </S.FeedBox>
    </>
  );
}
