import React from "react";
import { render, cleanup, fiireEvent, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
// import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";

import { Assessment } from "../../pages";
import { AppContext } from "../../context/context";
import App from "../../App";
import { getQuestions } from "../../utilities/redux/actions/questions";
import { store } from "../../utilities/redux/store";
import { act } from "react-test-renderer";

// test the app at assessment page
describe("<Assessment />", () => {
  afterEach(cleanup);

  // mock react-router-dom to return params
  // jest.mock("react-router-dom", () => ({
  //   ...jest.requireActual("react-router-dom"),
  //   useParams: () => ({
  //     language: "java",
  //   }),
  // }));

  test("renders loader when questions are not available", () => {
    // mock redux store
    const mockDispatch = jest.fn(() => null);
    jest.mock("react-redux", () => ({
      useDispatch: () => mockDispatch,
    }));

    // change pathname to assessment/:language
    const history = createMemoryHistory();
    history.push("/assessment/java");
    const { container, getByTestId, getByText } = render(
      // <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <Assessment />
      </Provider>
      // </Router>
    );

    // const getQuestionsResult = getQuestions();
    // expect(getQuestionsResult).toBe(null);

    // expect a header with text stating the language assessment
    // expect(getByText("Java assessment", { exact: false }));

    // component renders loader when questions are not available
    expect(getByTestId("loader-container")).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();
  });

  test("renders questions when questions are ready", async () => {
    // mock getQuestions function to return null value
    // const getQuestions = jest.fn();
    // jest.mock("../../utilities/redux/actions/questions", () => {
    //   const originalModule = jest.requireActual(
    //     "../../utilities/redux/actions/questions"
    //   );
    //   return {
    //     _esModule: true,
    //     ...originalModule,
    //     getQuestions: () => getQuestions,
    //   };
    // });

    const questionsData = Array.from(new Array(10), (val, id) => ({
      id: id + 1,
      text: "Do you understand Javascript objects?",
      choices: "Yes|No|Maybe",
    }));
    const mockDispatch = jest.fn(() => null);
    const mockUseSelector = jest.fn().mockReturnValue({
        isSuccessful: true,
        isError: false,
        error: null,
        data: questionsData,
      }
    )
    jest.mock("react-redux", () => {
      return {
        ...jest.requireActual("react-redux"),
        useSelector: () => mockUseSelector,
        useDispatch: () => mockDispatch,
      };
    });

    const { container, getByText, getByTestId } = render(
      <Provider store={store}>
        <Assessment />
      </Provider>
    );

    const mockQuestions = mockUseSelector(state => state.questions);
    expect(mockQuestions).toBe();
    // expect to see 5 questionswf on the page
    expect(container.getElementsByClassName("question_container").length).toBe(5);
    // expect questions to be numbered
    expect(container.getElementsByClassName("question_number")).toBe(5);
    // expect to see options
    expect(
      container
        .getElementsByClassName("question_container")[0]
        .contains(".opt-cont")
    ).toBeTruthy();
    // expect to progress count to be 1/2
    expect(getByText("1/2")).toBeTruthy();

    // user cannot move to next set without all options being filled, show an error message
    await fireEvent.click(getByText(/next/));
    expect(getByText(/Please fill in all fields/)).toBeTruthy();
    expect(getByText("1/2")).toBeTruthy();

    // await act(async () => {
    //   await fireEvent.change()
    // });
  });
});
// render with store
// component calls getQuestions() once rendered
// questions are updated
// component renders questions with options
// check that count is 1
// user cannot click next without options being filled
// click an option for one question
// next button should be disabled
// click an option for every question
// next button should enabled
// user clicks next button
// check new set of questions
// check that button cannot be clicked
// check that count is 2
// click back button
// check that count is 1
// check that next button is not disabled
// click next button
// check that count is 2
