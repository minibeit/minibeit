import axios from "axios";

function withoutAuth() {
  return axios.create({});
}

function withAuth() {
  const accessToken = localStorage.getItem("accessToken");
  return axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export const withoutAuthInstance = withoutAuth();
export const withAuthInstance = withAuth();
