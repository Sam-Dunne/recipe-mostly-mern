import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props: PrivateRouteProps) => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert(`Redirecting: Login or Register to access this feature`);
        return (
            <Redirect to='/login' />
        )
    } else {
        return (
            <Route exact={props.exact} path={props.path}>
                {props.children}
            </Route>
        )
    }
};


interface PrivateRouteProps {
    exact?: boolean;
    path: string;
    children: React.ReactNode
};

export default PrivateRoute;