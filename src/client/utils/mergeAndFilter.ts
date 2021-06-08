import type { IIngredients, IRecipeIngredientsFull } from '../../interfaces';

export function mergeAndFilter(selectableItems: IIngredients[], ingreds: IRecipeIngredientsFull[]) {
	const optionsToShow = [];

	for (let i = 0; i < selectableItems.length; i++) {
		// adds the selectableItems object at current index into optionsToShow if elementContainsInArray is falsey 
		if (!elementContainsInArray(ingreds, selectableItems[i].id)) {
			optionsToShow.push(selectableItems[i]);
		}
	}

	return optionsToShow;
}


// if the array exists and has length, loop thru the array and if .ingredient_id at any index of the array === selectableItemID, return true...else false 
function elementContainsInArray(arrExistingRecipeIngredients: IRecipeIngredientsFull[], selectableItemID: string) {

	if (arrExistingRecipeIngredients !== null && arrExistingRecipeIngredients.length > 0) {
		for (let i = 0; i < arrExistingRecipeIngredients.length; i++) {
			if (arrExistingRecipeIngredients[i].ingredient_id === selectableItemID) {
				return true;
			}
		}
	}
	return false;
}
