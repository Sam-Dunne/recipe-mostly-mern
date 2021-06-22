import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { apiService } from '../utils/api-services'
import { IIngredients, IRecipeIngredientsFull, IRecipes } from '../../interfaces';
import MultiSelect from '../components/MultiSelect';
import Swal from 'sweetalert2';
import SubmitBtn from '../components/SubmitBtn';
import HowToAddIngredPopOver from '../components/PopOversRBS/HowToAddIngredPopOver';
import AddIngredientsEllipsis from '../components/EllipsisDropdowns/AddIngredientsEllipsis';


const AddStepTwo = (props: AddStepTwoProps) => {
    const history = useHistory();
    // recipe_id
    const { id } = useParams<{ id: string }>();

    const [recipe, setRecipe] = useState<IRecipes>(null);
    const [ingreds, setIngreds] = useState<IRecipeIngredientsFull[]>([]);

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
                            name: ing.name.toLocaleLowerCase()
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
            // Modal with option to stay or move on to next step
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
                    history.push(`/add_qtymeasure/${id}`)
                }
            })
            return
        }
        // removes double creations from component state
        const array_of_ingredients = ingredients.map(ingredient => {
            if (ingredient.id === ingredient.name) return;
            return ingredient.id
        }).filter(ingredient => ingredient)

        apiService(`/api/recipeingredients/multi/${id}`, `POST`, { array_of_ingredients })
            .then(res => {
                history.push(`/add_qtymeasure/${id}`)
            });
    };

    return (
        <section className="container my-2">
            <div className='bg-primary rounded shadow mx-auto mb-3 p-1 px-md-3 py-md-4 col-12 col-md-10 col-lg-8'>
                <div className="row justify-content-between align-items-center">
                    <HowToAddIngredPopOver />
                    <AddIngredientsEllipsis
                        toUsers_recipes={`/users_recipes/${recipe?.user_id}`}
                        toAddQtyMeasure={`/add_qtymeasure/${id}`}
                        toEdit_recipe={`/edit_recipe/${recipe?.id}`} />
                </div>
                <h5 className="text-info text-center mb-3 mx-auto">Add Ingredients to</h5>
                <h3 className="text-info text-center font-italic mb-3 mx-auto">{recipe?.title}</h3>
                <div className='row justify-content-around '>
                  
                    <div className="align-items-center mt-1 col-10 col-sm-11">
                        <MultiSelect setter={setSelectedIngs} type={'ingredients'} recipeId={{ id }} placeholder={'Ingredients'} />
                    </div>
                </div>

                <SubmitBtn onClick={handleAddIngredients} children='Submit' />

            </div>

            {(ingreds.length > 0) && <div className="row d-flex justify-content-center align-items-center rounded p-3">
                <div className="card justify-content-center bg-primary py-4 p-2 px-md-5 col-12 col-md-10 col-lg-8">
                    <h3 className='text-info text-bold mx-auto mb-3'>Existing Recipe Ingredients</h3>

                    <div className="card-body justify-content-center rounded shadow mx-auto bg-info px-3 px-md-5 pb-3 col-12 col-md-10 col-lg-10">
                        {ingreds?.map(ingred => (
                            <h5 key={`option-${ingred.ingredient_id}`} className="card-text">{`${ingred.ingredient_qty || "Zero"} ${ingred.name}`}</h5>
                        ))}
                    </div>

                </div>
            </div>}
        </section>
    );
};

interface AddStepTwoProps { }

export default AddStepTwo;