/* eslint-disable no-prototype-builtins */
import { useState } from "react";
import axios from "axios";
import Papa from "papaparse";

const Gluton = () => {
  const [num_trucks, setNum_trucks] = useState("");
  const [max_capacity, setMax_capacity] = useState("");
  const [max_distance, setMax_distance] = useState("");

  const [demandFile, setDemandFile] = useState(null);
  const [demand, setDemand] = useState([]);

  const [matrixFile, setMatrixFile] = useState(null);
  const [matrix, setMatrix] = useState([]);

  const [result, setResult] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(null);

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

    axios
      .post("http://localhost:5000/gluton", data)
      .then((res) => {
        setResult(res.data);
        console.log(res.data);
        setIsReady(true);
      })
      .catch((err) =>
        setIsError({
          error: `Y'a eu une erreur durant le traitement des fichiers: ${err.name}! <br /> Vérifier que vous avez choisi les bons fichiers CSV.`,
        })
      );
  };

  if (!isReady) {
    return (
      <div className="m-4 h-[90vh] grid grid-cols-6 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="col-start-2 col-end-6 lg:col-end-3 px-4 py-2"
        >
          <h2 className="text-5xl text-center mb-10 uppercase">Gluton</h2>

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
                handleFileUpload(event, setMatrixFile, setMatrix, false)
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
              <img src="/404.png" alt="Warning" className="m-auto w-64" />
              <h1 className="text-4xl text-center">Oops.. {result.error}</h1>
              {isError && <h2 className="text-center mt-4">{isError.error}</h2>}
            </>
          )}

          {result.hasOwnProperty("output") && (
            <div>
              {result.output.map((list, index) => (
                <li key={index}>
                  {list.map((item) => (
                    <span key={Math.random() * 10000 + item}>{item}</span>
                  ))}
                </li>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Gluton;
