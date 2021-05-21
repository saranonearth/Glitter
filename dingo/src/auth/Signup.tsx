import React from 'react';
import {Link, useHistory} from 'react-router-dom'


import useStore from '../Store/Store';
import useCreateUser from './hooks/useCreateUser';

interface Props {}

interface SignUpData {
    username: string,
    password:string,
    email: string
}


const Signup = (props: Props) => {
    const [initiateSignUp] = useCreateUser();
    const [isAuth] = useStore(state=> [state.isAuth])
    const history = useHistory();

    React.useEffect(()=>{
        if(isAuth) history.push('/feed');
    },[isAuth])

    const INIT_SIGNUP_FORM = {
        username:"",
        password:"",
        email: ""
    }

    const [data,setData] = React.useState<SignUpData>(INIT_SIGNUP_FORM)
    

    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        initiateSignUp(data);
    }


    return (
        <div>
           <div>
           <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
		    <form onSubmit={handleSubmit} className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
            <p style={{fontSize: '5em'}}>🦄</p>
			<p className="mb-5 text-3xl text-gray-600">Become a glitter</p>
            <input value={data.username} onChange={handleChange} type="text" name="username" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none" autoComplete="off" placeholder="Username" required />
			<input value={data.email} onChange={handleChange} type="email" name="email" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none" autoComplete="off" placeholder="Email" required />
			<input value={data.password} onChange={handleChange}  type="password" name="password" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none" autoComplete="off" placeholder="Password" required />
			<button className="bg-gray-600 hover:bg-gray-900 text-white font-bold p-2 rounded w-80" id="login" type="submit"><span>Create</span></button>
             <Link to="/login" className="mt-2"> Already got an account? Login.</Link>
		</form>

	    </div>
        </div>
        </div>
    )
}




export default Signup;