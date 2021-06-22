import * as React from 'react';
import { Link } from 'react-router-dom';
import { SiLinkedin } from 'react-icons/si';
import { GoMarkGithub } from "react-icons/go";

const Footer = (props: FooterProps) => {

    return (
        <section className="bg-secondary" >
            <div className="bg-primary p-2 container rounded" id='footer'>
                <h4 className="text-secondary text-center mb-3">Thanks for visiting!</h4>
                <div className="row justify-content-around align-items-center px-4 my-2">
                    <a href="https://www.linkedin.com/in/samdunnewebdev/" target='blank'><SiLinkedin className='bg-primary text-info icon' /></a>
                    <Link to='/' className='text-success bg-info p-3 rounded shadow' >Contact</Link>
                    <a href="https://github.com/Sam-Dunne/recipe-mostly-mern" target='blank'><GoMarkGithub className='bg-primary text-info icon' /></a>
                </div>
            </div>

        </section>
    );
};

interface FooterProps { }

export default Footer;