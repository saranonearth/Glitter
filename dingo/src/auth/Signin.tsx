import {Link} from 'react-router-dom'

interface Props {
    
}

const Signin = (props: Props) => {
    return (
        <div>
           <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
		<form className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
            <p style={{fontSize: '5em'}}>🦄</p>
			<p className="mb-5 text-3xl text-gray-600">Login</p>
			<input type="email" name="email" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none" autoComplete="off" placeholder="Email" required />
			<input type="password" name="password" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none" autoComplete="off" placeholder="Password" required />
			<button className="bg-gray-600 hover:bg-gray-900 text-white font-bold p-2 rounded w-80" id="login" type="submit"><span>Login</span></button>
             <Link to="/signup" className="mt-2"> Don't have an account? Create one.</Link>
		</form>

	    </div>
        </div>
    )
}




export default Signin;