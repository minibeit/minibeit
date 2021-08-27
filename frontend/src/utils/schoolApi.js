import { API_URLS } from "../constants";
import { withAuthInstance } from "./common";

const {GET_SCHOOL} = API_URLS

export const schoolGetApi = async () => {
  return await withAuthInstance.get(GET_SCHOOL);
};
