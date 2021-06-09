import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services';
import { v4 as uuidv4 } from 'uuid';
import { Button, Form } from 'react-bootstrap';
import SubmitBtn from '../components/SubmitBtn';
import MyModal from '../components/SweetAlerts'




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
        if (name.length === 0 || email.length === 0 || password.length === 0 || name.length > 60 || email.length > 60 || password.length > 60) {
            MyModal.fieldValidation(('All Input Fields Required'), ( '60 Characters Max for each.'));
            return;
        }
        if (password.length >= 1 && password.length < 6) {
            MyModal.fieldValidation(('Weak Password'), ( 'Min Password length is 6 characters'));
            return;
        }
        apiService(`/auth/register`, 'POST', { id: uuidv4(), name, email, password })
            .then(res => {
                localStorage.setItem('token', res.token);
                MyModal.timeoutSuccess(`Welcome`, `Thanks for joining, ${res.name}!`);
                history.push('/addRecipe/');
            })
    };


    return (
        <section className='justify-content-center col-md-8 rounded shadow-lg bg-primary p-4 mx-2'>
            <h3 className='text-center text-info'>Register</h3>
            <Form className='p-4 mb-3'>
                <br />
                <Form.Group controlId="formBasic">
                    <Form.Label className='text-info'>Your Name</Form.Label>
                    <Form.Control value={name} onChange={handleSetName} type="text" placeholder="Your Name" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label className='text-info'>Email address</Form.Label>
                    <Form.Control value={email} onChange={handleSetEmail} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className='text-info'>Password</Form.Label>
                    <Form.Control value={password} onChange={handleSetPassword} type="password" placeholder="Password" />
                </Form.Group>

                <SubmitBtn onClick={handleSubmit} children='Register' />
                <Link to='/register' className='my-3 nav-btn text-info'>Already Signed Up...Login</Link>

            </Form>
        </section>
    );
};

interface RegisterProps { }

export default Register;