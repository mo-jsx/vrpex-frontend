import { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import Graph from "../components/Graph";
import Loading from "../assets/load.gif";
import Usthb from "../assets/usthb.png";
import Ramy from "../assets/ramy.png";
import Error from "../assets/404.png";
import { useHistory } from "react-router-dom";

const Results = (props) => {
  const { result } = props;

  return (
    <div className="m-1 bg-slate-200 text-blue-900 rounded-md w-64 h-[88vh] p-2 overflow-y-auto">
      <h1 className="text-xl">
        <span className="font-bold">Nombre de tournées:</span> {result.length}
      </h1>
      <ul>
        {result
          .filter((tournée) => tournée.length > 2)
          .map((tournée, index) => (
            <li key={index} className="mb-2">
              <span className="font-bold text-lg">
                Tournée {index + 1} <br />
              </span>
              <span className="bg-slate-300">
                {tournée.map((location, index) => {
                  if (index === tournée.length) {
                    return (
                      <span className="text-sm">
                        {location === 0 ? "Depôt" : `Client ${location}`}
                      </span>
                    );
                  } else {
                    return (
                      <span className="text-sm">
                        {location === 0 ? " Depôt ➡️" : `Client ${location} ➡️`}
                      </span>
                    );
                  }
                })}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

const Cw = () => {
  const [num_trucks, setNum_trucks] = useState(0);
  const [max_capacity, setMax_capacity] = useState(0);
  const [max_distance, setMax_distance] = useState(0);

  const [demandFile, setDemandFile] = useState(null);
  const [demand, setDemand] = useState([]);

  const [matrixFile, setMatrixFile] = useState(null);
  const [matrix, setMatrix] = useState([]);

  // Returned result from server
  const [result, setResult] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const history = useHistory();

  const convertCSVToArray = (csvData, setter, flatten) => {
    Papa.parse(csvData, {
      complete: (results) => {
        const dataArray = results.data;
        const arr = dataArray
          .map((obj) => Object.values(obj).map((ele) => parseInt(ele)))
          .filter((ar) => !ar.some(Number.isNaN));

        if (flatten) {
          setter(arr.flat());
        } else {
          setter(arr);
        }
      },
      header: true,
    });
  };

  const handleFileUpload = (event, setterFile, setterArray, flatten) => {
    const file = event.target.files[0];
    setterFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      convertCSVToArray(contents, setterArray, flatten);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      num_trucks,
      max_capacity,
      max_distance,
      demand,
      matrix,
    };

    setIsLoading(true);

    axios
      .post("https://vrpex.azurewebsites.net/cw", data)
      .then((res) => {
        setResult(res.data);
        setIsLoading(false);
        setIsReady(true);
      })
      .catch((err) =>
        setIsError({
          error: `Y'a eu une erreur durant le traitement des fichiers: ${err.name}!\n Vérifier que vous avez choisi les bons fichiers CSV.`,
        })
      );
  };

  if (isLoading) {
    return (
      <div className="bg-white grid grid-cols-3 h-[90vh] mt-5 place-content-center">
        <div className="col-start-2 col-end-3 mx-auto">
          <img src={Loading} alt="loading" />
          <h1 className="text-5xl text-center mt-16">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="h-screen grid grid-cols-6 lg:grid-cols-3 grid-rows-8">
        <div className="col-start-1 col-end-7 lg:col-end-4 row-start-1 row-end-2 p-2 h-16">
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
              <img src={Usthb} alt="usthb logo" width={64} />
              <img src={Ramy} alt="ramy logo" width={64} />
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="col-start-2 col-end-6 lg:col-end-3 row-start-2 row-end-3 px-4 py-2"
        >
          <h2 className="text-5xl text-center mb-10 uppercase">
            Clarke & Wright
          </h2>

          <label htmlFor="num_trucks" className="flex flex-col mb-4">
            Entrer le nombre de camions:
            <input
              type="number"
              placeholder="Nombre de camions.."
              className="input border-slate-100 w-full"
              value={num_trucks}
              onChange={(e) => setNum_trucks(e.target.value)}
            />
          </label>

          <label htmlFor="max_capacity" className="flex flex-col mb-4">
            Entrer la capacité des camions:
            <input
              type="number"
              placeholder="Capacité des camions.."
              className="input border-slate-100 w-full"
              value={max_capacity}
              onChange={(e) => setMax_capacity(e.target.value)}
            />
          </label>

          <label htmlFor="max_distance" className="flex flex-col mb-4">
            Entrer la distance maximale parcourue par un camion:
            <input
              type="number"
              placeholder="Distance maximale.."
              className="input border-slate-100 w-full"
              value={max_distance}
              onChange={(e) => setMax_distance(e.target.value)}
            />
          </label>

          <div className="form-control w-full">
            <label htmlFor="demandFile" className="label">
              <span className="label-text">
                Téléverser le fichier contenant les demandes:
              </span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full"
              accept=".csv"
              onChange={(event) =>
                handleFileUpload(event, setDemandFile, setDemand, true)
              }
            />
          </div>

          <div className="form-control w-full">
            <label htmlFor="matrixFile" className="label">
              <span className="label-text">
                Téléverser le fichier contenant la matrice de distance:
              </span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full"
              accept=".csv"
              onChange={(event) =>
                handleFileUpload(event, setMatrixFile, setMatrix, false)
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-outline mt-10"
            disabled={
              num_trucks &&
              max_capacity &&
              max_distance &&
              demandFile &&
              matrixFile
                ? false
                : true
            }
          >
            Éxecuter
          </button>
        </form>
      </div>
    );
  }

  if (isReady) {
    return (
      <div className="m-4 h-[90vh] grid grid-cols-6 lg:grid-cols-3 items-center">
        <div className="col-start-2 col-end-6 lg:col-start-2 lg:col-end-3">
          {result.hasOwnProperty("error") && (
            <>
              <img src={Error} alt="Warning" className="m-auto w-64" />
              <h1 className="text-2xl text-center">Oops.. {result.error}</h1>
              {isError && <h2 className="text-center mt-4">{isError.error}</h2>}
            </>
          )}
        </div>
        {result.hasOwnProperty("output") && (
          <div className="col-start-1 lg:col-end-4 col-end-7 result">
            <div className="card">
              <Results result={result.output.filter((res) => res.length > 2)} />
            </div>
            <h1 className="heading">Clarke & Wright</h1>
            <Graph demand={demand} result={result.output} />
          </div>
        )}
      </div>
    );
  }
};

export default Cw;
