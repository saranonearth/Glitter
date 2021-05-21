//Module imports
import React from 'react';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
 import { ToastContainer} from 'react-toastify';

//Relative imports
import Feed from './feed'
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Home from './components/Home';
import AppLoader from './components/Loader';
import useGetUser from './auth/hooks/useGetUser'


//Style
import 'react-toastify/dist/ReactToastify.css';
import useStore from './Store/Store';
import useFetchGlits from './feed/hooks/useFetchGlits';




const App: React.FC = () => {
  const [getUser] = useGetUser();
  const [isBusy,] = useStore(state=> [state.isBusy, state.isAuth])
  const [_,getFeed] = useFetchGlits();



  React.useEffect(() => {
      getUser();
  }, [localStorage.getItem('x-glitter')]);

  React.useEffect(()=>{

        getFeed();
    },[])


  if(isBusy) return <AppLoader />
  return (
    <>
    <ToastContainer newestOnTop autoClose={2000} />
     <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/feed" component={Feed} />
      <Route exact path="/login" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      </Switch>
     </BrowserRouter>
    </>
  );
}

export default App;
