import React from "react";
import { useHistory } from "react-router-dom";
import { Ramy } from "../assets";

const Navigation = () => {
  const history = useHistory();

  return (
    <div className="col-start-1 col-end-7 lg:col-end-4 row-start-1 row-end-2 px-2 h-auto">
      <div className="flex flex-row justify-between">
        <button
          onClick={() => {
            history.push("/");
            window.location.reload();
          }}
          className="btn btn-secondary btn-outline btn-xs mt-4 rounded-sm"
        >
          Retour
        </button>

        <div className="flex flex-row gap-4">
          <img src={Ramy} alt="ramy logo" width={64} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
