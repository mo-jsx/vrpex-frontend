/* eslint-disable no-unused-vars */
import Papa from "papaparse";
import { useState } from "react";

const Uploadz = () => {
  const [demandFile, setDemandFile] = useState(null);
  const [demand, setDemand] = useState([]);

  const [matrixFile, setMatrixFile] = useState(null);
  const [matrix, setMatrix] = useState([]);

  const convertCSVToArray = (csvData, setter) => {
    Papa.parse(csvData, {
      complete: (results) => {
        const dataArray = results.data;
        const arr = dataArray
          .map((obj) => Object.values(obj).map((ele) => parseInt(ele)))
          .filter((ar) => !ar.some(Number.isNaN));

        setter(arr);
      },
      header: true,
    });
  };

  const handleFileUpload = (event, setterFile, setterArray) => {
    const file = event.target.files[0];
    setterFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      convertCSVToArray(contents, setterArray);
    };
    reader.readAsText(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="grid grid-cols-3 w-screen h-full">
      <form
        onSubmit={handleSubmit}
        className="col-start-2 col-end-3 gap-2 flex flex-col"
      >
        <label htmlFor="demand">Demand File</label>
        <input
          type="file"
          className="input input-ghost"
          onChange={(event) =>
            handleFileUpload(event, setDemandFile, setDemand)
          }
        />

        <label htmlFor="matrix">Matrix File</label>
        <input
          type="file"
          className="input input-ghost"
          onChange={(event) =>
            handleFileUpload(event, setMatrixFile, setMatrix)
          }
        />
        <button type="submit" className="btn btn-primary btn-sm sm:w-32">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Uploadz;
