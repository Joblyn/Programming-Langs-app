import React, { useState, useEffect } from "react";
import data from "../data/java(new).json";
import NameIcon from "../assets/images/name_icon.svg";
import ProgressLine from "../components/progress/progressline";
// import { NextButton } from "../components/button/button";
import { NextButton } from "../components/button/button";
import Question from "../components/question/question";

export default function Java() {
  const [count, updateCount] = useState(1);
  const [startEnd, setStartEnd] = useState({ start: 0, end: 4 });
  const [responses, setResponses] = useState({ question_0: "" });
  const [last, setLast] = useState(false);
  const remainder = data.length % 5;
  const quotient = parseInt(data.length / 5);
  // const [generate, setGenerate] = useState(true);

  console.log(responses);

  useEffect(() => {
    if (remainder === 0) {
      if (count === quotient) {
        setLast(true);
      }
      return;
    }
  }, [count, remainder, quotient]);

  const [clicked, setClicked] = useState();

  const nextQuestionsSet = () => {
    updateCount((count) => count + 1);
    if (remainder) {
      if (count === quotient) {
        setStartEnd(({ start, end }) => ({ start: end + 1 }));
        setLast(true);
        setResponses({});
      }
    } else {
      setStartEnd(({ start, end }) => ({ start: end + 1, end: end + 4 }));
      setResponses({});
    }
    setClicked(true);
  };

  const createCommponent = () => {
    if (startEnd.end === undefined && startEnd.start) {
      return (
        <>
          {data.slice(startEnd.start).map((question, id) => (
            <Question
              key={"question_" + id}
              id={id}
              question={question}
              setResponses={setResponses}
              clicked={clicked}
            />
          ))}
        </>
      );
    }

    return (
      <>
        {data.slice(startEnd.start, startEnd.end).map((question, id) => (
          <Question
            id={id}
            key={"question_" + id}
            question={question}
            setResponses={setResponses}
          />
        ))}
      </>
    );
  };

  console.log("values", Object.values(responses));
  let responsesArr = Object.values(responses);
  return (
    <div className="w-full">
      <div className="flex items-center my-2 w-full">
        <span className="align-middle mr-3">
          <img src={NameIcon} alt="_logo_" className="w-10 h-10" />
        </span>
        <span className="uppercase text-green text-lg font-bold ">
          JAVA ASSESSMENT
        </span>
      </div>
      <ProgressLine count={count} totalCount={quotient} />
      {createCommponent()}
      {data?.length ? (
        <div className="mt-[5rem] ml-6">
          <NextButton
            innerText={last ? "Finish" : "Next"}
            disabled={
              responsesArr.length !== 5 && responsesArr.includes("")
                ? true
                : false
            }
            action={responsesArr.includes("") ? null : last ? null : nextQuestionsSet}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
