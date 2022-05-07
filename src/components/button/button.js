import React from "react";
import { Link } from "react-router-dom";
import "./button.scss";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

export default function Button({ outline, href, children, large }) {
  if (large) {
    return (
      <Link
        className={`btn rounded-md p-3 mx-1 md:mx-2 ${
          outline ? "bg-white text-green" : "bg-green text-white"
        } border border-green cursor-pointer transition-all hover:bg-lightgreen hover:text-green inline-flex items-center justify-center select-none text-center shadow-md md:w-80 w-52 uppercase text-2xl animation_click`}
        to={href}
      >
        {children}
      </Link>
    );
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

export const OptButton = ({
  action,
  innerText,
  href,
  value,
  checked,
  setChecked,
  ...restProps
}) => {
  return (
    <div
      className={`w-full lg:max-w-sm rounded-md bg-white border border-green text-lg flex justify-center items-center my-2 btn hover:bg-green hover:text-white text-black-primary relative ${
        checked === value ? "checked" : ""
      } opt-cont active:scale-95`}
    >
      <label
        className={`w-full p-2.5 opt-label cursor-pointer relative`}
        onClick={action}
        {...restProps}
      >
        {checked === value && (
          <CheckOutlinedIcon className="checked-icon text-white absolute" data-testid="CheckOutlinedIcon"/>
        )}
        <span className="tracking-wider w-full text-center">{value}</span>
      </label>
    </div>
  );
};

export const LargeButton = ({
  type,
  disabled,
  action,
  innerText,
  ...restProps
}) => {
  return (
    <div
      className={`w-full lg:max-w-sm ${
        type === "next"
          ? "text-white bg-green"
          : "text-green border border-green bg-white"
      } active:scale-95 uppercase ${
        disabled
          ? "cursor-not-allowed bg-opacity-50"
          : "cursor-pointer hover:opacity-80"
      }  p-3 text-2xl flex justify-center items-center rounded-md my-3 btn`}
      onClick={action}
      {...restProps}
    >
      <span className="px-[7px] font-bold tracking-wider">{innerText}</span>
    </div>
  );
};
