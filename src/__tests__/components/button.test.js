import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button, { OptButton, LargeButton } from "../../components/button/button";

describe("<Button />", () => {
  afterEach(cleanup);

  // test button redering
  it("renders the <Button /> with children", () => {
    const { container, getByText } = render(
      <Button href="/signup" outline>
        Sign up
      </Button>
    );

    expect(getByText("Sign up")).toBeTruthy();
    expect(container.firstChild.getAttribute("href")).toBe("/signup");
    expect(container.firstChild.matches(".bg-white.text-green"));
    expect(container.firstChild).toMatchSnapshot();
  });

  // test button rendering with "large" prop
  it("renders the large <Button />", () => {
    const { container, getByText } = render(
      <BrowserRouter>
        <Button href="/signup" outline large>
          Sign up
        </Button>
      </BrowserRouter>
    );

    expect(getByText("Sign up").matches(".w-52"));
    expect(container.firstChild).toMatchSnapshot();
  });

  //test Optbutton
  it("renders the <OptButton />", () => {
    const choices = ["Yes", "No", "Maybe"];
    let checked = "";
    const clickAction = (choice) => {
      checked = choice;
    };
    const { container, getByText, getByTestId } = render(
      <div>
        {choices.map((choice, id) => (
          <OptButton
            key={choice}
            value={choice}
            checked={checked}
            action={() => clickAction(choice)}
          />
        ))}
      </div>
    );
    expect(getByText("Yes")).toBeTruthy();
    expect(getByText("No")).toBeTruthy();
    expect(getByText("Maybe")).toBeTruthy();

    const parentElement = getByText("Yes").parentElement;
    fireEvent.click(parentElement);
    // let checkedIconExists;
    // for (let i = 0; i < parentElement.children.length; i++) {
    //   if (parentElement.children[i].matches(".checked-icon")) {
    //     checkedIconExists = true;
    //     return;
    //   }
    // }
    expect(checked === "Yes").toBeTruthy();
    // expect(getByTestId("CheckOutlinedIcon").parentElement === parentElement).toBeTruthy();
    // expect(checkedIconExists).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  // <LargeButton />
  it("renders the <LargeButton />", () => {
    const { container, getByText } = render(<LargeButton innerText={"Next"} />);

    expect(getByText("Next")).toBeTruthy();
    expect(
      getByText("Next").parentElement.matches(
        ".text-green.border.border-green.bg-white.cursor-pointer"
      )
    ).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders the <LargeButton /> with type=next and disabled", () => {
    const { container, getByText } = render(
      <LargeButton type="next" disabled={true} innerText="Next" />
    );

    expect(getByText("Next")).toBeTruthy();
    expect(
      getByText("Next").parentElement.matches(
        ".text-white.bg-green.cursor-not-allowed.bg-opacity-50"
      )
    ).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
