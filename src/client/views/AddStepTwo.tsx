import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { IFlavorTags, IIngredients, IRecipes } from '../../interfaces';
import MultiSelect from '../components/MultiSelect';
import { Form } from 'react-bootstrap';


/* HOOK REACT EXAMPLE */
const AddStepTwo = (props: AddStepTwoProps) => {
    const history = useHistory();
    // recipe_id
    const { id } = useParams<{ id: string }>();
    // const [x, setx] = useState<string>('');
    // const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);

    const [recipe, setRecipe] = useState<IRecipes>(null);

    // const [qtyValues, setQtyValues] = useState<{ ingredient_qty: string }[]>([])
    const [qtyValue, setQtyValue] = useState<string>('');
    const handleSetQtyValue = (e: React.ChangeEvent<HTMLInputElement>) => setQtyValue(e.target.value);
    // Arrays of objects for the Select Fields
    const [flavorTags, setFlavorTags] = useState<IFlavorTags[]>([]);
    
    const [ingredient_qty, setIngredient_Qty] = useState<string>('');
    
    const [ingredients, setIngredients] = useState<IIngredients[]>([]);

    useEffect(() => {
        apiService(`/api/recipes/${id}`)
            .then(recipe => setRecipe(recipe))
    }, [])

    const handleAddIngredients = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // setQtyValues([...qtyValues, { ingredient_qty: qtyValue }])
        // setQtyValue('');
        // console.log(qtyValues)
        const array_of_ingredients = ingredients.map(ingredient => {
            return ingredient.id
        })
        apiService(`/api/recipeingredients/multi/${id}`, `POST`, {array_of_ingredients})
        .then(res =>{
            console.log(res)
        });

        const array_of_flavor_tags = flavorTags.map(flavortag => {
            return flavortag.id
        })
        apiService(`/api/recipeflavortags/multi/${id}`, `POST`, {array_of_flavor_tags})
        .then(res =>{
            console.log(res);
            history.push(`/recipe_details/${id}`)
        })
        // console.log(test)
      
    };

    return (
        <section className="container my-3">
            <div className='bg-primary rounded shadow mb-3 p-4'>

                <h3 className="text-info text-center mb-1">Add Ingredients and Flavor Tags</h3>

                <h3 className='text-info text-center mb-3'>{`for "${recipe?.title}"`}</h3>


                <div>
                    <h5 className="text-secondary ml-3">Select Tags</h5>
                    <MultiSelect setter={setFlavorTags} type={'flavorTags'} placeholder={'Flavor Tags'} />
                </div>

                <div>
                    <h5 className="text-secondary ml-3">Add Ingredients</h5>
                    <MultiSelect setter={setIngredients} type={'ingredients'} placeholder={'Ingredients'} />
                </div>


                {/* <div className='row justify-content-around mb-3'>
                    <form className="form-group col-md-5">
                        <input className="form-control bg-info" value={qtyValue} onChange={handleSetQtyValue} id="" placeholder='quantity/measure'></input>
                    </form>
                </div>

                <div className="row justify-content-center align-items-center">
                    <div className="card rounded mb-3 bg-info col-12 col-md-6 ">
                        <h3 className='card-text mb-3 text-center mx-auto bg-info'>{qtyValue} {ingredients[0]?.name} ,</h3>
                    </div>
                </div>
                <div className='row justify-content-around mb-3'>
                    <div className="form-group col-md-5">
                        {qtyValues?.map((qtyValue, i) => (
                            <div key={i} className="col-6">
                                <div className="card">{qtyValue.ingredient_qty}</div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
            <button onClick={handleAddIngredients}>Submit</button>

            <Link to='/'>Link</Link>
        </section>
    );
};

interface AddStepTwoProps { }

export default AddStepTwo;