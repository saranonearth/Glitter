//Module imports
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'


//Relative imports
import Feed from './feed'
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Home from './components/Home';
import Reducer from './store/Reducer';
import Store from './store/Store';



const App: React.FC = () => {
  const initialState:any = React.useContext(Store);
  const [state, dispatch] = React.useReducer(Reducer,initialState);

  return (
    <>
    <Store.Provider value={{state,dispatch}}>

     <BrowserRouter>
      <Switch>
      <Route path="/" component={Home} />
      <Route exact path="/feed" component={Feed} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signin" component={Signup} />
      </Switch>
     </BrowserRouter>
    </Store.Provider>
    </>
  );
}

export default App;
