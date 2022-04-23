import React, { useState, useEffect } from "react";
import { OptButton } from "../button/button";

export default function Question(props) {
  const { question, setResponses, id } = props;
  const [checked, setChecked] = useState("");
  let prop = "question_" + id;

  useEffect(() => {
    setChecked("");
  }, [question]);

  return (
    <div className="mb-4">
      <div className="mb-4 flex flex-row items-start">
        <span className="text-lg mr-3 mt-1">{id + 1}.</span>
        <h3 className="font-bold text-2xl ">{question}</h3>
      </div>
      <div className="mt-2 px-6" >
        <OptButton
          value="I know"
          name="options"
          checked={checked}
          action={() => {
            setChecked("I know");
            setResponses((responses) => {
              let newResponses = {...responses};
              newResponses[prop] = "I know"
              return newResponses;
            });
          }}
        />
        <OptButton
          value="I don't know"
          name="options"
          checked={checked}
          // setChecked={() => setChecked("I don't know")}
          action={() => {
            setChecked("I don't know");
            setResponses((responses) => {
              let newResponses = {...responses};
              newResponses[prop] = "I don't know"
              return newResponses;
            });
          }}
        />
      </div>
    </div>
  );
}
