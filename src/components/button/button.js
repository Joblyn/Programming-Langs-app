import React from "react";
import { Link } from "react-router-dom";

export default function Button({ outline, href, children }) {
  return (
    <a
      className={`btn rounded-md px-1.5 md:px-6 py-1 md:py-1.5 mx-1 md:mx-2 ${
        outline ? "bg-white text-green" : "bg-green text-white"
      } border border-green text-sm md:text-base cursor-pointer transition-all inline-flex items-center justify-center select-none text-center shadow-md`}
      href={href}
    >
      {children}
    </a>
  );
}

export const OptButton = ({ action, innerText, href, ...restProps }) => {
  return (
    <Link to="/java">
      <div
        className={`w-80 text-black-primary bg-white border border-green
        cursor-pointer p-2 text-lg flex justify-center items-center  rounded-md my-2 btn hover:bg-green hover:text-white`}
        onClick={action}
        {...restProps}
      >
        <span className="px-[7px] font-bold tracking-wider">
          {innerText}
        </span>
      </div>
    </Link>
  );
};

export const NextButton = ({ disabled, action, innerText, ...restProps }) => {
  return (
    <div
      className={`w-full md:w-80 text-white bg-green uppercase ${
        disabled
          ? "cursor-not-allowed bg-opacity-50"
          : "cursor-pointer hover:opacity-80"
      }  p-3 text-2xl flex justify-center items-center rounded-md my-3 btn`}
      onClick={action}
      {...restProps}
    >
      <span className="px-[7px] font-bold tracking-wider text-white">{innerText}</span>
    </div>
  );
};
