import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import { IIngredients } from '../../interfaces';
import Select from 'react-select';
import { OptionProps } from "react-select/src/types";
import Creatable, { makeCreatableSelect } from 'react-select/creatable';



/* HOOK REACT EXAMPLE */
const MultiSelect = (props: MultiSelectProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    // const [x, setx] = useState<string>('');
    // const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);


    const [selectableItems, setAllSelectableItems] = useState<IIngredients[]>([]);

    const [selectedItemsArray, setSelectedItemsArray] = useState<IOptionType[]>([]);

    const [itemOptions, setItemOptions] = useState<IOptionType[]>([]);

    useEffect(() => {
        apiService(`/api/${props.type}`)
            .then(selectableIngredients => setAllSelectableItems(selectableIngredients))
    }, []);

    useEffect(() => {
        type ISelectOption = Pick<OptionProps, "label" | "value">;
        // get  data in array format to work with label+value
        const Options = (selectableItems || []).length
            ? (selectableItems.map(selectableItem => ({
                label: selectableItem.name,
                value: selectableItem.id
            })) as ISelectOption[])
            : []
        setItemOptions(Options)
    }, [selectableItems]);


    useEffect(() => {
        if (selectedItemsArray.length === 0) return;

        const cleanedItemsArray = selectedItemsArray.map(sI => {
            return {
                id: sI.value,
                name: sI.label
            }
        })
        props.setter(cleanedItemsArray);
    }, [selectedItemsArray])

    interface IOptionType {
        label: string;
        value: string;
    };

    const handleUpdateSubmit = (e: any) => {
        setSelectedItemsArray(e);
    };


    if (!selectableItems.length) {
        return <> </>
    }

    return (
        <section className="container mb-4">
            <Creatable
                options={itemOptions}
                onChange={(e: any) => handleUpdateSubmit(e)}
                isMulti
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