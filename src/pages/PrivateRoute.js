import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { useUserContext } from '../context/user_context';

// Rest operator
const PrivateRoute = ({children}) => {
  const {user} = useAuth0()
  {
    if(user){
      return children
    }
    else{
      return <Navigate to='/'/>
    }
  }
};
export default PrivateRoute;
