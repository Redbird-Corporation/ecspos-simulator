import { ReceiptItem } from "@/types";
import { atom } from "recoil";

export const commandsState = atom<string>({
  key: "commandsState",
  default: "",
});

export const receiptState = atom<ReceiptItem[]>({
  key: "receiptState",
  default: [],
});

export const commandLogState = atom<string[]>({
  key: "commandLogState",
  default: [],
});
