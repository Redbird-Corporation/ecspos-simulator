import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import { render } from "@testing-library/react";
import { CommandLog } from "./CommandLog";

describe("Command Log Tests", () => {
  it("Command Log Renders Correctly", () => {
    const commandLog = render(
      <RecoilRoot>
        <CommandLog />
      </RecoilRoot>
    );

    expect(commandLog.getByText("Command Log")).toBeDefined();
  });
});
