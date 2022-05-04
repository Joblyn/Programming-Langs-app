import React, { useContext, useState } from "react";
import NameIcon from "../assets/images/name_icon.svg";
import { LargeButton } from "../components/button/button";
import { AppContext } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import * as Routes from "../constants/routes";

export default function Name() {
  const { route, setName } = useContext(AppContext);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const setButtonDisabled = ({ target }) => {
    if (!target.value) {
      setDisabled(true);
    } else {
      setName(target.value);
      setDisabled(false);
    }
  };

  const handleNavigate = () => {
    navigate(`/assessment/${route}`);
  };

  return (
    <div className="pt-10">
      <div className="flex items-center">
        <span className="align-middle mr-3">
          <Link to={Routes.HOME}>
            <img src={NameIcon} alt="_logo_" className="w-10 h-10" />
          </Link>
        </span>
        <span className="uppercase text-green text-lg font-bold ">
          Let's meet you
        </span>
      </div>
      <div>
        <h3 className="font-bold text-2xl md:text-3xl mb-4">
          First things first, who is taking the assessment?
        </h3>
      </div>
      <div>
        <input
          type="text"
          name="name_input"
          id="name_input"
          className="w-full lg:max-w-sm bg-white text-2xl placeholder:text-opacity-50 tracking-wider placeholder:tracking-wider placeholder:text-black-primary p-3 rounded-md border border-green text-black-primary my-3 font-bold focus:outline-0 focus:outline-offset-0"
          onChange={setButtonDisabled}
          placeholder="Your name"
          data-testid="name_input"
        />
        <div className="flex">
          <LargeButton
            type="next"
            disabled={disabled}
            onClick={disabled ? null : handleNavigate}
            innerText="Next"
          />
        </div>
      </div>
    </div>
  );
}
