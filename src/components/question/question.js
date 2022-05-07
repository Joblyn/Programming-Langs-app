import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateResponses } from "../../utilities/redux/actions/responses";
import { OptButton } from "../button/button";

export default function Question(props) {
  const { propName, question, setResponses, id, defaultValue } = props;
  const [checked, setChecked] = useState(defaultValue);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setChecked(defaultValue || "");
  }, [question, defaultValue]);

  const clickAction = (choice) => {
    setChecked(choice);
    setResponses((state) => {
      let newResponses = { ...state };
      newResponses[propName] = choice;
      return newResponses;
    });
    dispatch(updateResponses({ [propName]: choice }));
  };

  return (
    <div className="mb-4">
      <div className="mb-4 flex flex-row items-start">
        <span className="text-lg mr-3 mt-1 question_number">{id + 1}.</span>
        <h3 className="font-bold text-2xl">{question.text}</h3>
      </div>
      <div className="mt-2 px-6">
        {question.choices.split("|").map((choice, id) => (
          <OptButton
            key={choice}
            value={choice}
            checked={checked}
            action={() => clickAction(choice)}
          />
        ))}
      </div>
    </div>
  );
}
