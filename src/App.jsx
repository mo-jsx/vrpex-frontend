import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Cw, Gen } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cw" component={Cw} />
        <Route path="/gen" component={Gen} />
      </Switch>
    </Router>
  );
}

export default App;
