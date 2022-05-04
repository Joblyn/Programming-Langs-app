import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import "@testing-library/jest-dom";
import { Home } from "../../pages";
import { act } from "react-dom/test-utils";
import Languages from "../../data/languages";
import { AppContext } from "../../context/context";
import App from "../../App";

// mock useState setState from React
const setStateMock = jest.fn();
const useStateMock = (useState) => [useState, setStateMock];
jest.spyOn(React, "useState").mockImplementation(useStateMock);

// mock useEffect from React
jest.spyOn(React, "useEffect").mockImplementation((f) => f());

// mock useNavigate from React
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// test the app at the homepage (/)
describe("<Home />", () => {
  afterEach(cleanup);

  //test the timer loader implementation
  test("rendering the home page", async () => {
    // mock timers
    jest.useFakeTimers();

    const setRoute = () => {};
    const history = createMemoryHistory();
    // render component
    const { container, getByText } = render(
      <Router location={history.location}>
        <AppContext.Provider value={{ setRoute }}>
          <Home />
        </AppContext.Provider>
      </Router>
    );

    // once component is rendered, a loader shows up
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(
      container.firstChild.getElementsByClassName("spinner-item").length
    ).toBe(3);
    expect(container.firstChild).toMatchSnapshot();

    // check component after timeout
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(
      container.firstChild.getElementsByClassName("custom-card").length
    ).toBe(Languages.length);
    expect(container.firstChild).toMatchSnapshot();

    jest.useRealTimers();
  });

  // navigates to /asse
  test("navigates to /assessment/name page after a card/language is selected", async () => {
    jest.useFakeTimers();

    const history = createMemoryHistory();
    const { container } = render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // click on a language/card
    const cardButton = container.getElementsByTagName("button")[0];
    expect(cardButton.getAttribute("type")).toBe("button");
    await fireEvent.click(cardButton);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith("/assessment/name");

    jest.useRealTimers();
  });
});
