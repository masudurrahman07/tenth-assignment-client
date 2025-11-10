import { Link } from "react-router-dom";
import error from '../assets/error-404.png'

function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] text-center">
      <img src={error} alt="" />
      <h1 className="text-black text-4xl mb-4 ">Oops! Page not found.</h1>
      <p className="text-gray-500 m-2">The page you are looking for is not available.</p>
      <Link  to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Go Home</Link>
    </div>
  );
}

export default ErrorPage;