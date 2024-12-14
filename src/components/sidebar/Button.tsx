import { SideBarBtnProps } from "@/types";

export const Button: React.FC<SideBarBtnProps> = ({
  height = "6",
  width = "6",
  onClick,
  src,
}) => {
  return (
    <button className={`h-${height} w-${width} `} onClick={onClick}>
      <img src={src} />
    </button>
  );
};
