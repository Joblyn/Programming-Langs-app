import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Languages from "../../data/languages";
import { AppContext } from "../../context/context";
import CustomCard from "../../components/card/card";
import * as Routes from "../../constants/routes";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({}),
}));

describe("<CustomCard />", () => {
  afterEach(cleanup);

  // useState jest mock
  const setRoute = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((initialState = "/") => [
    initialState,
    setRoute,
  ]);

  // UI test
  it("renders the component correctly", () => {
    const { container, getByText } = render(
      <BrowserRouter>
        <AppContext.Provider value={{ setRoute }}>
          <CustomCard
            title={Languages[0].title}
            image={Languages[0].image}
            alt={Languages[0].alt}
          />
        </AppContext.Provider>
      </BrowserRouter>
    );

    expect(getByText(Languages[0].title)).toBeTruthy();
    expect(getAllByAltText(Languages[0].alt)).toBeTruthy();
    expect(container.firstChild.matches(".custom-card")).toBeTruthy();
    expect(container.firstChild.style.maxWidth === "345px").toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  // functionality test - update route on click and change pathname to "name"
  it("setst the route upon click and changes pathname to name", async () => {
    const { container, getByText } = render(
      <MemoryRouter initialEntries={[Routes.HOME]}>
        <AppContext.Provider value={{ setRoute }}>
          <CustomCard
            title={Languages[0].title}
            image={Languages[0].image}
            alt={Languages[0].alt}
            href={Languages[0].href}
          />
        </AppContext.Provider>
      </MemoryRouter>
    );

    let button = container.getElementsByTagName("button");
    await fireEvent.click(button);
    expect(location.pathname === "/assessment/name").toBeTruthy();
    expect(setRoute).toHaveBeenCalledWith(Languages[0].href);
  });
});
