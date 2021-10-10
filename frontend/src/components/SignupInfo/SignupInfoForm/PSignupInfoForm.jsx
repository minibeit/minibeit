import React, { useState } from "react";
import PropTypes from "prop-types";
import { PVImg, SchoolSearch } from "../../Common";
import { handleCompressImg } from "../../../utils/imgCompress";
import Portal from "../../Common/Modal/Portal";
import ProgressBar from "../../Common/Progressbar";
import { useRecoilValue } from "recoil";
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
    birth: "",
    schoolId: "",
  });
  const [index, setIndex] = useState(0);
  const [img, setImg] = useState();
  const { name, nickname, phoneNum, gender, job, birth } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "nickname") {
      setNick("notyet");
      if (value.length > 8) {
        window.alert(
          "대/소문자 영어 및 한글, 숫자로 8글자 이내로 입력해 주세요"
        );
      } else {
        setInputs({
          ...inputs,
          nickname: value.replace(/^[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/, ""),
        });
      }
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };
  const handleJob = async (jobName) => {
    setInputs({ ...inputs, job: jobName });
    setMsg("시작하기");
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
  };
  const singupInfoFunc = (e) => {
    if (index < 1) {
      for (const key in inputs) {
        if (
          key !== "schoolId" &&
          key !== "job" &&
          (inputs[key] === null || inputs[key] === "")
        ) {
          return window.alert("회원가입시 필요한 정보를 전부 입력해 주세요!");
        }
      }
      if (nick === "notyet") {
        return window.alert("닉네임 중복확인을 해주세요!");
      } else if (nick === false) {
        return window.alert("닉네임이 중복됩니다. 다른 닉네임을 선택해주세요!");
      }
      setIndex(index + 1);
      setitem({ bgcolor: "#6a1b9a", completed: ((index + 2) / 3) * 100 });
    }
    if (index === 1) {
      if (school.schoolId === null || school.schoolId === "") {
        return window.alert("학교를 입력해 주세요!");
      }
      setIndex(index + 1);
      setitem({ bgcolor: "#6a1b9a", completed: ((index + 2) / 3) * 100 });
    } else if (index === 2) {
      e.preventDefault();
      const inputs2 = {
        name: name,
        nickname: nickname,
        gender: gender,
        phoneNum: phoneNum,
        job: job,
        birth: birth,
        schoolId: school.schoolId,
      };

      if (inputs2.job === null || inputs2.job === "") {
        return window.alert("직업을 선택해 주세요!");
      }

      return signupHandler(inputs2, img);
    }
  };
  return (
    <>
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
              <p>
                {" "}
                {index === 0
                  ? "반갑습니다! 기본 프로필을 작성해 주세요"
                  : index === 1
                  ? "주변에 위치한 관심있는 학교를 선택해 주세요"
                  : index === 2
                  ? "현재 직업을 설정해 주세요"
                  : null}
              </p>
            </S.SITitle>
            <S.FormsignupContainer>
              {index === 0 ? (
                <>
                  <S.SICont12>
                    <p> 프로필 사진(필수아님*) </p>
                    <S.ImgBox>
                      {img ? (
                        <PVImg img={img} />
                      ) : (
                        <S.Img src="/기본프로필.png" />
                      )}
                    </S.ImgBox>
                    <S.ImgDel onClick={imgDel}>기본이미지로 변경</S.ImgDel>
                    <S.FileLabel htmlFor="input-file">
                      사진 업로드 하기
                    </S.FileLabel>
                    <S.SignupfileInput
                      id="input-file"
                      name="img"
                      type="file"
                      onChange={fileChange}
                    />
                  </S.SICont12>
                  <S.SICont11>
                    <S.SICont111>
                      <S.SILabel width="82px">
                        이름
                        <S.SignupInput
                          value={name}
                          name="name"
                          type="text"
                          placeholder="이름"
                          onChange={onChange}
                        />
                      </S.SILabel>
                      <S.NickBox>
                        <S.NicknameCont>
                          <S.SILabel width="84px">
                            닉네임
                            <S.SignupInput
                              value={nickname}
                              name="nickname"
                              type="text"
                              placeholder="닉네임"
                              onChange={onChange}
                            />
                          </S.SILabel>{" "}
                          <S.SignupNickBtn onClick={nickCheck}>
                            확인
                          </S.SignupNickBtn>
                        </S.NicknameCont>
                        {nick === true ? (
                          <S.SignupMSG color="blue">
                            사용가능한 닉네임 입니다
                          </S.SignupMSG>
                        ) : nick === false ? (
                          <S.SignupMSG color="red">
                            닉네임이 중복됩니다
                          </S.SignupMSG>
                        ) : null}
                      </S.NickBox>

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
                      <S.SILabel width="145px">
                        생년월일
                        <S.SignupInput
                          value={birth}
                          name="birth"
                          type="date"
                          onChange={onChange}
                        />
                      </S.SILabel>
                    </S.SICont111>
                    <S.SICont112>
                      <S.SILabel width="130px">
                        전화번호
                        <S.SignupInput
                          value={phoneNum}
                          name="phoneNum"
                          type="text"
                          placeholder="전화번호"
                          onChange={onChange}
                        />
                      </S.SILabel>
                    </S.SICont112>
                  </S.SICont11>
                </>
              ) : index === 1 ? (
                <>
                  <SchoolSearch use="Signup" />
                </>
              ) : index === 2 ? (
                <JobGrid handleJob={handleJob} />
              ) : null}
            </S.FormsignupContainer>
            <S.SignupButton>
              <p onClick={singupInfoFunc}> {msg}</p>
            </S.SignupButton>
          </S.ModalBox>
        </S.ModalBackground>
      </Portal>
    </>
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
      emoji: "📝",
    },
    {
      id: 10,
      name: "교육",
      emoji: "📖",
    },
    {
      id: 11,
      name: "건설",
      emoji: "🏗",
    },
    {
      id: 12,
      name: "의료",
      emoji: "💊",
    },
    {
      id: 13,
      name: "미디어",
      emoji: "🎥",
    },
    {
      id: 14,
      name: "전문직",
      emoji: "🏫",
    },
    {
      id: 15,
      name: "주부",
      emoji: "🏡",
    },
    {
      id: 16,
      name: "공무원",
      emoji: "💻",
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
  const [clickId, setClickId] = useState(0);
  const jobClick = async (jobName, jobId) => {
    setClickId(jobId);
    await handleJob(jobName);
  };

  return (
    <S.JobBlockCont>
      {jobList.map((jobitem) => {
        return clickId === jobitem.id ? (
          <S.JobClickBlock
            key={jobitem.id}
            onClick={async (e) => {
              e.preventDefault();
              await jobClick(jobitem.name, jobitem.id);
            }}
          >
            <S.JobEmoji>{jobitem.emoji}</S.JobEmoji>
            <S.JobName>{jobitem.name}</S.JobName>
          </S.JobClickBlock>
        ) : (
          <S.JobBlock
            key={jobitem.id}
            onClick={async (e) => {
              e.preventDefault();
              await jobClick(jobitem.name, jobitem.id);
            }}
          >
            <S.JobEmoji>{jobitem.emoji}</S.JobEmoji>
            <S.JobName>{jobitem.name}</S.JobName>
          </S.JobBlock>
        );
      })}
    </S.JobBlockCont>
  );
}
