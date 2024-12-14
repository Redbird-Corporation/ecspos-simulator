import { atom } from "recoil";

export const commandListState = atom({
  key: "commandListState",
  default: [
    {
      cmd: "ESC @",
      info: "Initialize Printer",
    },
    {
      cmd: "ESC ! {n}",
      info: "Change Font Styles, {n is a number}",
    },
    {
      cmd: "ESC E 0/1",
      info: "Toggle Bold Mode, '/' means or, select any one of the value and remove '/'",
    },
    {
      cmd: "ESC a 0/1",
      info: "Text Align, '/' means or, select any one of the value and remove '/'",
    },
    {
      cmd: "ESC - 0/1",
      info: "Toggle Underline Mode, '/' means or, select any one of the value and remove '/'",
    },
    {
      cmd: "ESC G 0/1",
      info: "Toggle Strike Through, '/' means or, select any one of the value and remove '/'",
    },
    {
      cmd: "ESC V 0/1",
      info: "Toggle 90 degree clockwise rotation mode on/off, '/' means or, select any one of the value and remove '/'",
    },
    {
      cmd: "ESC p",
      info: "Cash Drawer Open",
    },
    {
      cmd: "GS ! {n}",
      info: "Double Width/Height, {n is a number}",
    },
    {
      cmd: "GS V",
      info: "Cut Paper",
    },
    {
      cmd: "GS ( k 3/{n}",
      info: "Generate QR Code, {n is a number}",
    },
    {
      cmd: "LF",
      info: "New Line",
    },
  ],
});
