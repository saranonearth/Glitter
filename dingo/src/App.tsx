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
import socketIOClient from "socket.io-client";
import _ from 'lodash'

//Style
import 'react-toastify/dist/ReactToastify.css';
import useStore from './Store/Store';
import useFetchGlits from './feed/hooks/useFetchGlits';
import { UNICORN_SERVICE } from './config';





const App: React.FC = () => {
  const [_,getUser] = useGetUser();
  const [isBusy, isAuth, user, glits, setGlits] = useStore(state=> [state.isBusy, state.isAuth, state.user,state.glits, state.setGlits])




  React.useEffect(() => {


        getUser();
    

  }, []);



  React.useEffect(() => {
    const socket = socketIOClient(UNICORN_SERVICE);
    socket.on("GLITTED", (data)=>{
          console.log(data);
        console.log(user);
      if(user && isAuth){
    
        const tweetUserId = data.postedBy._id || "";

        if(user.followers.find((id:string)=> id.toString() === tweetUserId.toString())){
    
          const newGlits: any = (glits!==null)?[data,...glits]:[data];
          setGlits(newGlits);
        }

      }
    })

  }, []);


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
