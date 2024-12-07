import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import { render } from "@testing-library/react";
import App from "./App";

describe("POS Tests", () => {
  it("POS renders correctly", () => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();

    const pos = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    expect(pos).toBeDefined();
  });
});
