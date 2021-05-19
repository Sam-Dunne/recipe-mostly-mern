import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IUserRecipes } from '../../interfaces';
import { apiService } from '../utils/api-services';

/* HOOK REACT EXAMPLE */
const UsersRecipes = (props: UsersRecipesProps) => {
    const history = useHistory();
    const { email } = useParams<{ email: string }>();
    const [recipes, setRecipes] = useState<IUserRecipes[]>([]);
    // const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);
    const [x, setx] = useState<string>('');
    const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);

    useEffect(() => {
        apiService(`/api/recipes/by/${email}`)
        .then(recipes => setRecipes(recipes))
    }, []);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    return (
        <main className="container my-5">
            <h1 className="text-primary text-center">UsersRecipes</h1>
            {recipes?.map(recipe => (
                <div key={`option-${recipe.id}`} className='border p-3'>
                    <h4 >{recipe.title}</h4>
                    <h6>{recipe.created_at}</h6>
                    <Link to={`/recipe/${recipe.id}`}>To {recipe.title}</Link>
                </div>
            ))}
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
        </main>
    );
};

interface UsersRecipesProps { }

export default UsersRecipes;