import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'

import { IIngredients, IRecipeingredients, IRecipeIngredientsFull } from '../../interfaces';
import { IoEllipsisVerticalCircleOutline } from 'react-icons/io5';



/* HOOK REACT EXAMPLE */
const PlayGround = (props: PlayGroundProps) => {
    const history = useHistory();
    // recipe_id
    const { id } = useParams<{ id: string }>();
    // const [x, setx] = useState<string>('');
    // const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);

    const [recipeIngreds, setRecipeIngreds] = useState<IRecipeIngredientsFull[]>([]);
    const [ingredient_qty, setIngredient_Qty] = useState<string>('');
    const handleSetIngredient_Qty = (e: React.ChangeEvent<HTMLInputElement>) => setIngredient_Qty(e.target.value)



    useEffect(() => {
        apiService(`/api/recipeingredients/${id}`)
            .then(ingreds => setRecipeIngreds(ingreds));
    }, []);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

    };


    return (
        <section className="container my-3">

            <div className="btn-group">
                <button className="btn btn-secondary btn-lg" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <IoEllipsisVerticalCircleOutline />
                </button>
                <div className="dropdown-menu">
                 

                </div>
            </div>

            <div className='bg-primary rounded shadow mb-3 p-4'>
                <h3 className="text-info text-center mb-1">{`Add Qty & Measure`}</h3>
                {recipeIngreds?.map(ingred => (
                    <div key={`option-${ingred.ingredient_id}`} className="card-body justify-content-center rounded shadow mb-2 mx-auto bg-info pb-3 col-12 col-md-8 col-lg-10">
                        <input type="text" placeholder='QTY and Measure' value={ingredient_qty} onChange={handleSetIngredient_Qty} />
                        <h5 className="card-text">{`${ingred.name}`}</h5>
                    </div>
                ))}
            </div>
            <button className="btn btn-link btn-secondary border" onClick={handleSubmit}>Filter</button>

            <Link to='/'>Link</Link>
        </section>
    );
};

interface PlayGroundProps { }

export default PlayGround;