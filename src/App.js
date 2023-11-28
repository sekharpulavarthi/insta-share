import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import UserProfileDetails from "./components/UserProfileDetails";
import Profile from "./components/Profile";
import SearchPosts from "./components/SearchPosts";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/posts/:userId"
          component={UserProfileDetails}
        />
        <ProtectedRoute exact path="/my-profile" component={Profile} />
        <ProtectedRoute exact path="/posts" component={SearchPosts} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
