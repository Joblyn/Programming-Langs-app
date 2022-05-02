import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Question from "../../components/question/question";
import { Provider } from "react-redux";
import { store } from "../../utilities/redux/store";

describe("<Question />", () => {
  afterEach(cleanup);

  const question = {
    text: "Do yo know Javascript objects?",
    choices: "Yes|No|Maybe",
  };
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
});
