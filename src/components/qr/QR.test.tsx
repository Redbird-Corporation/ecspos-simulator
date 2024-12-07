import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import { render } from "@testing-library/react";
import { QRCodePlaceholder } from "./QR";

describe("QR Tests", () => {
  it("QR renders correctly", () => {
    const qr = render(
      <RecoilRoot>
        <QRCodePlaceholder size={100} />
      </RecoilRoot>
    );

    expect(qr).toBeDefined();
  });
});
