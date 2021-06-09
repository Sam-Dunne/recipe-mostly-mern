import * as React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { GoHome } from 'react-icons/go';
import { IoEllipsisVerticalCircleOutline } from 'react-icons/io5';
import { MdAddCircleOutline } from 'react-icons/md';
import { TiDocumentDelete } from 'react-icons/ti';
import { Link } from 'react-router-dom';


const RecipeDetailsEllipsis = (props: RecipeDetailsEllipsisProps) => {

    return (
        <>
            <div className="btn-group dropleft">
                <button className="btn btn-lg" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <IoEllipsisVerticalCircleOutline className='bg-primary text-info icon' />
                </button>
                <div className="dropdown-menu">
                    <Dropdown.Item as="button">
                        <Link to={props.toUsers_recipes} className='btn btn-link border-light text-success'><GoHome />  All your recipes </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                        <Link to={props.toAdd_ingredients} className='btn btn-link border-light text-success'><MdAddCircleOutline />  Ingredients</Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                        <Link to={props.toAddQtyMeasure} className='btn btn-link border-light text-success'><FiEdit />  Qty and Measure</Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                        <Link to={props.toEdit_recipe} className='btn btn-link border-light text-success'><FiEdit />  Recipe Body</Link>
                    </Dropdown.Item>
                    <button className="btn mx-4" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <TiDocumentDelete className='bg-info text-warning' /><span> Delete</span>
                    </button>
                    <div className="dropdown-menu mx-auto">
                        <div className="row justify-content-center mx-3 mt-3">
                            <button className="btn btn-warning" onClick={props.onClick}>Delete this Recipe</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

interface RecipeDetailsEllipsisProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    toUsers_recipes: string;
    toEdit_recipe: string;
    toAdd_ingredients: string;
    toAddQtyMeasure: string;
}

export default RecipeDetailsEllipsis;