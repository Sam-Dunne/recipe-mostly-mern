import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { apiService } from '../utils/api-services';
import { IFlavorTags, IRecipeIngredientsFull } from '../../interfaces';
import SubmitBtn from '../components/SubmitBtn';



/* HOOK REACT EXAMPLE */
const AddStepThree = (props: AddStepThreeProps) => {
	const history = useHistory();
	const { id } = useParams<{ id: string }>();

	const [recipeIngreds, setRecipeIngreds] = useState<IRecipeIngredientsFull[]>([]);

	// v1
	// const [qtyValue, setQtyValue] = useState<string>('');
	// const handleSetQtyValue = (e: React.ChangeEvent<HTMLInputElement>) => setQtyValue(e.target.value.toString())
	// v2
	const [qtyValue, setQtyValue] = useState<{ [key: string]: string }>({});

	const handleSetQtyValue = (e: React.ChangeEvent<HTMLInputElement>) =>
		setQtyValue(prev => ({ ...prev, [e.target.name]: e.target.value }));


	const [qtyMeasure, setQtyMeasure] = useState<IFlavorTags>(null);;
	// const handleSetQtyMeasure = (e: React.ChangeEvent<HTMLInputElement>) => setQtyMeasure(e.target.value.toString())

	const [ingredient_qty, setIngredient_Qty] = useState<{ [key: string]: string }>({});

	const handleSetIngredient_Qty = (e: React.ChangeEvent<HTMLInputElement>) =>
		setIngredient_Qty(({ ...ingredient_qty, [e.target.name]: e.target.value }));

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// console.log('[raw state log]');
		// console.log(ingredient_qty);
		let result = Object.keys(ingredient_qty).map(function (key) {
			// Using toString() to convert key to string type
			// Using obj[key] to retrieve key value
			return [key.toString(), ingredient_qty[key.toString()]];
		});
		// console.log(result);
		//prevents empty form submission
		// if (result.length === 0) {
		// 	alert('catch')
		// 	return;
		// }

		apiService(`/api/recipeingredients/multi_existing_qty/${id}`, `POST`, { array_of_ingredientUpdates: result })
			.then(res => {
				// console.log(res)
				history.push(`/recipe_details/${id}`);
			})
	};

	useEffect(() => {
		apiService(`/api/recipeingredients/${id}`).then(ingreds => {
			setRecipeIngreds(ingreds)

			const ingsWithQtyz = ingreds.map((ing: any) => ({ [ing.id]: ing.ingredient_qty }));
			const objectifiedIngredz = Object.assign({}, ...ingsWithQtyz);
			setIngredient_Qty(objectifiedIngredz)
		});
	}, []);
	console.log(ingredient_qty);

	return (
		<section className="container my-3 col-12 col-md-10 col-lg-8">
			<div className="p-4 mb-3 rounded shadow bg-primary ">
				<h3 className="mb-3 text-center text-info">Add Qty & Measure</h3>
				{recipeIngreds?.map(ingred => (
					<div
						key={`option-${ingred.ingredient_id}`}
						className="pb-3 mx-auto mb-2 rounded shadow card-body justify-content-center bg-info col-12 col-md-10 col-lg-10">
						<div className="row align-items-center justify-content-between mx-3">

							<input
								name={ingred.ingredient_id}
								type="text"
								placeholder={ingredient_qty[ingred.ingredient_id] || 'Qty and Measure'}
								// value={ingred.ingredient_qty || 'Qty and Measure'}
								onChange={handleSetIngredient_Qty}
							/>
							<h5 className="card-text mx-3">  {`${ingred.name}`}</h5>
						</div>
					</div>
				))}
				<SubmitBtn onClick={handleSubmit} children='Submit' />
			</div>


		</section>
	);
};

interface AddStepThreeProps { }

export default AddStepThree;
