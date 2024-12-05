import { pageSizeState } from "@/store/behaviourState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { QRCodePlaceholder } from "../qr/QR";
import React, { useEffect } from "react";
import { initialCommands } from "@/initial/initialCommands";
import { parseCommands } from "@/functions/helperfunctions";
import { ReceiptOutputProps } from "@/types";
import {
  commandLogState,
  commandsState,
  receiptState,
} from "@/store/receiptState";

export const ReceiptOutput: React.FC<ReceiptOutputProps> = ({ receiptRef }) => {
  const [commands, setCommands] = useRecoilState(commandsState);
  const [receipt, setReceipt] = useRecoilState(receiptState);
  const pageSize = useRecoilValue(pageSizeState);
  const setCommandLog = useSetRecoilState(commandLogState);

  const printSound = new Audio("/sounds/print.mp3");

  const pageWidths = {
    "58mm": "w-60",
    "80mm": "w-80",
    "112mm": "w-1000",
  };

  const handleParseCommands = (cmds: string) => {
    parseCommands(cmds, setReceipt, setCommandLog);
  };

  useEffect(() => {
    if (receipt.length > 0) {
      printSound.play();
      setTimeout(() => {
        if (receiptRef.current) {
          receiptRef.current.scrollTop = receiptRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [receipt]);

  useEffect(() => {
    if (!commands) {
      setCommands(initialCommands);
      handleParseCommands(initialCommands);
    }
  }, []);

  return (
    <div
      id="receipt"
      ref={receiptRef}
      className={`${pageWidths[pageSize]} p-4 bg-white text-black border border-gray-400 rounded shadow overflow-x-auto`}
      style={{ fontFamily: "Courier, monospace" }}
    >
      <h2 className="text-2xl mb-4 text-center border-b-2 border-dashed pb-2">
        Receipt
      </h2>
      <pre className="font-mono whitespace-pre-wrap">
        {receipt.map((item, index) =>
          item.type === "qr" ? (
            <QRCodePlaceholder key={index} size={item.qrSize || 100} />
          ) : (
            <span key={index} style={item.styles}>
              {item.text}
            </span>
          )
        )}
      </pre>
    </div>
  );
};
