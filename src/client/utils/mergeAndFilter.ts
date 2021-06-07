import type { IIngredients, IRecipeIngredientsFull } from '../../interfaces';

export function mergeAndFilter(selectableItems: IIngredients[], ingreds: IRecipeIngredientsFull[]) {
	const optionsToShow = [];

	for (let i = 0; i < selectableItems.length; i++) {
		if (!elementContainsInArray(ingreds, selectableItems[i].id)) {
			optionsToShow.push(selectableItems[i]);
		}
	}

	return optionsToShow;
}

function elementContainsInArray(arr: IRecipeIngredientsFull[], passedInID: string) {
	if (arr !== null && arr.length > 0) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].ingredient_id === passedInID) {
				return true;
			}
		}
	}
	return false;
}
