import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/api-services'
import { IFlavorTags, IIngredients } from '../../interfaces';
import Select from 'react-select';
import { OptionProps } from "react-select/src/types";


const SingleSelectLocal = (props: SingleSelectLocalProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    // const [x, setx] = useState<string>('');
    // const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);

    const measuresArr = [
        {
            "id": "1",
            "name": "tsp"
        },
        {
            "id": "2",
            "name": "TBSP"
        },
        {
            "id": "3",
            "name": "cup"
        },
        {
            "id": "4",
            "name": "pint"
        },
        {
            "id": "5",
            "name": "quart"
        },
        {
            "id": "6",
            "name": "gallon"
        },
        {
            "id": "7",
            "name": "pinch"
        },
        {
            "id": "8",
            "name": "oz"
        },
        {
            "id": "9",
            "name": "lb"
        },
        {
            "id": "10",
            "name": "lbs"
        },
        {
            "id": "11",
            "name": "grams"
        },
        {
            "id": "12",
            "name": "kg"
        },
        {
            "id": "13",
            "name": "ml"
        },
        {
            "id": "14",
            "name": "Liter"
        },
    ];

    const [selectableItems, setAllSelectableItems] = useState<IIngredients[]>([]);
    
    const [selectedItem, setSelectedItem] = useState<IOptionType>(null);
    
    const [itemOptions, setItemOptions] = useState<IOptionType[]>([]);
    
    useEffect(() => {
        // apiService(`/api/${props.type}`)
        // .then(selectableIngredients => setAllSelectableItems(selectableIngredients))
        setAllSelectableItems(measuresArr)
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
        if (!selectedItem) return;

        const cleanedItem = 
        {
            id: selectedItem.value,
            name: selectedItem.label
        }

        console.log(cleanedItem)
        props.setter(cleanedItem);
    }, [selectedItem])

    interface IOptionType {
        label: string;
        value: string;
    };

    const handleUpdateSubmit = (e: any) => {
        setSelectedItem(e);
    };

    if (!selectableItems.length) {
        return <> </>
    }

    return (
        <>
            <section className="container mb-4">
                <Select
                    options={itemOptions}
                    onChange={(e: any) => handleUpdateSubmit(e)}
                    className="basic-single bg-info"
                    classNamePrefix="select"
                    placeholder={`Choose...`}
                    isSearchable
                />

            </section>
        </>
    );
};

interface SingleSelectLocalProps {
    setter: React.Dispatch<React.SetStateAction<IFlavorTags>>
    // type: 'flavorTags'
    // placeholder: 'Flavor Tags'
}

export default SingleSelectLocal;