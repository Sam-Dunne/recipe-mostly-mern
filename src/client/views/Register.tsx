import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services';
import { v4 as uuidv4 } from 'uuid';
import { Button, Form } from 'react-bootstrap';




/* HOOK REACT EXAMPLE */
const Register = (props: RegisterProps) => {
    const history = useHistory();

    const [name, setName] = useState<string>('');
    const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const [email, setEmail] = useState<string>('');
    const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const [password, setPassword] = useState<string>('');
    const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (name.length === 0 || email.length === 0 || password.length === 0 || name.length > 60 || email.length > 60 || password.length > 60 || password.length < 6) {
            alert(`Required Fields`);
            return;
        }
        apiService(`/auth/register`, 'POST', { id: uuidv4(), name, email, password })
            .then(res => {
                localStorage.setItem('token', res.token);
                alert(`Thanks for joining, ${res.name}`)
                history.push(`/user_recipes/${res.email}`)

            })
    };

        // <main className="container my-5">
        //     <h1 className="text-primary text-center">Register</h1>
        //     <input value={name} onChange={handleSetName} placeholder='Your Name' />
        //     <input value={email} onChange={handleSetEmail} placeholder='Your Email' />
        //     <input value={password} onChange={handleSetPassword} placeholder='Your Password' />
        //     <br />
        //     <button onClick={handleSubmit}>Submit</button>
        //     <br />
        //     <Link to='/books'>To Books</Link>
        //     <br />
        // </main>
    return (
        <section className='justify-content-center col-md-6 bg-success rounded shadow-lg p-3'>
        <h3 className='text-center'>Register</h3>
        <Form className='p-3'>
            <Link to='/register' className='my-3 nav-btn'>Already Signed Up...Login</Link>
            <br />
            <Form.Group controlId="formBasic">
                <Form.Label>Your Name</Form.Label>
                <Form.Control value={name} onChange={handleSetName} type="text" placeholder="Your Name" />
            </Form.Group>

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

interface RegisterProps { }

export default Register;