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
            MyModal.fieldValidation(('Oops...'), ('Both fields required'));
            return;
        }
        apiService(`/auth/login`, 'POST', { email, password })
            .then(res => {
                localStorage.setItem('token', res.token);
                MyModal.timeoutSuccess('', `Welcome Back, ${res.name}!`);
                history.push(`/users_recipes/${res.id}`);
            })
    };

    return (
        <section className='justify-content-center col-md-8 rounded shadow-lg bg-primary p-2 px-md-4 mx-2'>
            <h3 className='text-center text-light'>Login</h3>
            <Form className='p-4 mb-3'>
                <Form.Group controlId="formBasicEmail" className='mb-4'>
                    <div>
                        <span className='row justify-content-center align-items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id='svg-mailbox'><defs><linearGradient id="delapouite-mailbox-gradient-1"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#f8fafd" stopOpacity="1"></stop></linearGradient><linearGradient id="delapouite-mailbox-gradient-3"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#83b6f0" stopOpacity="1"></stop></linearGradient><linearGradient x1="0" x2="1" y1="1" y2="0" id="delapouite-mailbox-gradient-11"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#ba9f0b" stopOpacity="1"></stop></linearGradient><linearGradient x1="0" x2="0" y1="0" y2="1" id="delapouite-mailbox-gradient-12"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#cecece" stopOpacity="1"></stop></linearGradient><linearGradient id="delapouite-mailbox-gradient-13"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#ba9f0b" stopOpacity="1"></stop></linearGradient><linearGradient id="delapouite-mailbox-gradient-14"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#ba9f0b" stopOpacity="1"></stop></linearGradient></defs><path d="M0 0h512v512H0z" fill="#195f9f" fillOpacity="1"></path><g transform="translate(0,0)"><g><path d="M375.4 17.744L297.4 43.742L297.4 265.73L311.4 262.23L311.4 94.64L375.4 74.64Z" fill="#bb0b0b" fillOpacity="1"></path><path d="M433.3 126.31L329.4 152.282L329.4 276.282L290.585 285.985L279.401 288.782L279.401 164.782L207.29 182.81C212.465 186.756 216.995 191.63 220.803 197.133C230.953 211.79 237.093 230.811 241.23 251.49C248.61 288.39 249.286 330.28 249.355 361.742L487.367 302.238C487.324 270.528 486.795 227.108 479.577 191.021C475.714 171.701 469.857 154.721 462.004 143.381C454.34 132.309 445.794 126.581 433.302 126.311Z" fill="url(#delapouite-mailbox-gradient-3)"></path><path d="M176.4 190.255C163.026 190.255 154.188 195.465 146.49 205.302C138.79 215.14 133.018 229.966 129.186 247.208C128.351 250.963 127.614 254.83 126.95 258.766L220.057 240.144L220.057 240.142C219.607 238.507 219.137 236.899 218.651 235.32C218.171 233.758 217.676 232.226 217.164 230.725L217.148 230.675C217.135 230.635 217.12 230.599 217.108 230.56C216.63 229.167 216.135 227.804 215.628 226.467L215.478 226.065C214.956 224.699 214.423 223.36 213.871 222.057C213.825 221.949 213.776 221.845 213.731 221.737C213.229 220.565 212.713 219.424 212.187 218.307L211.797 217.481C211.627 217.128 211.457 216.776 211.283 216.429C210.999 215.859 210.711 215.295 210.42 214.741C210.333 214.579 210.25 214.411 210.165 214.251C209.773 213.517 209.373 212.803 208.969 212.101C208.849 211.893 208.729 211.691 208.609 211.487C208.304 210.967 207.995 210.455 207.683 209.954C207.555 209.748 207.426 209.542 207.297 209.339C206.87 208.669 206.439 208.011 206 207.376C198.148 196.032 189.4 190.252 176.4 190.252Z" fill="#d8d6c3" fillOpacity="1"></path><path d="M202.698 261.975L114.975 279.519L158.837 294.452Z" fill="#ecc98d" fillOpacity="1"></path><path d="M225.723 267.321L161.965 314.531L89.4 289.827L89.4 358.159L231.007 333.745C230.445 312.275 229.062 288.895 225.723 267.323Z" fill="#ecc98d" fillOpacity="1"></path><path d="M231.283 351.958L194.01 358.385L231.348 363.053C231.338 359.489 231.318 355.759 231.284 351.957Z" fill="#f5a623" fillOpacity="1"></path><path d="M359.401 352.781L329.401 360.281L329.401 494.254L359.401 494.254Z" fill="#cddff3" fillOpacity="1"></path><path d="M133.023 368.901L71.403 379.527L71.403 372.915C56.977 377.458 44.345 383.81 35.927 390.355C27.984 396.535 24.725 402.719 24.647 404.837C24.607 405.897 24.637 406.329 25.939 407.69C27.189 408.997 30.051 410.856 34.752 412.5C114.327 425.555 158.766 404.844 210.092 378.534Z" className="selected" fill="#d2e4f8" fillOpacity="1"></path></g></g></svg>
                            <Form.Control value={email} onChange={handleSetEmail} className='ml-3 col-9 bg-info' type="email" placeholder="Enter email" />
                        </span>
                    </div>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <div>
                        <span className='row justify-content-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id='svg-unlocking'><defs><linearGradient id="lorc-unlocking-gradient-1"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#f8fafd" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-2"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#bdd2bf" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-3"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#83b6f0" stopOpacity="1"></stop></linearGradient><linearGradient x1="0" x2="1" y1="1" y2="0" id="lorc-unlocking-gradient-11"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#ba9f0b" stopOpacity="1"></stop></linearGradient><linearGradient x1="0" x2="0" y1="0" y2="1" id="lorc-unlocking-gradient-12"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#cecece" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-13"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#ba9f0b" stopOpacity="1"></stop></linearGradient><linearGradient id="lorc-unlocking-gradient-14"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#ba9f0b" stopOpacity="1"></stop></linearGradient></defs><path d="M0 0h512v512H0z" fill="#195f9f" fillOpacity="1"></path><g transform="translate(0,0)"><g><path d="M78.53 157.188C54.687 157.188 34.6 178.552 28.25 207.781C24.034 213.321 21.5 220.216 21.5 227.657C21.5 235.163 24.06 242.124 28.344 247.687C34.819 276.65 54.829 297.751 78.531 297.751C102.824 297.751 123.251 275.578 129.188 245.501L234.97 245.501L234.97 311.095L254.28 311.095L254.28 266.875L272.97 266.875L272.97 311.095L293.062 311.095L293.062 286L311.75 286L311.75 311.094L326.875 311.094L326.875 245.5L344.845 245.5L344.845 212.03L129.655 212.03C124.407 180.648 103.515 157.187 78.531 157.187Z" fill="url(#lorc-unlocking-gradient-2)"></path><path d="M424.44 169.28C392.66 169.28 366.627 195.316 366.627 227.094C366.627 244.744 374.463 260.767 387.097 271.406L361.877 344.344L357.597 356.75L490.72 356.75L486.406 344.344L461.219 271.406C473.849 260.766 481.686 244.744 481.686 227.094C481.686 195.452 456.216 169.281 424.436 169.281Z" fill="url(#lorc-unlocking-gradient-3)"></path><path d="M424.44 187.97C446.057 187.97 463.002 205.342 463.002 227.094C463.002 241.096 455.945 253.211 445.127 260.094L438.907 264.064L441.315 271.031L464.471 338.064L383.81 338.064L407 271.03L409.406 264.063L403.186 260.093C392.369 253.211 385.313 241.096 385.313 227.093C385.313 205.478 402.82 187.969 424.438 187.969Z" fill="#303030" fillOpacity="1"></path><path d="M54.47 213.375C62.473 213.375 68.783 219.655 68.783 227.655C68.783 235.658 62.473 241.937 54.473 241.937C46.47 241.937 40.191 235.657 40.191 227.657C40.191 219.654 46.471 213.375 54.471 213.375Z" className="selected" fill="#4a4a4a" fillOpacity="1"></path></g></g></svg>
                            <Form.Control value={password} onChange={handleSetPassword} className='ml-3 col-9 bg-info' type="password" placeholder="Password" />
                        </span>
                    </div>
                </Form.Group>
                <SubmitBtn onClick={handleSubmit} children='Login' />
            </Form>
            <div className='row justify-content-center my-3'>
                <Link to='/register' className='btn btn-link border-light text-light'>Don't have an Account?...Register here</Link>
            </div>
        </section>
    );
};

interface LoginProps { }

export default Login;