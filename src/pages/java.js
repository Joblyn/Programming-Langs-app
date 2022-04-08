import React, { useState } from "react";
import data from "../data/java(new).json";
import NameIcon from "../assets/images/name_icon.svg";
import ProgressLine from "../components/progress/progressline";
import Question from "../components/question/question";

export default function Java() {
  const [count, updateCount] = useState(Number(0));
  const createCommponent = () => {
    return (
      <Question
        updateCount={updateCount}
        count={count}
        question={data[count]}
        totalCount={data.length}
      />
    );
  };
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
      <ProgressLine count={count} totalCount={data.length} />
      {createCommponent()}
    </div>
  );
}
