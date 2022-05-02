import React from "react";
import { render, cleanup } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import { AppContext } from "../../context/context";
import Personalise from "../../components/personalise/personalise";

describe("<Personalise />", () => {
  afterEach(cleanup);

  it("renders component correctly", () => {
    const name = "Joblyn";
    const { container, getByAltText } = render(
      <AppContext.Provider value={{ name }}>
        <Personalise />
      </AppContext.Provider>
    );
    expect(getByAltText("_three bottles_")).toBeTruthy();
    expect(container.getElementsByTagName("p")[0].innerHTML).toEqual("Personalising for Joblyn");
  });
});
