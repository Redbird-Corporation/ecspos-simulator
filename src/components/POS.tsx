import React, { useRef } from "react";
import { CommandLog } from "./POSComponents/CommandLog";
import { ReceiptOutput } from "./POSComponents/ReceiptOutput";
import { ReceiptInput } from "./POSComponents/ReceiptInput";

const POS: React.FC = () => {
  const receiptRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <ReceiptInput />
      <ReceiptOutput receiptRef={receiptRef} />
      <CommandLog />
    </div>
  );
};

export default POS;
