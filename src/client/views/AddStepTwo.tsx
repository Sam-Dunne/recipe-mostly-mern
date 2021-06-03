import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { IFlavorTags, IIngredients, IRecipeIngredientsFull, IRecipes } from '../../interfaces';
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
    const [ingreds, setIngreds] = useState<IRecipeIngredientsFull[]>([]);

    // const [qtyValues, setQtyValues] = useState<{ ingredient_qty: string }[]>([])
    const [qtyValue, setQtyValue] = useState<string>('');
    const handleSetQtyValue = (e: React.ChangeEvent<HTMLInputElement>) => setQtyValue(e.target.value);
    // Arrays of objects for the Select Fields
    const [flavorTags, setFlavorTags] = useState<IFlavorTags[]>([]);

    const [ingredient_qty, setIngredient_Qty] = useState<string>('');

    const [ingredients, setIngredients] = useState<IIngredients[]>([]);

    const [selectedIngs, setSelectedIngs] = useState<IIngredients[]>([]);

    useEffect(() => {
        apiService(`/api/recipes/${id}`)
            .then(recipe => setRecipe(recipe))
        apiService(`/api/recipeingredients/${id}`)
            .then(ingreds => setIngreds(ingreds));
    }, [])

    useEffect(() => {

        selectedIngs?.forEach(ing => {
            if (ing.id === ing.name) {
                apiService(`/api/ingredients`, "POST", { name: ing.name })
                    .then(res => {
                        return {
                            id: res.id,
                            name: ing.name
                        }
                    })
                    .then(newIng => setIngredients([...selectedIngs, newIng]))
            } else {
                setIngredients([...selectedIngs])
            }
        })
    }, [selectedIngs])

    const handleAddIngredients = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // setQtyValues([...qtyValues, { ingredient_qty: qtyValue }])
        // setQtyValue('');
        // console.log(qtyValues)

        const array_of_ingredients = ingredients.map(ingredient => {
            if (ingredient.id === ingredient.name) return;
            return ingredient.id
        }).filter(ingredient => ingredient)

        apiService(`/api/recipeingredients/multi/${id}`, `POST`, { array_of_ingredients })
            .then(res => {
                history.push(`/single/${id}`)
            });

    };


    return (
        <section className="container my-3">
            <div className='bg-primary rounded shadow mb-3 p-4'>

                <h3 className="text-info text-center mb-1">Add Ingredients and Flavor Tags</h3>

                <h3 className='text-info text-center mb-3'>{`for "${recipe?.title}"`}</h3>

                <div>
                    <h5 className="text-secondary ml-3">Add Ingredients</h5>
                    <MultiSelect setter={setSelectedIngs} type={'ingredients'} placeholder={'Ingredients'} />
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

           {(ingreds.length > 0) && <div className="row d-flex justify-content-center align-items-center rounded p-3">
                <div className="card justify-content-center bg-primary p-5 col-12 col-md-8 col-lg-8">
                    <h2 className='text-info text-bold mx-auto mb-3'>Existing Ingredients</h2>

                    <div className="card-body justify-content-center rounded shadow mx-auto bg-info pb-3 col-12 col-md-8 col-lg-10">
                        {ingreds?.map(ingred => (
                            <h5 key={`option-${ingred.ingredient_id}`} className="card-text">{`-${ingred.name}`}</h5>
                        ))}
                    </div>

                </div>
            </div>}
        </section>
    );
};

interface AddStepTwoProps { }

export default AddStepTwo;