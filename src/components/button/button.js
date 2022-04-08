import React from "react";
import { Link } from "react-router-dom";
import "./button.scss";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export default function Button({ outline, href, children, large }) {
  if (large) {
    return (
      <Link
      className={`btn rounded-md p-3 mx-1 md:mx-2 ${
        outline ? "bg-white text-green" : "bg-green text-white"
      } border border-green cursor-pointer transition-all hover:bg-lightgreen hover:text-green inline-flex items-center justify-center select-none text-center shadow-md md:w-80 w-52 uppercase text-2xl font-bold animation_click`}
      to={href}
    >
      {children}
    </Link>
    )
  }
  return (
    <a
      className={`btn rounded-md px-1.5 md:px-2 py-1 md:py-1.5 mx-1 md:mx-2 ${
        outline ? "bg-white text-green" : "bg-green text-white"
      } border border-green text-sm md:text-base hover:bg-lightgreen hover:text-green cursor-pointer transition-all inline-flex items-center justify-center select-none text-center md:h-10 w-20 shadow-md`}
      href={href}
    >
      {children}
    </a>
  );
}

export const OptButton = ({ action, innerText, href, name, value, checked, setChecked, ...restProps }) => {
  return (
    <div className={`w-80 rounded-md bg-white border border-green text-lg flex justify-center items-center my-2 btn hover:bg-green hover:text-white text-black-primary relative opt-cont ${(checked === value) ? "checked" : ""} opt-cont`}>
      <label
        className={`w-full p-2.5 opt-label cursor-pointer relative`}
        onClick={() => setChecked(value)}
        {...restProps}
      > 
        {checked === value && <CheckOutlinedIcon className="checked-icon text-white absolute"/>}
        <span className="font-bold tracking-wider w-full text-center">
          {value}
        </span>
      </label>
    </div>
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
