import React from "react";
import {
  render,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { Name } from "../../pages";
import { AppContext } from "../../context/context";
import { act } from "react-dom/test-utils";

// mock useNavigate from React
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// test the app at name
describe("<Name />", () => {
  afterEach(cleanup);

  // test name component
  test("renders correctly", async () => {
    const route = "";
    const setName = () => {};
    const history = createMemoryHistory();
    const { container, getByText, getByAltText, getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <AppContext.Provider value={{ route, setName }}>
          <Name />
        </AppContext.Provider>
      </Router>
    );

    // expect to see a logo image
    expect(getByAltText("_logo_")).toBeTruthy();
    // expect to see text
    expect(getByText("Let's meet you")).toBeTruthy();
    // expect to see an input with placeholder
    expect(getByTestId("name_input").getAttribute("type")).toBe("text");
    // expect to see a button with text - next
    expect(getByText("Next")).toBeTruthy();
    // expect button to be disabled on initial render
    expect(
      getByText("Next").parentElement.matches(
        ".cursor-not-allowed.bg-opacity-50"
      )
    ).toBeTruthy();
    // nothing happens on click of disabled button
    await fireEvent.click(getByText("Next").parentElement);
    expect(
      getByText("Next").parentElement.matches(
        ".cursor-not-allowed.bg-opacity-50"
      )
    ).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();
  });

  // test that name is updated when input is changed
  test("name is updated when input is changed", async () => {
    const route = "java";
    const setName = () => {};
    // jest.spyOn(setName);
    const history = createMemoryHistory();
    const { container, getByText, getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <AppContext.Provider value={{ route, setName }}>
          <Name />
        </AppContext.Provider>
      </Router>
    );

    // fire a change event on input
    await act(async () => {
      await fireEvent.change(getByTestId("name_input"), {
        target: { value: "Job" },
      });
      // expect value to be updated
      expect(getByTestId("name_input").value).toBe("Job");
      expect(
        getByText("Next").parentElement.matches(".cursor-pointer")
      ).toBeTruthy();
      expect(container.firstChild).toMatchSnapshot();

      // navigates to languages assessment page on button click
      await fireEvent.click(getByText("Next").parentElement);
      expect(mockedNavigate).toHaveBeenCalledWith("/assessment/java");
    });
  });
});
