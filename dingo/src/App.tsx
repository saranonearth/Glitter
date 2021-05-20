//Module imports
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
 import { ToastContainer} from 'react-toastify';

//Relative imports
import Feed from './feed'
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Home from './components/Home';
import Reducer from './store/Reducer';
import Store from './store/Store';

//Style
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = () => {
  const initialState:any = React.useContext(Store);
  const [state, dispatch] = React.useReducer(Reducer,initialState);

  return (
    <>
    <ToastContainer newestOnTop autoClose={2000} />
    <Store.Provider value={{state,dispatch}}>
     <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/feed" component={Feed} />
      <Route exact path="/login" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      </Switch>
     </BrowserRouter>
    </Store.Provider>
    </>
  );
}

export default App;
