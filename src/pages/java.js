import React, { useState } from "react";
import data from "../data/java(new).json";
import NameIcon from "../assets/images/name_icon.svg";
import { OptButton } from "../components/button/button";

export default function Java() {
  const [count, updateCount] = useState(0);
  const recordAnswer = () => {
    if (count === data.length - 1) {
      return null;
    } else {
      updateCount(count + 1);
    }
  };
  const createComponent = (question) => {
    return (
      <>
        <div className="h-16 mb-5">
          <h3 className="font-bold text-2xl md:text-3xl">{question}</h3>
        </div>
        <div className="mt-20">
          <OptButton action={recordAnswer} innerText="I know" />
          <OptButton action={recordAnswer} innerText="I don't know" />
        </div>
      </>
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
        <span className="ml-auto text-xl">
          {count + 1}/{data.length}
        </span>
      </div>
      {createComponent(data[count])}
      {/* <div className="mt-[5.5rem]">
        <NextButton
          disabled={!count}
          action={() =>
            count
              ? updateCount(count--)
              : count === data[data.length - 1]
              ? submit()
              : updateCount(count-1)
          }
          innerText={count === data[data.length - 1] ? "Submit" : "Back"}
        />
      </div> */}
    </div>
  );
}
