import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Header from "../../components/header/header";

describe("<Header />", () => {
  afterEach(cleanup);

  // useState
  // const setShowBtns = jest.fn();
  // const showBtns = jest.fn(false);
  // const useStateSpy = jest.spyOn(React, "useState");
  // useStateSpy.mockImplementation(() => [showBtns, setShowBtns]);

  // UI test
  it("renders the component correctly", () => {
    const { container, getByText, getByAltText, getByTestId } = render(
      <Header />
    );

    expect(getByAltText("logo_icon")).toBeTruthy();
    expect(getByText("Software Interview Self Assessment")).toBeTruthy();
    expect(getByTestId("FormatAlignJustifyIcon")).toBeTruthy();

    fireEvent.click(getByTestId("FormatAlignJustifyIcon"));
    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
    expect(container.getElementsByTagName("a").length).toBe(3);


    fireEvent.click(getByTestId("FormatAlignJustifyIcon"));
    expect(container.getElementsByTagName("a").length).toBe(1);

    expect(container.firstChild).toMatchSnapshot();
  });
});
