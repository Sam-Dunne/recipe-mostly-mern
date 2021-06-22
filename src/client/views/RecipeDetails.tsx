import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IRecipeFlavorTagsFull, IRecipeIngredientsFull, IUserRecipes } from '../../interfaces';
import { apiService } from '../utils/api-services';
import { MdAddCircleOutline } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Moment from 'moment';
import Swal from 'sweetalert2';
import RecipeDetailsEllipsis from '../components/EllipsisDropdowns/RecipeDetailsEllipsis';


const RecipeDetails = (props: RecipeDetailsProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    // const [x, setx] = useState<string>('');
    // const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);

    const [missingIngred_qty, setMissingIngred_qty] = useState<boolean>(false);

    const [recipe, setRecipe] = useState<IUserRecipes>(null);
    const [recipeFlavorTags, setRecipeFlavorTags] = useState<IRecipeFlavorTagsFull[]>([]);
    const [ingreds, setIngreds] = useState<IRecipeIngredientsFull[]>([]);

    useEffect(() => {
        apiService(`/api/recipes/${id}`)
            .then(recipe => setRecipe(recipe));
        apiService(`/api/recipeFlavorTags/${id}`)
            .then(recipeFlavorTags => setRecipeFlavorTags(recipeFlavorTags));
        apiService(`/api/recipeingredients/${id}`)
            .then(ingreds => setIngreds(ingreds));
    }, []);

    // trigger for conditional render of Link to AddStepThree if any recipeIngredient does not have a ingredient_qty value
    useEffect(() => {
        ingreds.map(ingred => {
            if (!ingred.ingredient_qty) {
                setMissingIngred_qty(true);
                return
            }
        })
    }, [ingreds])

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Modal with option to stay or move on to next step
        Swal.fire({
            title: 'Are you sure you want to DELETE this recipe?',
            text: "This Action is Permanent!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9f1919',
            cancelButtonColor: '#969696',
            confirmButtonText: 'Yes, I want to DELETE this recipe!',
            cancelButtonText: 'No, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                apiService(`/api/recipes/${id}`, `DELETE`)
                    .then(res => {
                        Swal.fire(
                            `${recipe?.title} Recipe has been deleted`,
                            'success'
                        )
                        history.push(`/users_recipes/${res.user_id}`)
                    });
            }
        })

    };

    return (
        <>
            <section className="container my-2">
                <div className="row d-flex justify-content-center align-items-center p-3">
                    <div className="card bg-primary p-2 px-md-3 py-md-4 rounded shadow  col-12 col-md-10 col-lg-8">
                        <div className="row justify-content-end">
                            <RecipeDetailsEllipsis
                                toUsers_recipes={`/users_recipes/${recipe?.user_id}`}
                                toAdd_ingredients={`/add_Ingredients/${id}`}
                                toAddQtyMeasure={`/add_qtymeasure/${id}`}
                                toEdit_recipe={`/edit_recipe/${recipe?.id}`}
                                onClick={handleDelete}
                            />
                        </div>
                        <h3 className='text-info text-bold mx-auto font-italic'>{recipe?.title}</h3>
                        <div className="row bg-primary justify-content-between align-items-center mb-3 mx-auto col-12 col-md-8 col-lg-10 ">
                        </div>
                        {(ingreds.length == 0) &&

                            <Link to={`/add_Ingredients/${id}`} className='btn btn-danger btn-link border-info text-info p-3 font-weight-bold mb-3 mx-auto'>
                                <MdAddCircleOutline />  Ingredients</Link>
                        }
                        {(missingIngred_qty) &&
                            <Link to={`/add_qtymeasure/${id}`} className='btn btn-link btn-danger border-info text-info p-3 font-weight-bold mb-3 mx-auto'>
                                <MdAddCircleOutline />  Some Ingredients are missing Qty/Measure values. Fix here</Link>
                        }

                        <div className="card-body rounded shadow bg-info p-2 pt-4 px-md-4 mx-auto col-12 col-md-10 col-lg-10 ">
                            <div className="row justify-content-around mb-4" >
                                {recipeFlavorTags?.map(tag => (
                                    <div key={tag.id}>
                                        <Link to={`/by_flavor_tag/${tag.id}`}><span className="badge badge-pill badge-success p-2 mb-3" >{tag.name} </span></Link>
                                    </div>
                                ))}
                            </div>
                            <p className='card-text'>{Moment(recipe?.created_at).format("MMM Do YY")}</p>
                            <h5>{recipe?.summary}</h5>
                            <hr />
                            <div className='mt-3'>
                                <h6>Cooking Instructions:</h6>
                                <ReactMarkdown remarkPlugins={[gfm]} children={recipe?.instructions} />
                            </div>
                        </div>
                    </div>
                </div>
                {(ingreds.length > 0) && <div className="row d-flex justify-content-center align-items-center p-3">
                    <div className="card bg-primary shadow p-2 px-md-3 py-md-4 col-12 col-md-10 col-lg-8">
                        <h3 className='text-info text-bold mx-auto mb-3'>Ingredients</h3>
                        <div className="card-body justify-content-center rounded shadow mx-auto bg-info pl-4 pr-2 px-md-5 pb-3 col-12 col-md-10 col-lg-10">
                            {ingreds?.map(ingred => (
                                <p key={`option-${ingred.ingredient_id}`} className="card-text">{`${ingred.ingredient_qty || "***Zero***"} ${ingred.name}`}</p>
                            ))}
                        </div>
                    </div>
                </div>}
            </section>
        </>
    );
};

interface RecipeDetailsProps { }

export default RecipeDetails;