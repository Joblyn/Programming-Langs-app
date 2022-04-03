import React from "react";

export default function Button({ outline, href, children }) {
  return (
    <a
      className={`btn rounded-md px-1.5 md:px-6 py-1 md:py-1.5 mx-1 md:mx-2 ${
        outline ? "bg-white text-green" : "bg-green text-white"
      } border border-green text-sm md:text-base cursor-pointer transition-all inline-flex items-center justify-center select-none text-center shadow-md`}
      href={href}
    >{children}</a>
  );
}
