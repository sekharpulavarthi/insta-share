import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <ProtectedRoute path="/" component={Home} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
);

export default App;
