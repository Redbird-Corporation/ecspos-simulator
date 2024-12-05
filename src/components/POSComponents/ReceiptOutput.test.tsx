import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { ReceiptOutput } from "./ReceiptOutput";

window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();

describe("ReceiptOutput", () => {
  it("Receipt Output Renders Correctly", () => {
    const receiptRef = { current: null };

    const receiptOutput = render(
      <RecoilRoot>
        <ReceiptOutput receiptRef={receiptRef} />
      </RecoilRoot>
    );

    expect(receiptOutput.getAllByText("Receipt")).toBeTruthy();
  });

  it("Receipt Output displays correct initial receipt", () => {
    const receiptRef = { current: null };

    const receiptOutput = render(
      <RecoilRoot>
        <ReceiptOutput receiptRef={receiptRef} />
      </RecoilRoot>
    );

    expect(receiptOutput.getAllByText("The Cozy Corner Cafe")).toBeTruthy();
  });
});
