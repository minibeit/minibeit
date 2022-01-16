import axios from "axios";

export const downloadFileApi = (fileName) => {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_URL}/api/file/download?fileName=${fileName}`,
    responseType: "blob",
  })
    .then((res) => res)
    .catch((err) => err);
};
