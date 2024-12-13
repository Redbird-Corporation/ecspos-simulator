import React, { ReactNode, MouseEventHandler } from "react";

interface ActionButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="px-4 py-2 mb-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
