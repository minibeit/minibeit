import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { createPortal } from "react-dom";
import { filterState } from "../../recoil/filterState";
import * as S from "./style";
import { schoolGetApi } from "../../utils/schoolApi";

function SchoolModal(props) {
  const { message, closeModal } = props;
  const [search, setSearch] = useState(null);
  const [school, setSchool] = useRecoilState(filterState);
  const [schoollist, setSchoolList] = useState([]);

  const getSchoolInfo = async () => {
    try {
      const result = await schoolGetApi();
      if (result) {
        setSchoolList(result);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };

  useEffect(() => {
    getSchoolInfo();
  }, []);
  const searchSpace = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
  };
  const getSchool = async (e) => {
    console.log(e.target.attributes[0].nodeValue);
    await closeModal(e.target.textContent, e.target.attributes[0].nodeValue);
    setSchool({
      ...school,
      school: e.target.textContent,
      schoolId: e.target.attributes[0].nodeValue,
    });
  };
  const items = schoollist
    .filter((data) => {
      console.log(data);
      if (search == null) return data;
      else if (data.name.toLowerCase().includes(search.toLowerCase())) {
        return data;
      }
    })
    .map((data) => {
      return (
        <li key={data.id} style={{ position: "relative", left: "10vh" }}>
          <span onClick={getSchool} data-key={data.id}>
            {data.name}
          </span>
        </li>
      );
    });

  return createPortal(
    <>
      <S.ModalWrapper>
        <S.ModalContent>
          <S.ModalInput onChange={searchSpace} />
          <S.ModalBottom>{items}</S.ModalBottom>
        </S.ModalContent>
      </S.ModalWrapper>
    </>,
    document.getElementById("modal")
  );
}

export default SchoolModal;
