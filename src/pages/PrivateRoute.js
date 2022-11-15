import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { useUserContext } from '../context/user_context';

// Rest operator
const PrivateRoute = ({children}) => {
  const {myUser} = useUserContext()
  {
    if(myUser){
      return children
    }
    else{
      return <Navigate to='/'/>
    }
  }
};
export default PrivateRoute;
