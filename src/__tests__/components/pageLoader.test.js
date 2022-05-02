import React from "react";
import { render, cleanup } from "@testing-library/react";
import PageLoader from "../../components/pageloader/pageloader";

describe("<PageLoader />", () => {
  afterEach(cleanup);

  // UI test
  it("renders component correctly", () => {
    const { container } = render(<PageLoader />);

    expect(container.getElementsByClassName("spinner").length).toBe(1);
    expect(container.getElementsByClassName("spinner-item").length).toBe(3);
    expect(container.firstChild).toMatchSnapshot();
  });
});
