import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services';
import { FaReact, FaNode, FaSass } from 'react-icons/fa';
import { SiMysql, SiPostman, SiTypescript, SiCss3, SiJavascript } from 'react-icons/si';

const Landing = (props: LandingProps) => {
    const [from, setFrom] = useState<string>('');
    const handleSetFrom = (e: React.ChangeEvent<HTMLInputElement>) => setFrom(e.target.value)
    const [subject, setSubject] = useState<string>('');
    const handleSetSubject = (e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)
    const [message, setMessage] = useState<string>('');
    const handleSetMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiService('/api/contact', 'POST', { from, subject, message })
            .then(result => console.log(result));
    }
    return (
        <section className="container p-2">
            <div className="row justify-content-center align-items-center p-3">
                <div className="card card-body bg-primary col-md-10 col-lg-8">
                    <h2 className="mx-5 text-center text-info">Recipe Registry</h2>
                    <p className="card card-text bg-light p-2">This site is built with Node with Express,
                    MySQL, React, and TypeScript.  Incorporates 3rd Party APIs Stripe and Mailgun.
                      As well as Passport for Authentication and Authorization. Thanks for visiting!</p>
                    <div className="row justify-content-around align-items-center my-3">
                        <span><FaReact className='bg-primary text-info icon rounded' /></span>
                        <span><SiJavascript className='bg-primary text-info icon rounded' /></span>
                        <span><FaNode className='bg-primary text-info icon rounded' /></span>
                        <span><SiMysql className='bg-primary text-info icon rounded' /></span>
                    </div>
                    <div className="row justify-content-around align-items-center my-3">
                        <span><SiPostman className='bg-primary text-info icon rounded' /></span>
                        <span><SiTypescript className='bg-primary text-info icon rounded' /></span>
                        <span><FaSass className='bg-primary text-info icon rounded' /></span>
                        <span><SiCss3 className='bg-primary text-info icon rounded' /></span>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center align-items-center p-3">
                <form className="form-group border rounded shadow bg-primary col-md-8">
                    <input className="form-control bg-light my-3"
                        onChange={handleSetFrom}
                        value={from}
                        placeholder="Your Email" />
                    <input className="form-control bg-light mb-3"
                        onChange={handleSetSubject}
                        value={subject}
                        placeholder="Subject" />
                    <textarea className="form-control bg-light mb-3"
                        rows={8}
                        onChange={handleSetMessage}
                        value={message}
                        placeholder="Message" />
                    <div className="container ">
                        <div className="row justify-content-between align-items-center">
                            <button className="btn btn-primary mb-2" onClick={handleSubmit}>Contact Me!</button>
                            <Link to="/" className="btn btn-link bg-light rounded mb-2">
                                Back Home
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

interface LandingProps { };
export default Landing;