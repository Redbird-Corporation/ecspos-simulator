import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { ReceiptInput } from "./ReceiptInput";
import { RecoilObserver } from "../../functions/testshelperfunctions";
import { commandsState } from "../../store/receiptState";
import { pageSizeState } from "../../store/behaviourState";

describe("Receipt Input Basic", () => {
  let receiptInput: ReturnType<typeof render>;

  beforeEach(() => {
    receiptInput = render(
      <RecoilRoot>
        <ReceiptInput />
      </RecoilRoot>
    );
  });

  it("Receipt Input is rendered correctly", () => {
    expect(receiptInput).toBeDefined();
  });

  it("Receipt Input button is rendered correctly", () => {
    expect(
      receiptInput.getByRole("button", { name: "Generate Receipt" })
    ).toBeDefined();
  });
});

describe("Receipt Input Advance", () => {
  let receiptInput: ReturnType<typeof render>;
  const onChange = jest.fn();

  it("Changing command input updates commandState", () => {
    receiptInput = render(
      <RecoilRoot>
        <RecoilObserver node={commandsState} onChange={onChange} />
        <ReceiptInput />
      </RecoilRoot>
    );
    const commandInput = receiptInput.getByTestId("commandInput");
    fireEvent.change(commandInput, { target: { value: "ESC @" } });

    expect(commandInput.textContent).toBe("ESC @");
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith("ESC @");
  });

  it("Changing Page Size updates pagesizeState", () => {
    receiptInput = render(
      <RecoilRoot>
        <RecoilObserver node={pageSizeState} onChange={onChange} />
        <ReceiptInput />
      </RecoilRoot>
    );

    const pageSizeInp = receiptInput.getByTestId("pageSizeInp");
    fireEvent.change(pageSizeInp, { target: { value: "58mm" } });

    expect(onChange).toHaveBeenCalledWith("58mm");
  });
});
