import { ReceiptItem } from "@/types";
import { SetterOrUpdater } from "recoil";

export const handleGSCommands = (
  args: string[],
  parsedReceipt: ReceiptItem[],
  currentStyles: React.CSSProperties,
  newCommandLog: string[]
) => {
  switch (args[0]) {
    case "!":
      const size = parseInt(args[1], 10);
      currentStyles.fontSize = `${size / 2 + 1}em`;
      break;
    case "V":
      parsedReceipt.push({
        type: "text",
        text: "--- Cut Paper ---\n",
        styles: { ...currentStyles },
      });
      newCommandLog.push("Paper Cut");
      break;
    case "(":
      if (args[1] === "k") {
        newCommandLog.push("QR Code Generated");
        const qrSize = args[2] === "3" ? 100 : 200; // Size 3 for normal, 4 for larger
        parsedReceipt.push({
          type: "qr",
          qrSize: qrSize,
          styles: { ...currentStyles },
        });
      }
      break;
  }
};

export const handleESCCommands = (
  args: string[],
  currentStyles: React.CSSProperties,
  newCommandLog: string[]
) => {
  switch (args[0]) {
    case "@":
      newCommandLog.push("Printer Initialized");
      currentStyles = {};
      break;
    case "!":
      const value = parseInt(args[1], 10);
      currentStyles.fontWeight = value & 0x08 ? "bold" : "normal";
      currentStyles.fontSize =
        value & 0x10 ? "2em" : value & 0x20 ? "1.5em" : "1em";
      currentStyles.width = value & 0x20 ? "200%" : "100%";
      break;
    case "E":
      currentStyles.fontWeight = args[1] === "1" ? "bold" : "normal";
      break;
    case "a":
      currentStyles.textAlign =
        args[1] === "0" ? "left" : args[1] === "1" ? "center" : "right";
      break;
    case "-":
      currentStyles.textDecoration = args[1] === "1" ? "underline" : "none";
      break;
    case "G":
      currentStyles.textDecoration = args[1] === "1" ? "line-through" : "none"; // Use line-through for double strike
      break;
    case "V":
      currentStyles.transform = args[1] === "1" ? "rotate(-90deg)" : "none";
      currentStyles.display = args[1] === "1" ? "inline-block" : "inline";
      currentStyles.transformOrigin = "left bottom";
      break;
    case "p":
      newCommandLog.push("Cash Drawer Opened");
      break;
  }
};

export const parseCommands = (
  cmds: string,
  setReceipt: SetterOrUpdater<ReceiptItem[]>,
  setCommandLog: SetterOrUpdater<string[]>
) => {
  const currentStyles: React.CSSProperties = {};
  const lines = cmds.split("\n");
  const newCommandLog: string[] = [];
  const parsedReceipt: ReceiptItem[] = [];

  lines.forEach((line) => {
    const [command, ...args] = line.split(" ");
    switch (command.toUpperCase()) {
      case "LF":
        parsedReceipt.push({
          type: "text",
          text: "\n",
          styles: { ...currentStyles },
        });
        break;
      case "ESC":
        handleESCCommands(args, currentStyles, newCommandLog);
        break;
      case "GS":
        handleGSCommands(args, parsedReceipt, currentStyles, newCommandLog);
        break;
      default:
        if (line.trim() !== "") {
          parsedReceipt.push({
            type: "text",
            text: line + "\n",
            styles: { ...currentStyles },
          });
        }
        break;
    }
  });

  // Update Recoil state
  setReceipt(parsedReceipt);
  setCommandLog(newCommandLog);
};
