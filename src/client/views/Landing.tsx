import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

/* HOOK REACT EXAMPLE */
const Landing = (props: LandingProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [x, setx] = useState<string>('');
    const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);

    useEffect(() => {

    }, []);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    return (
        <section className="my-5 col-md-8 rounded shadow-lg p-3">
            <h1 className="text-center">Welcome to Recipe Registry</h1>
            <input value={x} onChange={handleSetX} placeholder='placholder' />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <Link to='/'>Link</Link>
        </section>
    );
};

interface LandingProps { }

export default Landing;