/* eslint-disable react/prop-types */
import { GraphCanvas } from "reagraph";

const Graph = (props) => {
  const { demand, result } = props;

  const nodes = [
    {
      id: "0",
      label: "Depot",
    },
  ];
  for (let i = 0; i < demand.length; i++) {
    nodes.push({
      id: `${i + 1}`,
      label: `Client ${i + 1}`,
    });
  }

  const edges = result
    .map((arr) =>
      arr.map((el) => ({
        source: `${el}`,
        target: `${arr[arr.indexOf(el) + 1]}`,
        id: `${el} - ${arr[arr.indexOf(el) + 1]}`,
        label: `${el} - ${arr[arr.indexOf(el) + 1]}`,
      }))
    )
    .flat(1);

  return <GraphCanvas nodes={nodes} edges={edges} />;
};

export default Graph;
