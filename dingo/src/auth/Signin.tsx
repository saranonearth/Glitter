import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import useStore from '../Store/Store'
import useLogin from './hooks/useLogin'

interface LoginData {
    username: string,
    password:string   
}

const Signin = () => {

    const [isAuth] = useStore(state=> [state.isAuth])
    const [initiateLogin] = useLogin()
    const history = useHistory();

    React.useEffect(()=>{
        if(isAuth) history.push('/feed');
    },[isAuth])

    const INIT_LOGIN_FORM = {
        username:"",
        password:""
    }

    const [data,setData] = React.useState<LoginData>(INIT_LOGIN_FORM)
    

    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        initiateLogin(data);
    }

    return (
        <div>
           <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
		<form onSubmit={handleSubmit} className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
            <p style={{fontSize: '5em'}}>🦄</p>
			<p className="mb-5 text-3xl text-gray-600">Login</p>
			<input value={data.username} onChange={handleChange} type="text" name="username" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none" autoComplete="off" placeholder="Username" required />
			<input value={data.password} onChange={handleChange} type="password" name="password" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none" autoComplete="off" placeholder="Password" required />
			<button className="bg-gray-600 hover:bg-gray-900 text-white font-bold p-2 rounded w-80" id="login" type="submit"><span>Login</span></button>
             <Link to="/signup" className="mt-2"> Don't have an account? Create one.</Link>
		</form>

	    </div>
        </div>
    )
}




export default Signin;