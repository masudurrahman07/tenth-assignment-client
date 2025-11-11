
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {

  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  
  if (loading) {
    return (
      
      <div className="flex items-center justify-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-blue-500"></span></div>);}

  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;

};

export default PrivateRoute;
