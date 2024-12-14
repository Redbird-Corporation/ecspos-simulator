import { ReceiptPrintProps } from "@/types";
import { Printer, render, Text, Line } from "react-thermal-printer";

// Temp fix for serial not being available in most browsers but in WebApi
declare global {
  interface Navigator {
    serial: any;
  }
}

export const parsePrintReceipt = (cmds: string, pageSize: number) => {
  const lines = cmds.split("\n");
  const newPrintSequence: ReceiptPrintProps[] = [];

  lines.forEach((line) => {
    const firstWord = line.split(" ")[0];
    switch (firstWord) {
      case "ESC":
        break;
      case "GS":
        break;
      case "LF":
        newPrintSequence.push({
          type: "Line",
        });
        break;

      default:
        newPrintSequence.push({
          type: "Text",
          text: line,
        });
        break;
    }
  });
  sendPrinterCommands(newPrintSequence, pageSize);
};

const sendPrinterCommands = async (
  newPrintSequence: ReceiptPrintProps[],
  pageSize: number
) => {
  const data = await render(
    <Printer type="epson" width={pageSize}>
      {newPrintSequence.map((printCmd, index) => {
        if (printCmd.type === "Line") {
          return <Line key={index} />;
        } else if (printCmd.type === "Text") {
          return <Text key={index}>{printCmd.text}</Text>;
        }
      })}
    </Printer>
  );

  connectPrinterAndPrint(data);
};

const connectPrinterAndPrint = async (data: Uint8Array) => {
  let port;
  try {
    port = await window.navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
  } catch (e) {
    console.log(e.InvalidStateError);
    if (e) {
      alert("Cannot connect to Printer");
    }
    console.log(e);
  }

  const writer = port.writable?.getWriter();
  if (writer != null) {
    await writer.write(data);
    writer.releaseLock();
  }

  console.log("Simulating Print");
  console.log(data);
};
