import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { IFlavorTags, IIngredients, IRecipeIngredientsFull, IRecipes } from '../../interfaces';
import MultiSelect from '../components/MultiSelect';
import { Dropdown, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { IoEllipsisVerticalCircleOutline } from 'react-icons/io5';
import { MdAddCircleOutline } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { FiEdit } from 'react-icons/fi';


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

        if (selectedIngs.length === 0) {
            // ???  Modal with option to stay or move on to next step ???
            Swal.fire({
                title: 'Are you sure?',
                text: "You haven't added any new ingredients!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'That is okay, take me to the next step to edit quantities and measures for existing recipe ingredients !',
                cancelButtonText: 'No, cancel! Stay here and Let me double check'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Final Step here we come!',
                        'Remember to update qty and measure for ALL ingredients before submittal',
                        'success'
                    )
                    history.push(`/single/${id}`)
                }
            })
            return
        }

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
                <div className="row justify-content-between align-items-center p-3">
                    <h3 className="text-info text-center mb-1 ml-4">Add Ingredients to {recipe?.title}</h3>


                    <div className="btn-group mr-4">
                        <button className="btn btn-lg" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <IoEllipsisVerticalCircleOutline className='bg-primary text-info icon' />
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Dropdown.Item as="button">
                                <Link to={`/users_recipes/${recipe?.user_id}`} className='btn btn-link border-light text-success'><GoHome />  All your recipes </Link>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <Link to={`/edit_recipe/${recipe?.id}`} className='btn btn-link border-light text-success'><FiEdit />  Recipe</Link>
                            </Dropdown.Item>

                        </div>
                    </div>


                </div>
                <div>
                   
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
                    <h2 className='text-info text-bold mx-auto mb-3'>Existing Recipe Ingredients</h2>

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