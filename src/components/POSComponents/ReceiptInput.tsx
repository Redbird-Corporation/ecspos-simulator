import { parseCommands } from "../../functions/helperfunctions";
import { pageSizeState } from "../../store/behaviourState";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  commandLogState,
  commandsState,
  receiptState,
} from "../../store/receiptState";

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
      <button
        className="px-4 py-2 mb-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        onClick={() => {
          handleParseCommands(commands);
        }}
      >
        Generate Receipt
      </button>
    </>
  );
};
