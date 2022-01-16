import { API_URLS } from "../constants";
import { withoutAuthInstance } from "./common";

const { API_SCHOOL } = API_URLS;

export const schoolGetApi = async (schoolName) => {
  if (schoolName === "" || schoolName === null || schoolName === undefined) {
    return await withoutAuthInstance.get(API_SCHOOL + `search?name=`);
  } else {
    return await withoutAuthInstance.get(
      API_SCHOOL + `search?name=${schoolName}`
    );
  }
};
