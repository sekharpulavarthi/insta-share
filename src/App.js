import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Stories from "./components/Stories";

const App = () => (
  <BrowserRouter>
    <Route path="/login" component={LoginPage} />
    <Route path="/" component={Stories} />
  </BrowserRouter>
);

export default App;
