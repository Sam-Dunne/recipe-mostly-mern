import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

/* HOOK REACT EXAMPLE */
const AddRecipe = (props: AddRecipeProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [x, setx] = useState<string>('');
    const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);
    const [title, setTitle] = useState<string>('');
    const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const [summary, setSummary] = useState<string>('');
    const handleSetSummary = (e: React.ChangeEvent<HTMLInputElement>) => setSummary(e.target.value);
    const [directions, setDirections] = useState<string>('');
    const handleSetDirections = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDirections(e.target.value);



    useEffect(() => {

    }, []);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiService(`/api/recipes`, 'POST', {  title, summary, directions })
    };

    return (
        <main className="container my-5">
            <h1 className="text-primary text-center">AddRecipe</h1>
            <input className='form-control' value={title} onChange={handleSetTitle} placeholder='Title' />
            <br />
            <input className='form-control' value={summary} onChange={handleSetSummary} placeholder='Summary' />
            <br />
            <div>
                <textarea className='form-control col-md-5' value={directions} onChange={handleSetDirections} placeholder='directions' rows={6} />
            </div>
            <div className='card card-body p-3 col-md-5' >
                <ReactMarkdown remarkPlugins={[gfm]} children={directions} />
            </div>
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <Link to='/'>Link</Link>
        </main>
    );
};

interface AddRecipeProps { }

export default AddRecipe;