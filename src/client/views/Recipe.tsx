import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IUserRecipes } from '../../interfaces';
import { apiService } from '../utils/api-services';

/* HOOK REACT EXAMPLE */
const Recipe = (props: RecipeProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [x, setx] = useState<string>('');
    const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);
    const [recipe, setRecipe] = useState<IUserRecipes>(null);
    // const handleSetRecipe = (e: React.ChangeEvent<HTMLInputElement>) => setRecipe(e.target.value);

    useEffect(() => {
        apiService(`/api/recipes/${id}`)
            .then(recipe => setRecipe(recipe))
    }, [id]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    return (
        <main className="container my-5">
            <h1 className="text-primary text-center">Recipe</h1>
            <div>
                <h5>{recipe?.title}</h5>
                <h5>{recipe?.created_at}</h5>
                <h5>{recipe?.summary}</h5>
                <Link to={`/edit_recipe/${recipe?.id}`}>To Edit</Link>
            </div>

            
        </main>
    );
};

interface RecipeProps { }

export default Recipe;