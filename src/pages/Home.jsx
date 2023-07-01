import { useState } from "react";
import { useHistory } from "react-router-dom";

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
      value: "gluton",
      name: "Gluton",
    },
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
    <div className="grid grid-cols-3 grid-rows-3  w-screen h-screen">
      <form
        onSubmit={handleSubmit}
        className=" p-4 content-center items-center self-center place-items-center place-self-center place-content-center col-start-2 col-end-3 row-start-2 row-end-3"
      >
        <div className="w-full flex justify-center">
          <img src="/ramy.png" alt="ramy logo" />
        </div>
        <h2 className="text-3xl text-white">
          Choisissez une methode de resolution:{" "}
        </h2>

        <div className="flex flex-col mt-4">
          <select
            value={method}
            onChange={handleOptionChange}
            className="select select-bordered select-lg select-primary w-full"
          >
            <option value={""} disabled>
              Selectionner
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
