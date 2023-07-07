import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import { Home, Cw, Gen } from "./pages";

function App() {
  const location = useLocation().pathname;

  return (
    <Router>
      {location !== "/" && (
        <div className="flex flex-row justify-between px-5">
          <Link to="/" replace>
            <button className="btn btn-secondary btn-outline btn-xs mt-4 rounded-sm">
              Retour
            </button>
          </Link>

          <div className="flex flex-row justify-end gap-4 right-0 px-4">
            <img src="/usthb.png" alt="usthb logo" width={64} />
            <img src="/ramy.png" alt="ramy logo" width={64} />
          </div>
        </div>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cw" component={Cw} />
        <Route path="/gen" component={Gen} />
      </Switch>
      {location === "/" && (
        <div className="max-h-[5vh]">
          <div className="flex flex-row justify-center gap-10 w-screen">
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
      )}
    </Router>
  );
}

export default App;
