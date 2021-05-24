import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import PrivateRoute from './utils/PrivateRoute';
import Navbah from './components/Navbar';
import AddRecipe from './views/AddRecipe';
import EditRecipe from './views/EditRecipe';
import Landing from './views/Landing';
import Login from './views/Login';
import Recipe from './views/Recipe';
import Register from './views/Register';
import UsersRecipes from './views/UserRecipes';

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {

	return (
		<BrowserRouter>
			<div className="bg-info p-2" id='wrapper'>
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
							<Route exact path='/recipe/:id'>
								<Recipe />
							</Route>
							<Route exact path='/users_recipes/:id'>
								<UsersRecipes />
							</Route>
							<Route exact path='/addRecipe'>
								<AddRecipe />
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
