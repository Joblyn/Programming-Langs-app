import React, { useContext } from "react";
import Canstack from "../../assets/images/personalise.avif";
import { AppContext } from "../../context/context";

export default function Personalise() {
  const { name } = useContext(AppContext);

  return (
    <div className="h-full pt-10">
      <div className="mb-4">
        <img
          src={Canstack}
          alt="_three bottles_"
          className="h-36 w-auto max-w-32"
        />
      </div>
      <div className="tracking-wider">
        <p className="text-lg font-bold tracking-wider">
          Personalising for {name}
        </p>
      </div>
    </div>
  );
}
