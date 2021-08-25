import { withAuthInstance } from "./common";

export const schoolGetApi = async () => {
  return await withAuthInstance().get("http://3.36.95.15:8080/api/school/list");
};
