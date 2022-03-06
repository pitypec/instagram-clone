import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user'

import ProtectedRoute from './helpers/protected-route'


const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));

function App() {
  const {user} = useAuthListener()
  return (
    <UserContext.Provider value={{user}}>
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} exact/>
          <Route path={ROUTES.SIGN_UP} component={SignUp} exact/>
          <Route path={ROUTES.DASHBOARD} component={Dashboard} exact/>
          <Route path={ROUTES.PROFILE} component={Profile} exact/>
          <Route  component={NotFound}/>
        </Switch>
      </Suspense>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
