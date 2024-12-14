import { commandsState } from "@/store/receiptState";
import { CommandListElementProps } from "@/types";
import { useRecoilState } from "recoil";

export const CommandListElement: React.FC<CommandListElementProps> = ({
  command,
  index,
}) => {
  const [commands, setCommands] = useRecoilState(commandsState);
  return (
    <button
      className="block text-black w-72 text-left p-1"
      key={index}
      onClick={() => {
        setCommands(commands + `\n${command.cmd}`);
      }}
    >
      <p className="text-md">{command.cmd}</p>
      <p className="text-sm font-light">{command.info}</p>
    </button>
  );
};
