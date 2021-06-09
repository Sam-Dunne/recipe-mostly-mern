import * as React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { GoHome } from 'react-icons/go';
import { IoEllipsisVerticalCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';


const AddIngredientsEllips = (props: AddIngredientsEllipsProps) => {

    return (
        <div className="btn-group mr-4">
            <button className="btn btn-lg" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <IoEllipsisVerticalCircleOutline className='bg-primary text-info icon' />
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                <Dropdown.Item as="button">
                    <Link to={props.toUsers_recipes} className='btn btn-link border-light text-success'><GoHome />  All your recipes </Link>
                </Dropdown.Item>
                <Dropdown.Item as="button">
                    <Link to={props.toEdit_recipe} className='btn btn-link border-light text-success'><FiEdit />  Recipe Body</Link>
                </Dropdown.Item>
                <Dropdown.Item as="button">
                    <Link to={props.toAddQtyMeasure} className='btn btn-link border-light text-success'><FiEdit />  Qty and Measure</Link>
                </Dropdown.Item>

            </div>
        </div>
    );

};

interface AddIngredientsEllipsProps {
    toUsers_recipes: string;
    toEdit_recipe: string;
    toAddQtyMeasure: string;
}

export default AddIngredientsEllips;