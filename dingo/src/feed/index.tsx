import React from 'react'
import { useHistory } from 'react-router-dom';
import useStore from '../Store/Store';



import FeedHolder from './components/FeedHolder';
import useFetchGlits from './hooks/useFetchGlits';


interface Props {}

const Index = (props: Props) => {

    const [isAuth, setLogout, user] = useStore(state=> [state.isAuth, state.setLogout, state.user]);
    const history = useHistory();
    const [getFeed] = useFetchGlits();

    React.useEffect(() => {
        if(!isAuth){
            history.push('/login')
        }
    }, [isAuth]);

    React.useEffect(()=>{

        getFeed();

        
    
    },[])



    /**
     * @description Removes auth token from local storage and manipulates global store
     * @return void
     */
    const logout = () => {
        localStorage.removeItem('x-glitter');
        setLogout();
    }

    return (
    <>
     <FeedHolder 
        logout={logout}
        user={user}
      />   
     </>
    )
}

export default Index;
