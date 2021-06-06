import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IUserRecipes } from '../../interfaces';
import { apiService } from '../utils/api-services';
import { Button, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Moment from 'moment';
import recipeFlavorTags from '../../server/db/recipeFlavorTags';



/* HOOK REACT EXAMPLE */
const EditRecipe = (props: EditRecipeProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [x, setx] = useState<string>('');
    const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);
  ;

    const [title, setTitle] = useState<string>('');
    const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    const [summary, setSummary] = useState<string>('');
    const handleSetSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => setSummary(e.target.value);

    const [instructions, setInstructions] = useState<string>(``);
    const handleSetInstructions = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value);


    useEffect(() => {
        apiService(`/api/recipes/${id}`)
            .then(recipe => {
                setTitle(recipe.title)
                setSummary(recipe.summary)
                setInstructions(recipe.instructions)
            })
    }, [id]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiService(`/api/recipes/${id}`, `PUT`, {title, summary, instructions})
        .then(res => {
            alert(res.message);
            history.push(`/recipe_details/${res.recipeID}`)
        })
    };

    return (
        <section className="container my-3">
        <Form className=' bg-primary rounded shadow mb-3 p-3'>

            <h3 className="text-info text-center mb-3">{`Edit  "${title}"  Recipe`}</h3>

            <h5 className="text-secondary">Edit Title</h5>
            <input className='form-control mb-3 bg-info' value={title} onChange={handleSetTitle} placeholder='Title' />
            
            <h5 className="text-secondary">Edit Summary</h5>
            <textarea className='form-control mb-3 bg-info' value={summary} onChange={handleSetSummary} placeholder='Summary' cols={10} rows={3}></textarea>


            <div className="row d-flex justify-content-around mb-3">
                <div className='col-md-6 mb-3'>
                    <h5 className="text-secondary">Edit Recipe Directions Markdown</h5>
                    <textarea className='form-control bg-info' value={instructions} onChange={handleSetInstructions} placeholder='directions' rows={8} />
                    <h6 className="text-secondary">Learn more about <a href="https://www.markdownguide.org/cheat-sheet/" className='text-warning'>Markdown </a>here</h6>
                </div>

                <div className='col-md-6'>
                    <h5 className="text-secondary">Markdown Live Preview</h5>
                    <div className='card card-body bg-info mb-3 '>
                        <div>
                            <ReactMarkdown remarkPlugins={[gfm]} children={instructions} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center mt-4'>
                    <Button variant='primary' type="submit" className='btn-link mx-auto border-info text-info p-3 font-weight-bold' onClick={handleSubmit}>
                        Submit
                     </Button>
                </div>

        </Form>
    
    </section>
    );
};

interface EditRecipeProps { }

export default EditRecipe;