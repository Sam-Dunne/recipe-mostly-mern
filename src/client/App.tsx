import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import PrivateRoute from './utils/PrivateRoute';
import Navbar from './components/Navbar';
import EditRecipe from './views/EditRecipe';
import Login from './views/Login';
import Recipe from './views/Recipe';
import Register from './views/Register';
import UsersRecipes from './views/UserRecipes';

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/edit_recipe/:id'>
					<EditRecipe />
				</Route>
				<Route exact path='/recipe/:id'>
					<Recipe />
				</Route>
				<Route exact path='/users_recipes/:email'>
					<UsersRecipes />
				</Route>
				<Route exact path='/login'>
					<Login />
				</Route>
				<Route exact path='/register'>
					<Register />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

interface AppProps { }

export default App;
