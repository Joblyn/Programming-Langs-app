import React from "react";
import { render, cleanup } from "@testing-library/react";
import ProgressLine from "../../components/progress/progressline";

describe("<Progress />", () => {
  afterEach(cleanup);

  // UI test
  it("renders component correctly", () => {
    const count = 1;
    const totalcount = 15;

    const { container, getByText } = render(
      <ProgressLine count={count} totalcount={totalcount} />
    );

    expect(getByText(`${count}/${totalcount}`)).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
