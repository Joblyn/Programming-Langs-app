import React, { useState, useEffect, createElement } from "react";
import NameIcon from "../assets/images/name_icon.svg";
import ProgressLine from "../components/progress/progressline";
import { LargeButton } from "../components/button/button";
import Question from "../components/question/question";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../utilities/redux/actions/questions";
import Loader from "../components/loader/loader";

export default function Assessment() {
  const { language } = useParams();
  const [count, updateCount] = useState(1);
  const [startEnd, setStartEnd] = useState({ start: 0, end: 5 });
  const [data, setData] = useState([]);

  const [last, setLast] = useState(false);
  const remainder = data.length % 5;
  const quotient = parseInt(data.length / 5);
  const matches = useMediaQuery("(min-width:960px)");
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questions);
  const [questionsState, setQuestionsState] = useState([]);

  const responseStore = useSelector((state) => state.responses);
  const [responses, setResponses] = useState({});

  const [error, setError] = useState({});

  // dispatch action to fetch questions and store at redux store
  useEffect(() => {
    dispatch(getQuestions());
  }, [language, dispatch]);

  // store all language questions from redux store
  useEffect(() => {
    if (questions.isSuccessful) {
      setData(questions.data);
    }
    if (questions.isError) {
      console.error()
      setError({ type: "fetch error", message: error });
    }
  }, [questions, error]);

  // set current questions and responses sets
  useEffect(() => {
    if (startEnd.end === undefined) {
      setQuestionsState(data.slice(startEnd.start));
    } else {
      setQuestionsState(data.slice(startEnd.start, startEnd.end));
    }
  }, [data, startEnd]);

  // check if current questions set is the last and update state
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

  // update responses state
  useEffect(() => {
    setResponses(function () {
      let obj = {};
      questionsState.forEach((question) => {
        let prop = `question_${question.id}`;
        obj = { ...obj, [prop]: responseStore[prop] || "" };
      });
      return obj;
    });
  }, [questionsState, responseStore]);

  const nextQuestionsSet = () => {
    updateCount((count) => count + 1);
    if (remainder) {
      if (count === quotient) {
        setStartEnd(({ end }) => ({ start: end }));
        setLast(true);
        setError({});
      }
    } else {
      setStartEnd(({ end }) => ({ start: end, end: end + 5 }));
      setError({});
    }
  };

  const previousQuestionSet = () => {
    updateCount((count) => count - 1);
    setStartEnd(({ start, end }) => ({ start: start - 5, end: end - 5 }));
    setError({});
  };

  const createCommponent = () => {
    const getProps = (questions, id) => ({
      className: id === questions.length - 1 ? "pb-[173px] md:pb-[100px] question_container" : "question_container",
      key: "question_" + id,
    });
    return questionsState.map((question, id) => {
      let propName = "question_" + question.id;
      return createElement(
        "div",
        getProps(questionsState, id),
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
      {questionsState.length ? (
        <>
          <ProgressLine count={count} totalcount={quotient} />
          {createCommponent()}
          <div className={`${matches ? "px-6 pb-6" : "assessment_footer"}`}>
            {error.type === "incomplete responses" && (
              <p className="text-[red] text-base px-6">{error.message}</p>
            )}
            <div className="flex gap-3">
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
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
