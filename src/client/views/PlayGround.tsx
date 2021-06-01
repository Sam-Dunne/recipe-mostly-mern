import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { IFlavorTags, IIngredients, IRecipes } from '../../interfaces';
import SingleSelect from '../components/SingleSelect';
import { Form } from 'react-bootstrap';


/* HOOK REACT EXAMPLE */
const PlayGround = (props: PlayGroundProps) => {
    const history = useHistory();
    // recipe_id
    const { id } = useParams<{ id: string }>();
    // const [x, setx] = useState<string>('');
    // const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);




    const [flavorTags, setFlavorTags] = useState<IIngredients>(null);


    const [updatedFT, setUpdatedFT] = useState<IFlavorTags[]>([]);


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // const [tagId] = flavorTags;
        // console.log(tagId.id)

        history.push(`/by_flavor_tag/${flavorTags.id}`)
    };


    return (
        <section className="container my-3">
            <div className='bg-primary rounded shadow mb-3 p-4'>

                <h3 className="text-info text-center mb-1">Add Ingredients and Flavor Tags</h3>

                <div>
                    <h5 className="text-secondary ml-3">Select Tags</h5>
                    <SingleSelect setter={setFlavorTags} type={'flavorTags'} placeholder={'Flavor Tags'} />
                </div>
            </div>
                <button className="btn btn-link btn-secondary border" onClick={handleSubmit}>Filter</button>

            <Link to='/'>Link</Link>
        </section>
    );
};

interface PlayGroundProps { }

export default PlayGround;