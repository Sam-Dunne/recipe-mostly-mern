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
        if (email.length === 0 || password.length === 0 || email.length > 60 || password.length > 60) {
            alert(`Required Fields`);
            return;
        }
        apiService(`/auth/login`, 'POST', { email, password })
            .then(res => {
                localStorage.setItem('token', res.token);
                alert(`Welcome back, ${res.name}`)
                history.push(`/users_recipes/${res.id}`)
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
        <section className='justify-content-center col-md-8 rounded shadow-lg bg-success p-4 mx-2'>
            <h3 className='text-center text-light'>Login</h3>
            <Form className='p-4 mb-3'>
                <Form.Group controlId="formBasicEmail" className='mb-4'>
                    <div>
                        <span className='row justify-content-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id='svg-mailbox'><defs><filter id="shadow-1" height="300%" width="300%" x="-100%" y="-100%"><feFlood floodColor="rgba(110, 109, 109, 1)" result="flood"></feFlood><feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite><feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur><feOffset dx="6" dy="8" result="offset"></feOffset><feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite></filter></defs><rect fill="#569656" fillOpacity="1" height="512" width="512" rx="99" ry="99"></rect><g transform="translate(0,0)" ><path d="M375.4 17.744l-78 25.998V265.73l14-3.5V94.64l64-20zM433.3 126.31L329.4 152.282v124l-38.815 9.703-11.184 2.797v-124L207.29 182.81c5.175 3.946 9.705 8.82 13.513 14.323 10.15 14.657 16.29 33.678 20.427 54.357 7.38 36.9 8.056 78.79 8.125 110.252l238.012-59.504c-.043-31.71-.572-75.13-7.79-111.217-3.863-19.32-9.72-36.3-17.573-47.64-7.664-11.072-16.21-16.8-28.702-17.07zM176.4 190.255c-13.374 0-22.212 5.21-29.91 15.047-7.7 9.838-13.472 24.664-17.304 41.906-.835 3.755-1.572 7.622-2.236 11.558l93.107-18.622v-.002c-.45-1.635-.92-3.243-1.406-4.822-.48-1.562-.975-3.094-1.487-4.595l-.016-.05c-.013-.04-.028-.076-.04-.115-.478-1.393-.973-2.756-1.48-4.093l-.15-.402c-.522-1.366-1.055-2.705-1.607-4.008-.046-.108-.095-.212-.14-.32-.502-1.172-1.018-2.313-1.544-3.43l-.39-.826c-.17-.353-.34-.705-.514-1.052-.284-.57-.572-1.134-.863-1.688-.087-.162-.17-.33-.255-.49-.392-.734-.792-1.448-1.196-2.15-.12-.208-.24-.41-.36-.614-.305-.52-.614-1.032-.926-1.533-.128-.206-.257-.412-.386-.615-.427-.67-.858-1.328-1.297-1.963-7.852-11.344-16.6-17.124-29.6-17.124zm26.298 71.72l-87.723 17.544 43.862 14.933zm23.025 5.346l-63.758 47.21L89.4 289.827v68.332l141.607-24.414c-.562-21.47-1.945-44.85-5.284-66.422zm5.56 84.637l-37.273 6.427 37.338 4.668c-.01-3.564-.03-7.294-.064-11.096zm128.118.823l-30 7.5v133.973h30zm-226.378 16.12l-61.62 10.626v-6.612c-14.426 4.543-27.058 10.895-35.476 17.44-7.943 6.18-11.202 12.364-11.28 14.482-.04 1.06-.01 1.492 1.292 2.853 1.25 1.307 4.112 3.166 8.813 4.81 79.575 13.055 124.014-7.656 175.34-33.966z" fill="#fff" fillOpacity="1" filter="url(#shadow-1)"></path></g></svg>
                            <Form.Control value={email} onChange={handleSetEmail} className='col-9' type="email" placeholder="Enter email" />
                        </span>
                    </div>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <div>
                        <span className='row justify-content-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id='svg-unlocking'><defs><filter id="shadow-1" height="300%" width="300%" x="-100%" y="-100%"><feFlood floodColor="rgba(110, 109, 109, 1)" result="flood"></feFlood><feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite><feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur><feOffset dx="6" dy="8" result="offset"></feOffset><feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite></filter></defs><rect fill="#569656" fillOpacity="1" height="512" width="512" rx="99" ry="99"></rect><g transform="translate(0,0)" ><path d="M78.53 157.188c-23.843 0-43.93 21.364-50.28 50.593-4.216 5.54-6.75 12.435-6.75 19.876 0 7.506 2.56 14.467 6.844 20.03 6.475 28.963 26.485 50.064 50.187 50.064 24.293 0 44.72-22.173 50.657-52.25H234.97v65.594h19.31v-44.22h18.69v44.22h20.092V286h18.688v25.094h15.125V245.5h17.97v-33.47h-215.19c-5.248-31.382-26.14-54.843-51.124-54.843zM424.44 169.28c-31.78 0-57.813 26.036-57.813 57.814 0 17.65 7.836 33.673 20.47 44.312l-25.22 72.938-4.28 12.406h133.123l-4.314-12.406-25.187-72.938c12.63-10.64 20.467-26.662 20.467-44.312 0-31.642-25.47-57.813-57.25-57.813zm0 18.69c21.617 0 38.562 17.372 38.562 39.124 0 14.002-7.057 26.117-17.875 33l-6.22 3.97 2.408 6.967 23.156 67.033H383.81L407 271.03l2.406-6.967-6.22-3.97c-10.817-6.882-17.873-18.997-17.873-33 0-21.615 17.507-39.124 39.125-39.124zm-369.97 25.405c8.003 0 14.313 6.28 14.313 14.28 0 8.003-6.31 14.282-14.31 14.282-8.003 0-14.282-6.28-14.282-14.28 0-8.003 6.28-14.282 14.28-14.282z" fill="#fff" fillOpacity="1" filter="url(#shadow-1)"></path></g></svg>
                            <Form.Control value={password} onChange={handleSetPassword} className='col-9' type="password" placeholder="Password" />
                        </span>
                    </div>
                </Form.Group>
                <div className='row justify-content-center mt-4'>
                    <Button variant='success' type="submit" className='btn-link mx-auto border-light text-light p-3 font-weight-bold' onClick={handleSubmit}>
                        Submit
                     </Button>
                </div>
            </Form>
            <div className='row justify-content-center mt-4'>
                <Link to='/register' className='btn btn-link border-light text-light'>Don't have an Account?...Register here</Link>
            </div>
        </section>
    );
};

interface LoginProps { }

export default Login;