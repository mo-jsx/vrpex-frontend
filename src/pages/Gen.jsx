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

const Gen = () => {
  const [num_trucks, setNum_trucks] = useState(0);
  const [max_capacity, setMax_capacity] = useState(0);
  const [max_distance, setMax_distance] = useState(0);
  const [nb_Iteration, setNb_Iteration] = useState(0);
  const [populationSize, setPopulationSize] = useState(0);
  const [nb_selected_parents, setNb_selected_parents] = useState(0);

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

  const convertCSVToArray = (csvData, setter, flatten, isHeader = true) => {
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
      header: isHeader,
    });
  };

  const handleFileUpload = (
    event,
    setterFile,
    setterArray,
    flatten,
    isHeader
  ) => {
    const file = event.target.files[0];
    setterFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      convertCSVToArray(contents, setterArray, flatten, isHeader);
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
      nb_selected_parents,
      nb_Iteration,
      populationSize,
    };

    setIsLoading(true);

    axios
      .post("https://vrpex.azurewebsites.net/gen", data)
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
          <h1 className="text-5xl text-center mt-16">Calcule en cours...</h1>
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
          className="col-start-2 col-end-6 lg:col-end-3 px-4 py-2"
        >
          <h2 className="text-5xl text-center mb-10 uppercase">Génétique</h2>

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

          <label htmlFor="nb_Iteration" className="flex flex-col mb-4">
            Entrer le nombre d'iteration:
            <input
              type="number"
              placeholder="Nombre d'iteration.."
              className="input border-slate-100 w-full"
              value={nb_Iteration}
              onChange={(e) => setNb_Iteration(e.target.value)}
            />
          </label>

          <label htmlFor="populationSize" className="flex flex-col mb-4">
            Entrer la taille de la population:
            <input
              type="number"
              placeholder="Taille de la population.."
              className="input border-slate-100 w-full"
              value={populationSize}
              onChange={(e) => setPopulationSize(e.target.value)}
            />
          </label>

          <label htmlFor="nb_selected_parents" className="flex flex-col mb-4">
            Entrer la taille de la selection:
            <input
              type="number"
              placeholder="Taille de la population.."
              className="input border-slate-100 w-full"
              value={nb_selected_parents}
              onChange={(e) => setNb_selected_parents(e.target.value)}
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
              className="file-input file-input-bordered file-input-success w-full"
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
              className="file-input file-input-bordered file-input-success w-full"
              accept=".csv"
              onChange={(event) =>
                handleFileUpload(event, setMatrixFile, setMatrix, false, false)
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-success btn-outline mt-10"
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
          {result.hasOwnProperty("output") && (
            <div className="result">
              <div className="card">
                <Results
                  result={result.output[2].filter((res) => res.length > 2)}
                  trucks={result.output[0]}
                />
              </div>
              <h1 className="heading">Génétique</h1>
              <Graph
                demand={Array(result.output[0].length - 2)}
                result={result.output[2]}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Gen;
