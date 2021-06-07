import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import PrivateRoute from './utils/PrivateRoute';
import Navbah from './components/Navbar';
import AddRecipe from './views/AddRecipe';
import AddStepTwo from './views/AddStepTwo';
import ByFlavorTag from './views/ByFlavorTag';
import EditRecipe from './views/EditRecipe';
import Landing from './views/Landing';
import Login from './views/Login';
import RecipeDetails from './views/RecipeDetails';
import Register from './views/Register';
import UsersRecipes from './views/UserRecipes';
import AddStepThree from './views/AddStepThree';
import Footer from './components/Footer';
import PrivateRoute from './utils/PrivateRoute';

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
							<PrivateRoute exact path='/edit_recipe/:id'>
								<EditRecipe />
							</PrivateRoute>
							<PrivateRoute exact path='/recipe_details/:id'>
								<RecipeDetails />
							</PrivateRoute>
							<PrivateRoute exact path='/users_recipes/:id'>
								<UsersRecipes />
							</PrivateRoute>
							<PrivateRoute exact path='/by_flavor_tag/:id'>
								<ByFlavorTag />
							</PrivateRoute>
							<PrivateRoute exact path='/addRecipe/'>
								<AddRecipe />
							</PrivateRoute>
							<PrivateRoute exact path='/add_Ingredients/:id'>
								<AddStepTwo />
							</PrivateRoute>
							<PrivateRoute exact path='/add_qtymeasure/:id'>
								<AddStepThree />
							</PrivateRoute>
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
			<Footer />
		</BrowserRouter>
	);
};

interface AppProps { }

export default App;
