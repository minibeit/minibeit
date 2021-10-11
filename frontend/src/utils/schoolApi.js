import { API_URLS } from "../constants";
import { withoutAuthInstance } from "./common";

const { GET_SCHOOL } = API_URLS;

export const schoolGetApi = async (schoolName) => {
  if (schoolName === "" || schoolName === null || schoolName === undefined) {
    return await withoutAuthInstance.get(GET_SCHOOL + `?name=`);
  } else {
    return await withoutAuthInstance.get(GET_SCHOOL + `?name=${schoolName}`);
  }
};
