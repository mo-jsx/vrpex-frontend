import React from "react";
import { Loading as GIF } from "../assets";

const Loading = () => {
  return (
    <div className="bg-white grid grid-cols-3 h-[90vh] mt-5 place-content-center">
      <div className="col-start-2 col-end-3 mx-auto">
        <img src={GIF} alt="loading" />
        <h1 className="text-5xl text-center mt-16">Calcul en cours...</h1>
      </div>
    </div>
  );
};

export default Loading;
