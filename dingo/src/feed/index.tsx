import React from 'react'
import { useHistory } from 'react-router-dom';
import useStore from '../Store/Store';



import FeedHolder from './components/FeedHolder';


interface Props {}

const Index = (props: Props) => {

    const isAuth = useStore(state=> state.isAuth);
    const history = useHistory();


    React.useEffect(() => {
        if(!isAuth){
            history.push('/login')
        }
    }, [isAuth])

    return (
    <>
     <FeedHolder />   
     </>
    )
}

export default Index;
