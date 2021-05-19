import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
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
        <main className="container my-5">
            <h1 className="text-primary text-center">App</h1>
            <input value={x} onChange={handleSetX} placeholder='placholder' />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <Link to='/'>Link</Link>
        </main>
    );
};

interface AppProps { }

export default App;