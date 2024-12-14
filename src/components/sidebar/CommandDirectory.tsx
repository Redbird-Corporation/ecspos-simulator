import { commandListState } from "@/store/commandState";
import { useRecoilValue } from "recoil";
import { CommandListElement } from "./CommadListElement";

export const CommandDirectory = () => {
  const commandList = useRecoilValue(commandListState);
  return (
    <div>
      <div className="mb-1">Command Directory</div>
      <div
        id="cmdList"
        className="bg-white space-y-1 divide-y rounded-sm overflow-y-auto overflow-x-hidden max-h-96"
      >
        {commandList.map((command, index) => {
          return <CommandListElement command={command} index={index} />;
        })}
      </div>
    </div>
  );
};
