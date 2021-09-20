import React, { useState } from "react";
import PropTypes, { shape } from "prop-types";
import { PVImg, SchoolSearch } from "../../Common";
import { handleCompressImg } from "../../../utils/imgCompress";
import Portal from "../../Common/Modal/Portal";
import ProgressBar from "../../Common/Progressbar";

import { useRecoilState, useRecoilValue } from "recoil";
import { signupState } from "../../../recoil/signupState";
import { nickCheckApi } from "../../../utils/auth";
import * as S from "../style";

PSignupInfoForm.propTypes = {
  schoollist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  signupHandler: PropTypes.func.isRequired,
};

function PSignupInfoForm({ signupHandler }) {
  // window.addEventListener("beforeunload", function (e) {
  //   let confirmationMessage = "정말 닫으시겠습니까?";
  //   e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
  //   return confirmationMessage; // Gecko, WebKit, Chrome < 34
  // });
  const [msg, setMsg] = useState("다음");
  const [nick, setNick] = useState("notyet");
  const school = useRecoilValue(signupState);
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    gender: "",
    phoneNum: "",
    job: "",
    year: "",
    month: "",
    day: "",
    schoolId: "",
  });
  const [index, setIndex] = useState(0);
  const [img, setImg] = useState();
  const { name, nickname, phoneNum, gender, job, year, month, day } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleJob = async (jobName) => {
    console.log(jobName);
    setInputs({ ...inputs, job: jobName });
  };
  const [item, setitem] = useState({ bgcolor: "#6a1b9a", completed: 33.3 });
  const fileChange = (e) => {
    handleCompressImg(e.target.files[0]).then((res) => setImg(res));
  };
  const imgDel = () => {
    setImg(undefined);
  };
  const nickCheck = async () => {
    await nickCheckApi(nickname)
      .then(() => setNick(true))
      .catch((err) => setNick(false));
    setImg(undefined);
  };
  const singupInfoFunc = (e) => {
    console.log(index);
    if (index <= 1) {
      setIndex(index + 1);
      setitem({ bgcolor: "#6a1b9a", completed: ((index + 2) / 3) * 100 });
    }
    if (index === 1) {
      setMsg("회원가입");
    } else if (index === 2) {
      e.preventDefault();
      let new_m = month;
      let new_d = day;
      if (month < 10) {
        new_m = "0" + month;
      }
      if (day < 10) {
        new_d = "0" + day;
      }
      const birth = year + "-" + new_m + "-" + new_d;
      const inputs2 = {
        name: name,
        nickname: nickname,
        gender: gender,
        phoneNum: phoneNum,
        job: job,
        birth: birth,
        schoolId: school.schoolId,
      };
      signupHandler(inputs2, img);
    }
    console.log(index);
  };
  function range(start, end) {
    let arr = [];
    let length = end - start;
    for (var i = 0; i <= length; i++) {
      arr[i] = start;
      start++;
    }
    return arr;
  }

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.SIindex>{index + 1}</S.SIindex>
            <S.SIheader>
              {index === 0
                ? "프로필 설정하기"
                : index === 1
                ? "관심학교 설정하기"
                : index === 2
                ? "현재 직업 설정하기"
                : null}
            </S.SIheader>
          </S.ModalHeader>
          <S.ModalPro>
            <ProgressBar bgcolor={item.bgcolor} completed={item.completed} />
          </S.ModalPro>
          <S.SITitle>
            {" "}
            {index === 0
              ? "반갑습니다! 간단한 프로필을 작성해 주세요"
              : index === 1
              ? "주변에 위치한 관심있는 학교를 선택해 주세요"
              : index === 2
              ? "현재 직업을 설정해 주세요"
              : null}
          </S.SITitle>
          <S.ModalContent>
            <S.FormsignupContainer>
              {index === 0 ? (
                <>
                  <S.SICont1_2>
                    <S.SILabel>
                      프로필 사진{" "}
                      <S.ImgBox>
                        {img ? (
                          <PVImg img={img} />
                        ) : (
                          <S.Img src="/기본프로필.png" />
                        )}
                      </S.ImgBox>
                      <S.ImgDel onClick={imgDel}>기본이미지로 변경</S.ImgDel>
                      <S.SignupInput
                        name="img"
                        type="file"
                        onChange={fileChange}
                      />
                    </S.SILabel>
                  </S.SICont1_2>
                  <S.SICont1_1>
                    <S.SILabel>
                      이름
                      <S.SignupInput
                        value={name}
                        name="name"
                        type="text"
                        placeholder="이름"
                        onChange={onChange}
                      />
                    </S.SILabel>
                    <S.SILabel>
                      닉네임
                      <S.SignupInput
                        value={nickname}
                        name="nickname"
                        type="text"
                        placeholder="닉네임"
                        onChange={onChange}
                      />
                    </S.SILabel>
                    <S.SignupNickBtn onClick={nickCheck}>확인</S.SignupNickBtn>
                    {nick === true ? (
                      <S.SignupMSG color="blue">
                        사용가능한 닉네임 입니다
                      </S.SignupMSG>
                    ) : nick === false ? (
                      <S.SignupMSG color="red">닉네임이 중복됩니다</S.SignupMSG>
                    ) : null}
                    <S.SILabel>
                      성별
                      <S.SignupSelect
                        onChange={onChange}
                        defaultValue={"DEFAULT"}
                        name="gender"
                      >
                        <option value="DEFAULT" disabled>
                          성별
                        </option>
                        <option value="MALE" key={0}>
                          남자
                        </option>
                        <option value="FEMALE" key={1}>
                          여자
                        </option>
                      </S.SignupSelect>
                    </S.SILabel>
                    <S.SILabel>
                      생년월일
                      <S.SignupSelect
                        name="year"
                        onChange={onChange}
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" disabled>
                          년
                        </option>
                        {range(1920, 2021).map((year) => (
                          <option value={year} key={year - 1919}>
                            {year}
                          </option>
                        ))}
                      </S.SignupSelect>
                      <S.SignupSelect
                        name="month"
                        onChange={onChange}
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" disabled>
                          월
                        </option>
                        {range(1, 12).map((month) => (
                          <option value={month} key={month - 1919}>
                            {month}
                          </option>
                        ))}
                      </S.SignupSelect>
                      <S.SignupSelect
                        name="day"
                        onChange={onChange}
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" disabled>
                          일
                        </option>
                        {range(1, 31).map((day) => (
                          <option value={day} key={day - 1919}>
                            {day}
                          </option>
                        ))}
                      </S.SignupSelect>
                    </S.SILabel>
                    <S.SILabel>
                      전화번호
                      <S.SignupInput
                        value={phoneNum}
                        name="phoneNum"
                        type="text"
                        placeholder="전화번호"
                        onChange={onChange}
                      />
                    </S.SILabel>
                  </S.SICont1_1>
                </>
              ) : index === 1 ? (
                <>
                  <SchoolSearch use="Signup" />
                </>
              ) : index === 2 ? (
                <JobGrid handleJob={handleJob} />
              ) : null}
              <S.SignupButton type="submit" onClick={singupInfoFunc}>
                {msg}
              </S.SignupButton>
            </S.FormsignupContainer>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
