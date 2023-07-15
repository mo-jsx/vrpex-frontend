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
            <li key={(Math.random() * 10000000).toFixed()} className="mb-2">
              <span className="font-bold text-lg">
                Tournée {index + 1} <br />
              </span>
              <span className="bg-slate-300">
                {tournée.map((location, index) => {
                  if (index === tournée.length) {
                    return (
                      <span
                        className="text-sm"
                        key={(Math.random() * 10000000).toFixed()}
                      >
                        {location === 0 ? "Depôt" : `Client ${location}`}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        className="text-sm"
                        key={(Math.random() * 10000000).toFixed()}
                      >
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

export default Results;
