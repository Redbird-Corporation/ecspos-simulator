import { commandLogState } from "@/store/receiptState";
import { useRecoilValue } from "recoil";

export const CommandLog = () => {
  const commandLog = useRecoilValue(commandLogState);

  return (
    <div
      id="command-log"
      className="w-full max-w-lg mt-8 p-4 bg-gray-200 text-black border border-gray-400 rounded shadow"
    >
      <h2 className="text-2xl mb-4 text-center border-b-2 border-dashed pb-2">
        Command Log
      </h2>
      <pre className="font-mono">
        {commandLog.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </pre>
    </div>
  );
};
