import React, {useContext} from 'react'
import AuthContext from '../../contexts/auth/AuthContext';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoutes = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading} = authContext;
    return (
        <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
    )
}

export default PrivateRoutes
