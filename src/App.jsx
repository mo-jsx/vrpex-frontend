import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Cw, Gen } from "./pages";
import { Navigation } from "./components";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <Router>
      {location.pathname !== "/" && <Navigation />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cw" component={Cw} />
        <Route path="/gen" component={Gen} />
      </Switch>
    </Router>
  );
}

export default App;
