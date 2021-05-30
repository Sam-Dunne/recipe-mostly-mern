import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import { IFlavorTags, IIngredients } from '../../interfaces';
import Select from 'react-select';
import { OptionProps } from "react-select/src/types";




/* HOOK REACT EXAMPLE */
const SingleSelect = (props: SingleSelectProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [x, setx] = useState<string>('');
    const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);


    const [selectableIngredients, setAllSelectableIngredients] = useState<IIngredients[]>([]);

    const [selectedIngredientsArray, setSelectedIngredientsArray] = useState<IOptionType[]>([]);

    const [ingredientsOptions, setIngredientOptions] = useState<IOptionType[]>([]);

    useEffect(() => {
        apiService(`/api/${props.type}`)
            .then(selectableIngredients => setAllSelectableIngredients(selectableIngredients))
    }, []);

    useEffect(() => {
        type ISelectOption = Pick<OptionProps, "label" | "value">;
        // get  data in array format to work with label+value
        const Options = (selectableIngredients || []).length
            ? (selectableIngredients.map(selectableIngredient => ({
                label: selectableIngredient.name,
                value: selectableIngredient.id
            })) as ISelectOption[])
            : []
        setIngredientOptions(Options)
    }, [selectableIngredients]);

    useEffect(() => {
        if (selectedIngredientsArray) return;
        console.log(selectedIngredientsArray)
        const cleanedIngredientsArray = 
            {
                id: selectedIngredientsArray[0].value,
                name: selectedIngredientsArray[0].label
            }
      
        props.setter(cleanedIngredientsArray);
    }, [selectedIngredientsArray])

    interface IOptionType {
        label: string;
        value: string;
    };

    const handleUpdateSubmit = (e: any) => {
        setSelectedIngredientsArray(e);
    };

    if (!selectableIngredients.length) {
        return <> </>
    }

    return (
        <section className="container mb-4">
            <Select
                options={ingredientsOptions}
                onChange={(e: any) => handleUpdateSubmit(e)}
                className="basic-single bg-info"
                classNamePrefix="select"
                placeholder={`Filter by ${props.placeholder}...`}
            />
        </section>
    );
};

interface SingleSelectProps {
    setter: React.Dispatch<React.SetStateAction<IFlavorTags>>
    type: 'flavorTags' | 'ingredients' 
    placeholder: 'Flavor Tags' | 'Ingredients'
}

export default SingleSelect;