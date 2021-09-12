import { API_URLS } from "../constants";
import { withoutAuthInstance } from "./common";

const { GET_SCHOOL } = API_URLS;

export const schoolGetApi = async (schoolName) => {
  return await withoutAuthInstance.get(GET_SCHOOL + `?name=${schoolName}`);
};
