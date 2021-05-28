import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { IFlavorTags, IIngredients } from '../../interfaces';
import MultiSelect from '../components/MultiSelect';
import { Form } from 'react-bootstrap';


/* HOOK REACT EXAMPLE */
const AddRecipe = (props: AddRecipeProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [x, setx] = useState<string>('');
    const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);

    const [qtyValues, setQtyValues] = useState<{ ingredient_qty: string }[]>([])
    const [qtyValue, setQtyValue] = useState<string>('');
    const handleSetQtyValue = (e: React.ChangeEvent<HTMLInputElement>) => setQtyValue(e.target.value);;

    const [title, setTitle] = useState<string>('');
    const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    const [summary, setSummary] = useState<string>('');
    const handleSetSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => setSummary(e.target.value);

    const [instructions, setInstructions] = useState<string>(`##### Here's an example to get you started! \n\ ---  \n\ ###### Just fold in the cheese, David!\n\  - What does that even mean?\n\ 1. Fold\n\ 2. in the\n\ 3. cheese!!!\n\ **Do You even know what it means?** \n\ *I most certainly do!!*`);
    const handleSetInstructions = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        apiService('api/recipes/', 'POST', {title, summary, instructions})
        .then(res => {
            alert(res.message)
            history.push(`/recipe_details/${res.recipeID}`)
        })
    }

    return (
        <section className="container my-3">
            <Form className=' bg-primary rounded shadow mb-3 p-3'>

                <h3 className="text-info text-center mb-3">Add a Recipe</h3>

                <input className='form-control mb-3 bg-info' value={title} onChange={handleSetTitle} placeholder='Title' />

                <textarea className='form-control mb-3 bg-info' value={summary} onChange={handleSetSummary} placeholder='Summary' cols={10} rows={3}></textarea>


                <div className="row d-flex justify-content-around mb-3">
                    <div className='col-md-6 mb-3'>
                        <h5 className="text-secondary">Enter Recipe Directions Markdown</h5>
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


            </Form>
            <button onClick={handleSubmit}>Submit</button>

            <Link to='/'>Link</Link>
        </section>
    );
};

interface AddRecipeProps { }

export default AddRecipe;