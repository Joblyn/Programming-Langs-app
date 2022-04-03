import React from "react";
import logo from "../../assets/images/logo.svg";
import Button from "../button/button";

export default function Header() {
  return <div className="flex flex-row justify-between px-2 md:px-4 py-3 shadow-md shadow-lightgreen fixed top-0 z-100">
    <div className="w-fit"><a href="/"><img src={logo} alt="logo_icon" className="w-6 h-6 md:w-10 md:h-10 align-middle"/></a></div>
    <div><h1 className="text-base md:text-xl lg:text-3xl tracking-wide font-bold text-center p-2 uppercase">Software Interview Self Assessment</h1></div>
    <div className="flex justify-center items-start">
      <Button outline href="/signin">Sign In</Button>
      <Button href="/signup">Sign Up</Button>
    </div>
  </div>
}