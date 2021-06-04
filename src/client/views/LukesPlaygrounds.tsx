import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services';

import { IFlavorTags, IIngredients, IRecipeingredients, IRecipeIngredientsFull } from '../../interfaces';
import { IoEllipsisVerticalCircleOutline } from 'react-icons/io5';
import SingleSelectLocal from '../components/SingleSelectLocal';

/* HOOK REACT EXAMPLE */
const PlayGround = (props: PlayGroundProps) => {
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
		setIngredient_Qty(prev => ({ ...prev, [e.target.name]: e.target.value }));

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// console.log('[raw state log]');
		console.log(ingredient_qty);
		let result = Object.keys(ingredient_qty).map(function (key) {
			// Using toString() to convert key to string type
			// Using obj[key] to retrieve key value
			return [key.toString(), ingredient_qty[key.toString()]];
		});
		console.log(result);
		//prevents empty form submission
		if (result.length === 0) {
			alert('catch')
			return;
		}

		// apiService(`/api/recipeingredients/multi_existing_qty/${id}`, `POST`, { array_of_ingredientUpdates: result })
		// 	.then(res => {
		// 		console.log(res)
		// 		history.push(`/recipe_details/${id}`);
		// 	})
	};

	useEffect(() => {
		apiService(`/api/recipeingredients/${id}`).then(ingreds => setRecipeIngreds(ingreds));
	}, []);

	return (
		<section className="container my-3">
			<div className="p-4 mb-3 rounded shadow bg-primary">
				<h3 className="mb-1 text-center text-info">Add Qty & Measure</h3>
				{recipeIngreds?.map(ingred => (
					<div
						key={`option-${ingred.ingredient_id}`}
						className="pb-3 mx-auto mb-2 rounded shadow card-body justify-content-center bg-info col-12 col-md-8 col-lg-10">
						<input
							type='text'
							placeholder='Quantos'
							value={qtyValue[ingred.ingredient_qty]}
							onChange={handleSetQtyValue}
						/>
						<SingleSelectLocal setter={setQtyMeasure} />
						<input
							name={ingred.ingredient_id}
							type="text"
							placeholder={ingred.ingredient_qty || 'Qty and Measure'}
							value={ingredient_qty[ingred.ingredient_id] || ''}
							onChange={handleSetIngredient_Qty}
						/>
						<h5 className="card-text">{`${ingred.name}`}</h5>
					</div>
				))}
			</div>
			<button className="border btn btn-link btn-secondary" onClick={handleSubmit}>
				Filter
			</button>

			<Link to="/">Link</Link>
		</section>
	);
};

interface PlayGroundProps { }

export default PlayGround;
