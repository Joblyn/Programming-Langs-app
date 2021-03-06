import React from "react";
import { render, cleanup } from "@testing-library/react";
import Question from "../../components/question/question";
import { Provider } from "react-redux";
import { store } from "../../utilities/redux/store";

describe("<Question />", () => {
  afterEach(cleanup);

  const question = {
    text: "Do yo know Javascript objects?",
    choices: "Yes|No|Maybe",
  };
  const defaultValue = "Yes";
  // UI test
  it("renders component correctly", () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <Question question={question} />
      </Provider>
    );

    expect(getByText(question.text)).toBeTruthy();
    expect(getByText("Yes")).toBeTruthy();
    expect(getByText("No")).toBeTruthy();
    expect(getByText("Maybe")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  // renders with preselected option
  it("renders with defaultValue prop", () => {
    const { container, getByText, getByTestId } = render(
      <Provider store={store}>
        <Question question={question} defaultValue={defaultValue} />
      </Provider>
    );

    expect(getByTestId("CheckOutlinedIcon").parentElement).toBe(
      getByText("Yes").parentElement
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
