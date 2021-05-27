import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import { IIngredients } from '../../interfaces';
import Select from 'react-select';
import { OptionProps } from "react-select/src/types";


/* HOOK REACT EXAMPLE */
const MultiSelect = (props: MultiSelectProps) => {
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
        if (selectedIngredientsArray.length === 0) return;

        const cleanedIngredientsArray = selectedIngredientsArray.map(sI => {
            return {
                id: sI.value,
                name: sI.label
            }
        })
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
                isMulti
                name="colors"
                className="basic-multi-select bg-info"
                classNamePrefix="select"
                placeholder={`Choose ${props.placeholder}...`}
            />
        </section>
    );
};

interface MultiSelectProps {
    setter: React.Dispatch<React.SetStateAction<IIngredients[]>>
    type: 'flavorTags' | 'ingredients'
    placeholder: 'Flavor Tags' | 'Ingredients'
}

export default MultiSelect;