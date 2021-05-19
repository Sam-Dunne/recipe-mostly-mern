import * as React from 'react';
import { NavLink } from 'react-router-dom';


/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {

    return (
        <nav className="navbar">
            <h4>Navbar</h4>
            <NavLink to={`/login`}>Login</NavLink>
            <NavLink to={`/register`}>Register</NavLink>
        </nav>
    );
};

interface AppProps { }

export default App;