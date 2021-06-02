import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import PrivateRoute from './utils/PrivateRoute';
import Navbah from './components/Navbar';
import Playground from './views/Playground';
import AddRecipe from './views/AddRecipe';
import AddStepTwo from './views/AddStepTwo';
import ByFlavorTag from './views/ByFlavorTag';
import EditRecipe from './views/EditRecipe';
import Landing from './views/Landing';
import Login from './views/Login';
import RecipeDetails from './views/RecipeDetails';
import Register from './views/Register';
import UsersRecipes from './views/UserRecipes';

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {

	return (
		<BrowserRouter>
			<div className="bg-secondary p-2" id='wrapper'>
				<Navbah />
				<main className="container p-2 mt-4">
					<div className="row justify-content-center align-items-center">
						<Switch>
							<Route exact path='/'>
								<Landing />
							</Route>
							<Route exact path='/edit_recipe/:id'>
								<EditRecipe />
							</Route>
							<Route exact path='/recipe_details/:id'>
								<RecipeDetails />
							</Route>
							<Route exact path='/users_recipes/:id'>
								<UsersRecipes />
							</Route>
							<Route exact path='/by_flavor_tag/:id'>
								<ByFlavorTag />
							</Route>
							<Route exact path='/addRecipe/'>
								<AddRecipe />
							</Route>
							<Route exact path='/add_Ingredients/:id'>
								<AddStepTwo />
							</Route>
							<Route exact path='/single/:id'>
								<Playground />
							</Route>
							<Route exact path='/login'>
								<Login />
							</Route>
							<Route exact path='/register'>
								<Register />
							</Route>
						</Switch>
					</div>
				</main>
			</div>
		</BrowserRouter>
	);
};

interface AppProps { }

export default App;
