import React from "react";
import logo from "../../assets/images/logo.svg";
import Button from "../button/button";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

export default function Header() {
  const matches = useMediaQuery("(min-width:640px)");
  const [showBtns, setShowBtns] = React.useState(false);

  return (
    <div className="flex flex-row justify-between px-2 md:px-4 py-3 shadow-sm border-green border-b fixed top-0 z-30 w-full bg-white">
      <div className="w-fit">
        <a href="/">
          <img
            src={logo}
            alt="logo_icon"
            className="w-6 h-6 md:w-10 md:h-10 align-middle"
          />
        </a>
      </div>
      <div>
        <h1 className="text-base md:text-xl lg:text-3xl tracking-wide font-bold text-center p-2 uppercase">
          Software Interview Self Assessment
        </h1>
      </div>
      {matches ? (
        <div className="flex justify-center items-start">
          <Button outline href="/signin">
            Sign In
          </Button>
          <Button href="/signup">Sign Up</Button>
        </div>
      ) : (
        <div className="relative">
          <span className="toggle">
            <FormatAlignJustifyIcon
              className="text-green"
              onClick={() => setShowBtns(!showBtns)}
            />
          </span>

          {showBtns && (
            <div
              className={`flex flex-col justify-center w-28 h-fit p-2 shadow-sm shadow-green gap-2 absolute z-50 bg-white -left-24 top-[100%]`}
            >
              <Button outline href="/signin">
                Sign In
              </Button>
              <Button href="/signup">Sign Up</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
