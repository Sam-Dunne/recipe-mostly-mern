import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services';
import { FaReact, FaNode, FaSass } from 'react-icons/fa';
import { SiMysql, SiPostman, SiTypescript, SiCss3, SiJavascript } from 'react-icons/si';
import SubmitBtn from '../components/SubmitBtn';
import MyModal from '../components/SweetAlerts';

const Landing = (props: LandingProps) => {
    const [from, setFrom] = useState<string>('');
    const handleSetFrom = (e: React.ChangeEvent<HTMLInputElement>) => setFrom(e.target.value)
    const [subject, setSubject] = useState<string>('');
    const handleSetSubject = (e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)
    const [message, setMessage] = useState<string>('');
    const handleSetMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!from || !subject || !message) {
            MyModal.fieldValidation(('Oops...'), ('All fields required'));
            return
        }
        apiService('/api/contact', 'POST', { from, subject, message })
            .then(result => {
                MyModal.timeoutSuccess('Thanks for the Message!', `${result.newEmail.from}`)
                setFrom('');
                setSubject('');
                setMessage('')
            })
    }
    return (
        <section className="container p-2 ">
            <div className="row justify-content-center align-items-center ">
                <div className="card card-body bg-primary px-sm-2 px-md-4 col-md-10 col-lg-8">
                    <h2 className="mx-5 mb-3 text-center text-info">Welcome to Recipe Registry</h2>
                    <p className="card card-text bg-light p-2">Welcome! This app is a convenient way to store and edit your favorite personal recipes.
                        First you will input a recipe's Title, brief summary, and cooking instructions, as well as select as many "Flavor Tags" from a dropdown that fit that recipe.
                        Upon submittal, you'll be delivered to a view where you may add all or some core ingredients (ie. bacon, lettuce, tomato, etc).
                        Next you'll add the Quantity and Measure (ie. 2 cups, 3 tsp, 4 whole), for each ingredient.
                        You may then edit and/or append ingredients and the cooking directions as needed.  Thanks for visiting, I hope you enjoy!  </p>
                    <p className="card card-text bg-light p-2">This app is built with Express/Node,
                        MySQL, React, and TypeScript.  Incorporates 3rd Party API Mailgun. It is mobile responsive.
                        Passport for Authentication and Authorization. Passwords are salted and hashed for security. Thanks for visiting!
                        This was very challenging and I learned so much throughout the process. Contact me below, if you have change requests or find a bug.</p>
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
            <div className="row justify-content-center align-items-center mt-3">

                <form className="form-group border rounded shadow bg-primary px-sm-2 px-md-4 col-md-10 col-lg-8">
                    <h4 className="mx-5 my-3 text-center text-info">Contact Me</h4>
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
                    <SubmitBtn onClick={handleSubmit} children={`Send`} />
                </form>
            </div>
        </section>
    )
}

interface LandingProps { };
export default Landing;