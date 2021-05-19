import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services';

/* HOOK REACT EXAMPLE */
const Login = (props: LoginProps) => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const [password, setPassword] = useState<string>('');
    const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (email.length === 0 || password.length === 0) {
            alert(`Required Fields`);
            return;
        }
        apiService(`/auth/login`, 'POST', { email, password })
            .then(res => {
                localStorage.setItem('token', res.token);
                alert(`Welcome back, ${res.name}`)
                history.push(`/users_recipes/${res.email}`)
            })
    };

    return (
        <main className="container my-5">
            <h1 className="text-primary text-center">Login</h1>
            <input value={email} onChange={handleSetEmail} placeholder='Your Email' />
            <input value={password} onChange={handleSetPassword} placeholder='Your Password' />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <Link to='/books'>To Books</Link>
            <br />
            <Link to='/register'>Not a Member...Register here</Link>
        </main>
    );
};

interface LoginProps { }

export default Login;