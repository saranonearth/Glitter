
import Loader from 'react-loader-spinner'

const AppLoader = () => {
    return (
       <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <Loader
            type="Puff"
            color="rgba(75,85,99)"
            height={100}
            width={100}
        />
        </div>
    )
}

export default AppLoader
