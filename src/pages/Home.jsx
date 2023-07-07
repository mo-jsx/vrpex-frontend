import { useState } from "react";
import { useHistory } from "react-router-dom";
import Usthb from "../assets/usthb.png";
import Ramy from "../assets/ramy.png";

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
          <img src={Usthb} alt="usthb logo" className="w-48 h-48 mt-10" />
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

      <div className="col-start-2 col-end-6 md:col-end-5 lg:col-end-4 row-start-5 row-end-6 place-content-center place-self-center">
        <div className="flex flex-row justify-center gap-10">
          <div>
            <h3>Réalisé par:</h3>
            <ul className="flex flex-col gap-1 mt-2 font-bold">
              <li>BOUSSEHAL Dounia</li>
              <li>GANA Katia</li>
            </ul>
          </div>

          <div>
            <h3>Encadré par:</h3>
            <ul className="flex flex-row gap-4 mt-2 font-bold">
              <li>SLIMANI Souad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
