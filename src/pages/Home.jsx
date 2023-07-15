import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Ramy } from "../assets";

const Home = () => {
  const [method, setMethod] = useState("");
  const history = useHistory();

  const handleOptionChange = (event) => {
    setMethod(event.target.value);
  };

  const handleSubmit = () => {
    history.push(`/${method}`);
  };

  const options = [
    {
      value: "cw",
      name: "Clarke & Wright",
    },
    {
      value: "gen",
      name: "Génétique",
    },
  ];

  return (
    <div className="grid grid-cols-6 md:grid-cols-5 lg:grid-cols-4 w-screen h-screen grid-rows-6">
      <form
        onSubmit={handleSubmit}
        className="p-4 col-start-2 col-end-6 md:col-end-5 lg:col-end-4 row-start-2 row-end-5 content-center items-center self-center place-items-center place-self-center place-content-center"
      >
        <div className="w-full flex justify-center mb-8">
          <img src={Ramy} alt="ramy logo" />
        </div>
        <h2 className="text-3xl text-white">
          Choisissez une méthode de résolution:{" "}
        </h2>

        <div className="flex flex-col mt-4">
          <select
            value={method}
            onChange={handleOptionChange}
            className="select select-bordered select-lg select-primary w-full"
          >
            <option value={""} disabled>
              Sélctionner
            </option>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="btn btn-primary w-32 mt-4"
            disabled={method === "" ? true : false}
          >
            Choisir
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
