import React, { useState, useRef, useEffect } from "react";

interface ReceiptItem {
  type: string;
  text?: string;
  styles?: React.CSSProperties;
  qrSize?: number;
}

const QRCodePlaceholder: React.FC<{ size: number }> = ({ size }) => (
  <div 
  style={{
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: '#fff',
    margin: '10px auto',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  <div style={{
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundImage: `
      linear-gradient(to right, black 25%, transparent 25%, transparent 75%, black 75%, black),
      linear-gradient(to bottom, black 25%, transparent 25%, transparent 75%, black 75%, black)
    `,
    backgroundSize: `${size/5}px ${size/5}px`,
    opacity: 0.8,
  }} />
  <div style={{
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    border: '4px solid black',
  }} />
  <div style={{
    position: 'absolute',
    top: '20%',
    left: '20%',
    width: '20%',
    height: '20%',
    backgroundColor: 'black',
  }} />
  <div style={{
    position: 'absolute',
    top: '20%',
    right: '20%',
    width: '20%',
    height: '20%',
    backgroundColor: 'black',
  }} />
  <div style={{
    position: 'absolute',
    bottom: '20%',
    left: '20%',
    width: '20%',
    height: '20%',
    backgroundColor: 'black',
  }} />
</div>
);

const POS: React.FC = () => {
  const [commands, setCommands] = useState<string>("");
  const [receipt, setReceipt] = useState<ReceiptItem[]>([]);
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<"58mm" | "80mm" | "112mm">("80mm");
  const receiptRef = useRef<HTMLDivElement>(null);

  const printSound = new Audio('/sounds/print.mp3');

  const initialCommands = `ESC @
ESC ! 00
ESC a 01
The Cozy Corner Cafe
LF
123 Main Street, Anytown
LF
Tel: (555) 123-4567
LF
LF
ESC a 00
------------------------------------------
Item            Qty    Price     Total
------------------------------------------
Coffee          2      2.50      5.00
Sandwich        1      5.00      5.00
Cake            3      3.00      9.00
------------------------------------------
Subtotal:                         19.00
Tax (10%):                        1.90
------------------------------------------
Total:                           20.90
------------------------------------------
Thank you for visiting The Cozy Corner Cafe!
LF
LF
ESC d 3`;

  const parseCommands = (cmds: string) => {
    const lines = cmds.split("\n");
    let currentStyles: React.CSSProperties = {};
    const newCommandLog: string[] = [];
    const parsedReceipt: ReceiptItem[] = [];

    lines.forEach((line) => {
      const [command, ...args] = line.split(" ");
      switch (command.toUpperCase()) {
        case "LF":
          parsedReceipt.push({ type: "text", text: "\n", styles: { ...currentStyles } });
          break;
        case "ESC":
          handleESCCommands(args, currentStyles, newCommandLog);
          break;
        case "GS":
          handleGSCommands(args, parsedReceipt, currentStyles, newCommandLog);
          break;
        default:
          if (line.trim() !== "") {
            parsedReceipt.push({ type: "text", text: line + "\n", styles: { ...currentStyles } });
          }
          break;
      }
    });

    setReceipt(parsedReceipt);
    setCommandLog(newCommandLog);
  };

  const handleESCCommands = (args: string[], currentStyles: React.CSSProperties, newCommandLog: string[]) => {
    switch (args[0]) {
      case "@":
        newCommandLog.push("Printer Initialized");
        currentStyles = {};
        break;
      case "!":
        const value = parseInt(args[1], 10);
        currentStyles.fontWeight = value & 0x08 ? "bold" : "normal";
        currentStyles.fontSize = value & 0x10 ? "2em" : value & 0x20 ? "1.5em" : "1em";
        currentStyles.width = value & 0x20 ? "200%" : "100%";
        break;
      case "E":
        currentStyles.fontWeight = args[1] === "1" ? "bold" : "normal";
        break;
      case "a":
        currentStyles.textAlign = args[1] === "0" ? "left" : args[1] === "1" ? "center" : "right";
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

  const handleGSCommands = (args: string[], parsedReceipt: ReceiptItem[], currentStyles: React.CSSProperties, newCommandLog: string[]) => {
    switch (args[0]) {
      case "!":
        const size = parseInt(args[1], 10);
        currentStyles.fontSize = `${size / 2 + 1}em`;
        break;
      case "V":
        parsedReceipt.push({ type: "text", text: "--- Cut Paper ---\n", styles: { ...currentStyles } });
        newCommandLog.push("Paper Cut");
        break;
      case "(":
        if (args[1] === "k") {
          newCommandLog.push("QR Code Generated");
          const qrSize = args[2] === "3" ? 100 : 200; // Size 3 for normal, 4 for larger
          parsedReceipt.push({ type: "qr", qrSize: qrSize, styles: { ...currentStyles } });
        }
        break;
    }
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
      parseCommands(initialCommands);
    }
  }, []);

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(event.target.value as "58mm" | "80mm" | "112mm");
  };

  const pageWidths = {
    "58mm": "w-60",
    "80mm": "w-80",
    "112mm": "w-1000"
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl text-black mb-8">ECS POS Emulator</h1>
      <textarea
        className="w-96 h-40 p-2 mb-4 bg-white text-black border border-gray-400 rounded shadow focus:outline-none focus:border-blue-500"
        placeholder="Enter ECS POS commands"
        value={commands}
        onChange={(e) => setCommands(e.target.value)}
      />
      <div className="mb-4">
        <label htmlFor="pageSize" className="mr-2">Select Page Size:</label>
        <select
          id="pageSize"
          className="p-2 bg-white border border-gray-400 rounded"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value="58mm">58mm</option>
          <option value="80mm">80mm</option>
          <option value="112mm">112mm</option>
        </select>
      </div>
      <button
        className="px-4 py-2 mb-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        onClick={() => parseCommands(commands)}
      >
        Generate Receipt
      </button>
      <div
        id="receipt"
        ref={receiptRef}
        className={`${pageWidths[pageSize]} p-4 bg-white text-black border border-gray-400 rounded shadow overflow-x-auto`}
        style={{ fontFamily: 'Courier, monospace' }}
      >
        <h2 className="text-2xl mb-4 text-center border-b-2 border-dashed pb-2">Receipt</h2>
        <pre className="font-mono whitespace-pre-wrap">
          {receipt.map((item, index) => (
            item.type === "qr" ? (
              <QRCodePlaceholder key={index} size={item.qrSize || 100} />
            ) : (
              <span key={index} style={item.styles}>{item.text}</span>
            )
          ))}
        </pre>
      </div>
      <div
        id="command-log"
        className="w-full max-w-lg mt-8 p-4 bg-gray-200 text-black border border-gray-400 rounded shadow"
      >
        <h2 className="text-2xl mb-4 text-center border-b-2 border-dashed pb-2">Command Log</h2>
        <pre className="font-mono">
          {commandLog.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default POS;
