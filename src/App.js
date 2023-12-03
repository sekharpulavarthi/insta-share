import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import UserProfileDetails from "./components/UserProfileDetails";
import Profile from "./components/Profile";
import SearchPosts from "./components/SearchPosts";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/not-found" component={NotFound} />
        <>
          <Header />
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/posts/:userId"
              component={UserProfileDetails}
            />
            <ProtectedRoute exact path="/my-profile" component={Profile} />
            <ProtectedRoute exact path="/posts" component={SearchPosts} />
            <Redirect to="/not-found" />
          </Switch>
        </>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
