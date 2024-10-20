import { Navigate } from "react-router-dom";


function  PrivateRoute({ children } : {children : any}) {
  
  return localStorage.getItem('token') !== null ? children : <Navigate to="/" />;
}

export default PrivateRoute;