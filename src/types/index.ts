import React, { ReactNode, MouseEventHandler } from "react";

export interface ReceiptItem {
  type: string;
  text?: string;
  styles?: React.CSSProperties;
  qrSize?: number;
}

export interface ReceiptOutputProps {
  receiptRef: React.RefObject<HTMLDivElement>;
}

export interface ActionButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface ReceiptPrintProps {
  type: string;
  text?: string;
}

export interface SideBarBtnProps {
  height?: string;
  width?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  src: string;
}

export interface CommandListElementProps {
  command: {
    cmd: string;
    info: string;
  };
}
