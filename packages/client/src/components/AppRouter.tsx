import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Auth } from "../Routes/Auth";
import { Feed } from "../Routes/Feed";
import { Profile } from "../Routes/Profile";
import { Explore } from "../Routes/Explore";
import { Search } from "../Routes/Search";

interface AppRouterProps {
  isLoggedIn: boolean;
}

const LoggedInRoutes = () => (
  <Switch>
    <Route path="/" exact component={Feed}></Route>
    <Route path="/explore" component={Explore}></Route>
    <Route path="/search" component={Search}></Route>
    <Route path="/:username" component={Profile}></Route>
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route path="/" exact component={Auth}></Route>
  </Switch>
);

export const AppRouter: React.FC<AppRouterProps> = ({ isLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? (
        <LoggedInRoutes></LoggedInRoutes>
      ) : (
        <LoggedOutRoutes></LoggedOutRoutes>
      )}
    </>
  );
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
