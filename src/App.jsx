import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";
import { Home, Cw, Gen } from "./pages";

function App() {
  const location = useLocation().pathname;

  return (
    <Router>
      {location !== "/" && (
        <div className="h-8 px-5 pt-4">
          <Link
            to="/"
            className="btn btn-secondary btn-outline btn-xs rounded-sm"
          >
            Retour
          </Link>
        </div>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cw" component={Cw} />
        <Route path="/gen" component={Gen} />
      </Switch>
      {location !== "/" && (
        <div className="absolute z-1 bottom-0 right-0 px-4">
          <img src="/ramy.png" alt="ramy logo" width={64} />
        </div>
      )}
    </Router>
  );
}

export default App;
