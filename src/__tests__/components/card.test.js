import React from "react";
import { Router } from "react-router-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Languages from "../../data/languages";
import { AppContext } from "../../context/context";
import CustomCard from "../../components/card/card";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";

// mock react-router-dom
jest.mock("react-router-dom");

// mock useNavigate from React
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// mock useState setState from React
const setRoute = jest.fn();
const useStateMock = jest.spyOn(React, "useState");
useStateMock.mockImplementation((initialState) => [initialState, setRoute]);

// testing card component
describe("<CustomCard />", () => {
  afterEach(cleanup);

  // UI test
  it("renders the component correctly", () => {
    // initial memoryHistory
    const history = createMemoryHistory();
    const { container, getByText, getByAltText } = render(
      <Router location={history.location}>
        <AppContext.Provider value={{ setRoute }}>
          <CustomCard
            title={Languages[0].title}
            image={Languages[0].image}
            alt={Languages[0].alt}
          />
        </AppContext.Provider>
      </Router>
    );

    expect(getByText(Languages[0].title)).toBeTruthy();
    expect(getByAltText(Languages[0].alt)).toBeTruthy();
    expect(container.firstChild.matches(".custom-card")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  // triggers setRoute upon click
  it("sets the route upon click and changes pathname to name", async () => {
     // initialise memoryHistory
     const history = createMemoryHistory();
    const { container, getByText } = render(
      <Router location={history.location} navigator={history}>
        <AppContext.Provider value={{ setRoute }}>
          <CustomCard
            title={Languages[0].title}
            image={Languages[0].image}
            alt={Languages[0].alt}
            href={Languages[0].href}
          />
        </AppContext.Provider>
      </Router>
    );

    let button = container.getElementsByTagName("button")[0];
    await fireEvent.click(button);

    // check that the route is set
    expect(setRoute).toHaveBeenCalledWith(Languages[0].href);
    expect(mockedNavigate).toHaveBeenCalledWith("/assessment/name");
  });
});
