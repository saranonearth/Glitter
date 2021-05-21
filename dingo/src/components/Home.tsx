import React from 'react'
import {useHistory} from 'react-router-dom'
import useStore from '../Store/Store';
interface Props {
    
}

 const Home = (props: Props) => {
     const history = useHistory();
     const [isAuth] = useStore(state=> [state.isAuth])

     const handleOnClick = () => {
         history.push('/login');
     }

     React.useEffect(()=> {
    
        if(isAuth) {
        history.push('/feed')
        }
    },[isAuth])

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
                <div className="text-center">
                    <p style={{fontSize:'10em', marginLeft: "-20px"}} className="cursor-pointer ...">
                    🦄
                    </p>
              <div style={{marginTop: '-50px'}}>
                        <h1 className="text-6xl font-black text-gray-500" >Glitter</h1>
                    <p className="text-gray-400">Trump friendly micro-blogging platform</p>
              </div>
            <button onClick={handleOnClick} className="bg-gray-600 mt-10 hover:bg-gray-900 text-white font-bold p-2 rounded w-55 transition 0.5s" id="login" type="submit"><span>Get started!</span></button>
                </div>
        </div>
    )
}

export default Home;
