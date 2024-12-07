export interface ReceiptItem {
  type: string;
  text?: string;
  styles?: React.CSSProperties;
  qrSize?: number;
}

export interface ReceiptOutputProps {
  receiptRef: React.RefObject<HTMLDivElement>;
}
