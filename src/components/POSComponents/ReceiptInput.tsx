import {
  parsePrintReceipt,
  // sendPrinterCommands,
} from "../../functions/printerFunctions";
import { pageSizeState } from "../../store/behaviourState";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  commandLogState,
  commandsState,
  receiptState,
} from "../../store/receiptState";
import { ActionButton } from "../common/ActionButton";
import { parseCommands } from "../../functions/commandHandlers";

export const ReceiptInput = () => {
  const [commands, setCommands] = useRecoilState(commandsState);
  const [pageSize, setPageSize] = useRecoilState(pageSizeState);
  const setReceipt = useSetRecoilState(receiptState);
  const setCommandLog = useSetRecoilState(commandLogState);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(event.target.value as "58mm" | "80mm" | "112mm");
  };

  const handleParseCommands = (cmds: string) => {
    parseCommands(cmds, setReceipt, setCommandLog);
  };

  const handlePrintReceipt = (cmds: string) => {
    parsePrintReceipt(cmds, parseInt(pageSize));
  };

  return (
    <>
      <h1 className="text-4xl text-black mb-8">ESC POS Emulator</h1>
      <textarea
        data-testid="commandInput"
        className="w-96 h-40 p-2 mb-4 bg-white text-black border border-gray-400 rounded shadow focus:outline-none focus:border-blue-500"
        placeholder="Enter ECS POS commands"
        value={commands}
        onChange={(e) => setCommands(e.target.value)}
      />
      <div className="mb-4">
        <label htmlFor="pageSize" className="mr-2">
          Select Page Size:
        </label>
        <select
          data-testid="pageSizeInp"
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
      <div className="flex gap-4">
        <ActionButton
          onClick={() => {
            handleParseCommands(commands);
          }}
        >
          Generate Receipt
        </ActionButton>
        <ActionButton
          onClick={() => {
            handlePrintReceipt(commands);
          }}
        >
          Print Receipt
        </ActionButton>
      </div>
    </>
  );
};
