import Papa from "papaparse";

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

export default convertCSVToArray;