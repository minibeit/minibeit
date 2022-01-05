import { atom } from "recoil";

export const profilePreview = atom({
  key: "profilePreview",
  default: {
    wait: 0,
    reject: 0,
    approve: 0,
  },
});
export const BprofilePreview = atom({
  key: "BprofilePreview",
  default: {
    complete: 0,
    review: 0,
    created: 0,
  },
});
