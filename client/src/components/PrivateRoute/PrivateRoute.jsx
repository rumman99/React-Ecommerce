import { useContext } from 'react';
import { userContext } from '../../App';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
    const [userLogin, setUserLogin]= useContext(userContext);
    const location= useLocation();
    
    if(!userLogin.email){
        return <Navigate to='/login' state={{ from: location }} replace />;
        }
   return children;

};

export default PrivateRoute;