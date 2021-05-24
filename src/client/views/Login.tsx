import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
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
    // <h1 className="text-primary text-center">Login</h1>
    // <input value={email} onChange={handleSetEmail} placeholder='Your Email' />
    // <input value={password} onChange={handleSetPassword} placeholder='Your Password' />
    // <br />
    // <button onClick={handleSubmit}>Submit</button>
    // <br />
    // <Link to='/books'>To Books</Link>
    // <br />

    return (
        <section className='justify-content-center col-md-6 section-bgc rounded shadow-lg p-3'>
            <h3 className='text-center'>Login</h3>
            <Form className='p-3'>
                <Link to='/register' className='my-3'>Not a Member...Register here</Link>
                <br />
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} onChange={handleSetEmail} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={handleSetPassword} type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </section>
    );
};

interface LoginProps { }

export default Login;