import React, { useState, useEffect, createElement } from "react";
import NameIcon from "../assets/images/name_icon.svg";
import ProgressLine from "../components/progress/progressline";
import { LargeButton } from "../components/button/button";
import Question from "../components/question/question";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../utilities/redux/actions/questions";
import Loader from "../components/loader/loader";
import { updateResponses } from "../utilities/redux/actions/responses";

export default function Assessment() {
  const [count, updateCount] = useState(1);
  const [startEnd, setStartEnd] = useState({ start: 0, end: 5 });
  const responseStore = useSelector((state) => state.responses);
  const [responses, setResponses] = useState({});
  const [last, setLast] = useState(false);
  const [data, setData] = useState([]);
  const remainder = data.length % 5;
  const quotient = parseInt(data.length / 5);
  const matches = useMediaQuery("(min-width:960px)");
  const { language } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuestions());
  }, [language, dispatch]);

  useEffect(() => {
    if (questions.isSuccessful) {
      setData(questions.data);
    }
    if (questions.isError) {
      console.log(questions.error);
      setError({ type: "fetch error", message: error });
    }
  }, [questions, error]);

  useEffect(() => {
    if (remainder === 0) {
      if (count === quotient) {
        setLast(true);
      } else {
        setLast(false);
      }
      return;
    }
  }, [count, remainder, quotient]);

  const nextQuestionsSet = () => {
    dispatch(updateResponses(responses));
    updateCount((count) => count + 1);
    if (remainder) {
      if (count === quotient) {
        setStartEnd(({ end }) => ({ start: end }));
        setLast(true);
        setResponses({});
        setError({});
      }
    } else {
      setStartEnd(({ end }) => ({ start: end, end: end + 5 }));
      setResponses({});
      setError({});
    }
    navigate(`/assessment/${language}#top`);
  };

  const previousQuestionSet = () => {
    updateCount((count) => count - 1);
    setStartEnd(({ start, end }) => ({ start: start - 5, end: end - 5 }));
    setError({});
  };

  useEffect(() => {
    console.log(responses);
  }, [responses]);

  const createCommponent = () => {
    let questions;
    const getProps = (questions, id) => ({
      className: id === questions.length - 1 ? "pb-[173px] md:pb-[100px]" : "",
      key: "question_" + id,
    });
    questions = data.slice(startEnd.start, startEnd.end);
    if (startEnd.end === undefined && startEnd.start) {
      questions = data.slice(startEnd.start);
    }
    return questions.map((question, id) => {
      let propName = "question_" + question.id;
      return createElement(
        "div",
        getProps(questions, id),
        <Question
          propName={propName}
          id={id}
          defaultValue={responseStore[propName]}
          question={question}
          setResponses={setResponses}
        />
      );
    });
  };

  let incompleteResponses = Object.values(responses).includes("");

  return (
    <div className="w-full relative" id="top">
      <div className="flex items-center my-2 w-full">
        <span className="align-middle mr-3">
          <img src={NameIcon} alt="_logo_" className="w-10 h-10" />
        </span>
        <span className="uppercase text-green text-lg font-bold ">
          {`${language} assessment`}
        </span>
      </div>
      {data.length ? (
        <>
          <ProgressLine count={count} totalcount={quotient} />
          {createCommponent()}
          {error.type === "incomplete responses" && (
            <p className="text-[red] text-base px-6">{error.message}</p>
          )}
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
            {/* <a href="#top"> */}
            <LargeButton
              type="next"
              innerText={last ? "Finish" : "Next"}
              disabled={incompleteResponses}
              action={
                incompleteResponses
                  ? () =>
                      setError({
                        type: "incomplete responses",
                        message: "Please fill in all fields",
                      })
                  : last
                  ? null
                  : nextQuestionsSet
              }
            />
            {/* </a> */}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
