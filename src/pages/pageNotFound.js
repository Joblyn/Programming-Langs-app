import React from "react";
import Button from "../components/button/button";
import Header from "../components/header/header";

export default function PageNotFound() {
  return (
    <main>
      <Header />
      <div className="h-screen w-full flex flex-col items-center text-center px-3 pt-[7rem] md:pt-[7rem]">
        <div className="">
          <h1 className="text-base md:text-xl lg:text-3xl tracking-wide font-bold mb-20 md:mb-[200px]">
            The page you're looking for does not exist!
          </h1>
          <Button large href="/">
            Return Home
          </Button>
        </div>
      </div>
    </main>
  );
}
