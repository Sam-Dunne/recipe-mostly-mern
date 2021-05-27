import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { IFlavorTags, IIngredients } from '../../interfaces';
import MultiSelect from '../components/MultiSelect';
import {Form} from 'react-bootstrap';


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

    const [directions, setDirections] = useState<string>(`##### Here's an example to get you started! \n\ ---  \n\ ###### Just fold in the cheese, David!\n\  - What does that even mean?\n\ 1. Fold\n\ 2. in the\n\ 3. cheese!!!\n\ **Do You even know what it means?** \n\ *I most certainly do!!*`);
    const handleSetDirections = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDirections(e.target.value);

    const [ingredients, setIngredients] = useState<IIngredients[]>([])
    const [flavorTags, setFlavorTags] = useState<IFlavorTags[]>([]);
    



    // useEffect(() => {
    //     apiService('/api/flavortags')
    //     .then(flavorTags => setFlavorTags(flavorTags));
    // }, []);

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setQtyValues([...qtyValues, { ingredient_qty: qtyValue }])
        setQtyValue('');
        console.log(qtyValues)
    };

    return (
        <section className="container my-3">
            <Form className=' bg-primary rounded shadow mb-3 p-3'>
                
            <h3 className="text-secondary text-center mb-3">Add a Recipe</h3>


            <input className='form-control mb-3 bg-info' value={title} onChange={handleSetTitle} placeholder='Title' />

            <textarea className='form-control mb-3 bg-info' value={summary} onChange={handleSetSummary} placeholder='Summary' cols={10} rows={3}></textarea>


            <div className="row d-flex justify-content-around mb-3">
                <div className='col-md-6 mb-3'>
                    <h5 className="text-secondary">Enter Recipe Directions Markdown</h5>
                    <textarea className='form-control bg-info' value={directions} onChange={handleSetDirections} placeholder='directions' rows={8} />
                    <h6 className="text-secondary">Learn more about <a href="https://www.markdownguide.org/cheat-sheet/">Markdown </a>here</h6>
                </div>

                <div className='col-md-6'>
                    <h5 className="text-secondary">Markdown Live Preview</h5>
                    <div className='card card-body bg-info mb-3 '>
                        <div>
                            <ReactMarkdown remarkPlugins={[gfm]} children={directions} />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h5 className="text-secondary ml-3">Add Ingredients</h5>
                <MultiSelect setter={setIngredients} type={'ingredients'} placeholder={'Ingredients'} />
            </div>
            
            <div>
                <h5 className="text-secondary ml-3">Select Tags</h5>
                <MultiSelect setter={setFlavorTags} type={'flavorTags'} placeholder={'Flavor Tags'} />
            </div>

            {/* <div className='row justify-content-around mb-3'>
                <form className="form-group col-md-5">
                    <input className="form-control" value={qtyValue} onChange={handleSetQtyValue} id="" placeholder='quantity/measure'></input>
                </form>
            </div> */}
            <div className='row justify-content-around mb-3'>
                <div className="form-group col-md-5">
                    {qtyValues?.map((qtyValue, i) => (
                        <div key={i} className="col-6">
                            <div className="card">{qtyValue.ingredient_qty}</div>
                        </div>
                    ))}
                </div>

            </div>
            </Form>
            <button onClick={handleAddIngredient}>Submit</button>

            <Link to='/'>Link</Link>
        </section>
    );
};

interface AddRecipeProps { }

export default AddRecipe;