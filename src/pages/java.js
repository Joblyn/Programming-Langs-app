import React, { useState, useEffect, createElement } from "react";
import data from "../data/java(new).json";
import NameIcon from "../assets/images/name_icon.svg";
import ProgressLine from "../components/progress/progressline";
import { LargeButton } from "../components/button/button";
import Question from "../components/question/question";
import { useMediaQuery } from "@mui/material";
import { client } from "../utilities/axios";

export default function Java() {
  const [count, updateCount] = useState(1);
  const [startEnd, setStartEnd] = useState({ start: 0, end: 5 });
  const [responses, setResponses] = useState({ question_0: "" });
  const [last, setLast] = useState(false);
  const remainder = data.length % 5;
  const quotient = parseInt(data.length / 5);
  const matches = useMediaQuery("(min-width:960px)");

  useEffect(() => {
    client()
      .then((data) => console.log(data))
      .catch((error) => {
        console.error();
        throw error;
      });
  }, []);

  useEffect(() => {
    if (remainder === 0) {
      if (count === quotient) {
        setLast(true);
      }
      return;
    }
  }, [count, remainder, quotient]);

  const nextQuestionsSet = () => {
    updateCount((count) => count + 1);
    if (remainder) {
      if (count === quotient) {
        setStartEnd(({ start, end }) => ({ start: end }));
        setLast(true);
        setResponses({});
      }
    } else {
      setStartEnd(({ start, end }) => ({ start: end, end: end + 5 }));
      setResponses({});
    }
  };

  const previousQuestionSet = () => {
    updateCount((count) => count - 1);
    setStartEnd(({ start, end }) => ({ start: start - 5, end: end - 5 }));
  };

  const createCommponent = () => {
    let questions;
    const getProps = (questions, id) => ({
      className: id === questions.length - 1 ? "pb-[173px]" : "",
      key: "question_" + id,
    });
    if (startEnd.end === undefined && startEnd.start) {
      questions = data.slice(startEnd.start);
      return (
        <>
          {questions.map((question, id) =>
            createElement(
              "div",
              getProps(questions, id),
              <Question
                id={id}
                question={question}
                setResponses={setResponses}
              />
            )
          )}
        </>
      );
    }
    questions = data.slice(startEnd.start, startEnd.end);
    return (
      <>
        {questions.map((question, id) =>
          createElement(
            "div",
            getProps(questions, id),
            <Question id={id} question={question} setResponses={setResponses} />
          )
        )}
      </>
    );
  };

  let responsesArr = Object.values(responses);
  return (
    <div className="w-full relative">
      <div className="flex items-center my-2 w-full">
        <span className="align-middle mr-3">
          <img src={NameIcon} alt="_logo_" className="w-10 h-10" />
        </span>
        <span className="uppercase text-green text-lg font-bold ">
          JAVA ASSESSMENT
        </span>
      </div>
      <ProgressLine count={count} totalcount={quotient} />
      {createCommponent()}
      {data?.length ? (
        <div
          className={`${
            matches ? "px-6 pb-6" : "assessment_footer"
          } flex gap-3`}
        >
          {count !== 1 && (
            <LargeButton
              type="back"
              innerText={"Back"}
              action={previousQuestionSet}
            />
          )}
          <LargeButton
            type="next"
            innerText={last ? "Finish" : "Next"}
            disabled={responsesArr.length === 5 ? false : true}
            action={
              responsesArr.includes("") ? null : last ? null : nextQuestionsSet
            }
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
