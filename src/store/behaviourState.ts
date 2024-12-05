import { atom } from "recoil";

export const pageSizeState = atom<"58mm" | "80mm" | "112mm">({
  key: "pageSizeState",
  default: "80mm",
});
