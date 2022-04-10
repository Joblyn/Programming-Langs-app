import React, { useState } from "react";
import { NextButton, OptButton } from "../button/button";

export default function Question(props) {
  const { updateCount, question, totalCount, count } = props;
  const [checked, setChecked] = useState("");
  const nextQuestion = () => {
    updateCount((count) => count + 1);
    setChecked("");
  };
  return (
    <div>
      <div className="h-16 mb-5">
        <h3 className="font-bold text-2xl md:text-3xl">{question}</h3>
      </div>
      <div className="mt-20">
        <OptButton
          value="I know"
          name="options"
          checked={checked}
          setChecked={setChecked}
        />
        <OptButton
          value="I dont't know"
          name="options"
          checked={checked}
          setChecked={setChecked}
        />
      </div>
      <div className="mt-[5rem]">
        <NextButton
          innerText={count === (totalCount-1) ? "Finish" : "Next"}
          disabled={checked === ""}
          action={(count !== totalCount-1) ? ( checked !== "") ? nextQuestion : null : null }
        />
      </div>
    </div>
  );
}
