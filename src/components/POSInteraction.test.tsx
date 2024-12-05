import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { ReceiptInput } from "./POSComponents/ReceiptInput";
import { RecoilObserver } from "../functions/testshelperfunctions";
import { commandsState } from "../store/receiptState";
import { ReceiptOutput } from "./POSComponents/ReceiptOutput";
import { CommandLog } from "./POSComponents/CommandLog";

describe("Receipt Input - Output Interaction", () => {
  let receiptInput: ReturnType<typeof render>;
  const onChange = jest.fn();

  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();

  it("Generate Receipt Button changes commandState", () => {
    const receiptRef = { current: null };

    receiptInput = render(
      <RecoilRoot>
        <RecoilObserver node={commandsState} onChange={onChange} />
        <ReceiptInput />
        <ReceiptOutput receiptRef={receiptRef} />
      </RecoilRoot>
    );

    const commandInput = receiptInput.getByTestId("commandInput");
    fireEvent.change(commandInput, { target: { value: "Happy" } });

    const generateReceiptBtn = receiptInput.getByRole("button", {
      name: "Generate Receipt",
    });
    fireEvent.click(generateReceiptBtn);

    expect(screen.getAllByText("Happy")).toHaveLength(2);
  });

  it("Generate Receipt Button changes commandState and Parser is working correctly", () => {
    const receiptRef = { current: null };

    receiptInput = render(
      <RecoilRoot>
        <RecoilObserver node={commandsState} onChange={onChange} />
        <ReceiptInput />
        <ReceiptOutput receiptRef={receiptRef} />
      </RecoilRoot>
    );

    const commandInput = receiptInput.getByTestId("commandInput");
    fireEvent.change(commandInput, { target: { value: "ESC @" } });

    const generateReceiptBtn = receiptInput.getByRole("button", {
      name: "Generate Receipt",
    });
    fireEvent.click(generateReceiptBtn);

    expect(screen.getAllByText("ESC @")).toHaveLength(1);
  });
});

describe("Receipt Input - Command Log Interaction", () => {
  it("Generate Receipt Button changes commandLogState and Parser is working correctly", () => {
    const receiptInput = render(
      <RecoilRoot>
        <ReceiptInput />
        <CommandLog />
      </RecoilRoot>
    );

    const commandInput = receiptInput.getByTestId("commandInput");
    fireEvent.change(commandInput, {
      target: {
        value:
          "ESC @\nGS ( k 3\nGS !\nGS V\nESC E 1\nESC - 1\nESC G 1\nESC V 1\nESC p",
      },
    });

    const generateReceiptBtn = receiptInput.getByRole("button", {
      name: "Generate Receipt",
    });
    fireEvent.click(generateReceiptBtn);

    expect(screen.getAllByText("Printer Initialized")).toHaveLength(1);
    expect(screen.getAllByText("QR Code Generated")).toHaveLength(1);
    expect(screen.getAllByText("Paper Cut")).toHaveLength(1);
    expect(screen.getAllByText("Cash Drawer Opened")).toHaveLength(1);
  });
});