export default PSignupInfoForm;

function JobGrid({ handleJob }) {
  const jobList = [
    {
      id: 1,
      name: "학생",
      emoji: "🎓",
    },
    {
      id: 2,
      name: "경영/사무",
      emoji: "📔",
    },
    {
      id: 3,
      name: "마케팅",
      emoji: "🛍",
    },
    {
      id: 4,
      name: "IT/인터넷",
      emoji: "🖥",
    },
    {
      id: 5,
      name: "디자인",
      emoji: "🎨",
    },
    {
      id: 6,
      name: "무역",
      emoji: "⛴",
    },
    {
      id: 7,
      name: "유통",
      emoji: "🚛",
    },
    {
      id: 8,
      name: "영업",
      emoji: "💼",
    },
    {
      id: 9,
      name: "서비스",
      emoji: "🖥",
    },
    {
      id: 10,
      name: "교육",
      emoji: "🖥",
    },
    {
      id: 11,
      name: "건설",
      emoji: "🖥",
    },
    {
      id: 12,
      name: "의료",
      emoji: "🖥",
    },
    {
      id: 13,
      name: "미디어",
      emoji: "🖥",
    },
    {
      id: 14,
      name: "전문직",
      emoji: "🖥",
    },
    {
      id: 15,
      name: "주부",
      emoji: "🖥",
    },
    {
      id: 16,
      name: "공무원",
      emoji: "🖥",
    },
    {
      id: 17,
      name: "무직",
      emoji: "",
    },
    {
      id: 18,
      name: "기타",
      emoji: "",
    },
  ];

  return (
    <S.JobBlockCont>
      {jobList.map((jobitem) => (
        <S.JobBlock
          key={jobitem.id}
          onClick={async () => await handleJob(jobitem.name)}
        >
          <S.JobEmoji>{jobitem.emoji}</S.JobEmoji>
          <S.JobName>{jobitem.name}</S.JobName>
        </S.JobBlock>
      ))}
    </S.JobBlockCont>
  );
}
