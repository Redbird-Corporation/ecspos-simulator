import { useRecoilState } from "recoil";
import leftArrowIcon from "../../assets/leftArrow.svg";
import rigthArrowIcon from "../../assets/rigthArrow.svg";
import { showSidebarState } from "@/store/behaviourState";
import { useEffect } from "react";
import { CommandDirectory } from "../sidebar/CommandDirectory";
import { Button } from "../sidebar/Button";

export const SideBar = () => {
  const [showSidebar, setShowSidebar] = useRecoilState(showSidebarState);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 641) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setShowSidebar]);

  return (
    <>
      <div className="fixed right-0 bg-blue-600 dark:bg-blue-500 text-white rounded-l-md flex justify-center items-center">
        {showSidebar ? (
          <div className="p-2 min-w-80 max-w-80">
            <div
              className="relative right-7 bottom-2 bg-blue-600 dark:bg-blue-500 h-12 w-full rounded-l-sm flex items-center gap-1 cursor-pointer"
              onClick={() => {
                setShowSidebar(false);
              }}
            >
              <Button src={rigthArrowIcon} />
              <p className="text-lg ">Help</p>
            </div>
            <CommandDirectory />
          </div>
        ) : (
          <Button
            height={"12"}
            width={"6"}
            onClick={() => {
              setShowSidebar(true);
            }}
            src={leftArrowIcon}
          />
        )}
      </div>
    </>
  );
};
