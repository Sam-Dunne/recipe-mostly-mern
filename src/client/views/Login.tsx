import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services';
import SubmitBtn from '../components/SubmitBtn';
import MyModal from '../components/SweetAlerts'


const Login = (props: LoginProps) => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const [password, setPassword] = useState<string>('');
    const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (email.length === 0 || password.length === 0) {
            MyModal.fieldValidation(('Oops...'), ( 'Both fields required'));
            return;
        }
        apiService(`/auth/login`, 'POST', { email, password })
            .then(res => {
                localStorage.setItem('token', res.token);
                MyModal.timeoutSuccess('',`Welcome Back, ${res.name}!`);
                history.push(`/users_recipes/${res.id}`);
            })
    };

    return (
        <section className='justify-content-center col-md-8 rounded shadow-lg bg-primary p-4 mx-2'>
            <h3 className='text-center text-light'>Login</h3>
            <Form className='p-4 mb-3'>
                <Form.Group controlId="formBasicEmail" className='mb-4'>
                    <div>
                        <span className='row justify-content-center align-items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id='svg-mailbox'><defs><linearGradient id="delapouite-mailbox-gradient-1"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="delapouite-mailbox-gradient-3"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="delapouite-mailbox-gradient-4"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="delapouite-mailbox-gradient-5"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="delapouite-mailbox-gradient-6"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="delapouite-mailbox-gradient-7"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="delapouite-mailbox-gradient-8"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="delapouite-mailbox-gradient-9"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient></defs><path d="M0 0h512v512H0z" fill="#46794d" fillOpacity="1"></path><g transform="translate(0,0)" ><g><path d="M375.4 17.744L297.4 43.742L297.4 265.73L311.4 262.23L311.4 94.64L375.4 74.64Z" className="selected" fill="#a83721" fillOpacity="1"></path><path d="M433.3 126.31L329.4 152.282L329.4 276.282L290.585 285.985L279.401 288.782L279.401 164.782L207.29 182.81C212.465 186.756 216.995 191.63 220.803 197.133C230.953 211.79 237.093 230.811 241.23 251.49C248.61 288.39 249.286 330.28 249.355 361.742L487.367 302.238C487.324 270.528 486.795 227.108 479.577 191.021C475.714 171.701 469.857 154.721 462.004 143.381C454.34 132.309 445.794 126.581 433.302 126.311Z" fill="url(#delapouite-mailbox-gradient-3)"></path><path d="M176.4 190.255C163.026 190.255 154.188 195.465 146.49 205.302C138.79 215.14 133.018 229.966 129.186 247.208C128.351 250.963 127.614 254.83 126.95 258.766L220.057 240.144L220.057 240.142C219.607 238.507 219.137 236.899 218.651 235.32C218.171 233.758 217.676 232.226 217.164 230.725L217.148 230.675C217.135 230.635 217.12 230.599 217.108 230.56C216.63 229.167 216.135 227.804 215.628 226.467L215.478 226.065C214.956 224.699 214.423 223.36 213.871 222.057C213.825 221.949 213.776 221.845 213.731 221.737C213.229 220.565 212.713 219.424 212.187 218.307L211.797 217.481C211.627 217.128 211.457 216.776 211.283 216.429C210.999 215.859 210.711 215.295 210.42 214.741C210.333 214.579 210.25 214.411 210.165 214.251C209.773 213.517 209.373 212.803 208.969 212.101C208.849 211.893 208.729 211.691 208.609 211.487C208.304 210.967 207.995 210.455 207.683 209.954C207.555 209.748 207.426 209.542 207.297 209.339C206.87 208.669 206.439 208.011 206 207.376C198.148 196.032 189.4 190.252 176.4 190.252Z" fill="url(#delapouite-mailbox-gradient-4)"></path><path d="M202.698 261.975L114.975 279.519L158.837 294.452Z" fill="url(#delapouite-mailbox-gradient-5)"></path><path d="M225.723 267.321L161.965 314.531L89.4 289.827L89.4 358.159L231.007 333.745C230.445 312.275 229.062 288.895 225.723 267.323Z" fill="url(#delapouite-mailbox-gradient-6)"></path><path d="M231.283 351.958L194.01 358.385L231.348 363.053C231.338 359.489 231.318 355.759 231.284 351.957Z" fill="url(#delapouite-mailbox-gradient-7)"></path><path d="M359.401 352.781L329.401 360.281L329.401 494.254L359.401 494.254Z" fill="url(#delapouite-mailbox-gradient-8)"></path><path d="M133.023 368.901L71.403 379.527L71.403 372.915C56.977 377.458 44.345 383.81 35.927 390.355C27.984 396.535 24.725 402.719 24.647 404.837C24.607 405.897 24.637 406.329 25.939 407.69C27.189 408.997 30.051 410.856 34.752 412.5C114.327 425.555 158.766 404.844 210.092 378.534Z" fill="url(#delapouite-mailbox-gradient-9)"></path></g></g></svg>
                            <Form.Control value={email} onChange={handleSetEmail} className='ml-3 col-9 bg-info' type="email" placeholder="Enter email" />
                        </span>
                    </div>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <div>
                        <span className='row justify-content-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="svg-unlocking"><defs><linearGradient id="lorc-unlocking-gradient-1"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-3"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-4"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-5"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-6"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-7"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-8"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-9"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient></defs><path d="M0 0h512v512H0z" fill="#46794d" fillOpacity="1"></path><g transform="translate(0,0)" ><path d="M78.53 157.188c-23.843 0-43.93 21.364-50.28 50.593-4.216 5.54-6.75 12.435-6.75 19.876 0 7.506 2.56 14.467 6.844 20.03 6.475 28.963 26.485 50.064 50.187 50.064 24.293 0 44.72-22.173 50.657-52.25H234.97v65.594h19.31v-44.22h18.69v44.22h20.092V286h18.688v25.094h15.125V245.5h17.97v-33.47h-215.19c-5.248-31.382-26.14-54.843-51.124-54.843zM424.44 169.28c-31.78 0-57.813 26.036-57.813 57.814 0 17.65 7.836 33.673 20.47 44.312l-25.22 72.938-4.28 12.406h133.123l-4.314-12.406-25.187-72.938c12.63-10.64 20.467-26.662 20.467-44.312 0-31.642-25.47-57.813-57.25-57.813zm0 18.69c21.617 0 38.562 17.372 38.562 39.124 0 14.002-7.057 26.117-17.875 33l-6.22 3.97 2.408 6.967 23.156 67.033H383.81L407 271.03l2.406-6.967-6.22-3.97c-10.817-6.882-17.873-18.997-17.873-33 0-21.615 17.507-39.124 39.125-39.124zm-369.97 25.405c8.003 0 14.313 6.28 14.313 14.28 0 8.003-6.31 14.282-14.31 14.282-8.003 0-14.282-6.28-14.282-14.28 0-8.003 6.28-14.282 14.28-14.282z" fill="url(#lorc-unlocking-gradient-1)"></path></g></svg>
                            <Form.Control value={password} onChange={handleSetPassword} className='ml-3 col-9 bg-info' type="password" placeholder="Password" />
                        </span>
                    </div>
                </Form.Group>
                <SubmitBtn onClick={handleSubmit} children='Login' />
            </Form>
            <div className='row justify-content-center mt-4'>
                <Link to='/register' className='btn btn-link border-light text-light'>Don't have an Account?...Register here</Link>
            </div>
        </section>
    );
};

interface LoginProps { }

export default Login;