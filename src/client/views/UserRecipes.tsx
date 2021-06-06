import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IFlavorTags, IUserRecipes } from '../../interfaces';
import { apiService } from '../utils/api-services';
import Moment from 'moment';
import SingleSelect from '../components/SingleSelect';


/* HOOK REACT EXAMPLE */
const UsersRecipes = (props: UsersRecipesProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [recipes, setRecipes] = useState<IUserRecipes[]>([]);
    // const [x, setx] = useState<string>('');
    // const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);

    const [flavorTag, setFlavorTag] = useState<IFlavorTags>(null);

    useEffect(() => {
        apiService(`/api/recipes/all_by/${id}`)
            .then(recipes => setRecipes(recipes))
    }, []);

    return (
        <section className="container my-2">
            <h3 className="text-secondary text-center">Users Recipes</h3>
            <div>
                
                <SingleSelect setter={setFlavorTag} type={'flavorTags'} placeholder={'Flavor Tags'} />

            </div>
            <div className="row d-flex justify-content-around align-items-center">
                {recipes?.map(recipe => (
                    <div className="card rounded shadow bg-light px-0 m-3 col-12 col-md-5 col-lg-3" key={`option-${recipe.id}`}>
                        <span className="bg-success p-3 rounded mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id='svg-pestle'><defs><filter id="shadow-1" height="300%" width="300%" x="-100%" y="-100%"><feFlood floodColor="rgba(110, 109, 109, 1)" result="flood"></feFlood><feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite><feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur><feOffset dx="6" dy="8" result="offset"></feOffset><feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite></filter><filter id="shadow-2" height="300%" width="300%" x="-100%" y="-100%"><feFlood floodColor="rgba(110, 109, 109, 1)" result="flood"></feFlood><feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite><feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur><feOffset dx="6" dy="8" result="offset"></feOffset><feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite></filter><filter id="shadow-3" height="300%" width="300%" x="-100%" y="-100%"><feFlood floodColor="rgba(110, 109, 109, 1)" result="flood"></feFlood><feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite><feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur><feOffset dx="6" dy="8" result="offset"></feOffset><feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite></filter><filter id="shadow-4" height="300%" width="300%" x="-100%" y="-100%"><feFlood floodColor="rgba(110, 109, 109, 1)" result="flood"></feFlood><feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite><feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur><feOffset dx="6" dy="8" result="offset"></feOffset><feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite></filter><filter id="shadow-5" height="300%" width="300%" x="-100%" y="-100%"><feFlood floodColor="rgba(110, 109, 109, 1)" result="flood"></feFlood><feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite><feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur><feOffset dx="6" dy="8" result="offset"></feOffset><feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite></filter></defs><rect fill="#e0e9d0" fillOpacity="1" height="512" width="512" rx="99" ry="99"></rect><g transform="translate(0,0)" ><g><path d="M454.26 312.874C454.26 402.782 365.33 476 256 476C146.67 476 57.74 402.83 57.74 312.874C57.762 294.318 61.559 275.96 68.9 258.918C76.195 279.908 94.177 298.973 121.322 313.968C155.764 333.011 201.364 343.501 249.706 343.501C298.049 343.501 343.649 333.011 378.091 313.971C412.533 294.928 432.381 269.166 434.054 241.261C447.169 262.854 454.154 287.611 454.26 312.875Z" className="selected" fill="#f8f1f1" fillOpacity="1" filter="url(#shadow-2)" stroke="#ccc" strokeOpacity="1" strokeWidth="15"></path><path d="M416.842 64.578C403.852 53.248 389.352 44.072 377.029 39.404C365.814 35.139 357.203 34.874 353.423 38.654L352.869 39.162L347.659 43.588C344.229 46.507 343.773 51.636 346.633 55.115C354.966 65.17 354.756 79.79 346.138 89.602L177.18 283.135C169.999 291.304 165.255 301.323 163.487 312.055C189.514 320.585 219.161 325.07 249.741 325.07C259.378 325.07 269.071 324.61 278.628 323.71L389.203 134.153C396.817 121.096 413.752 116.973 426.515 125.07L427.195 125.497C430.853 127.808 435.675 126.897 438.238 123.41L446.226 112.494C451.102 106.016 441.269 85.856 416.844 64.578Z" fill="#f8f1f1" fillOpacity="1" filter="url(#shadow-3)" stroke="#ccc" strokeOpacity="1" strokeWidth="26"></path><path d="M268.678 150.338C262.388 149.949 256.087 149.752 249.785 149.748C204.508 149.748 162.079 159.42 130.323 176.975C100.296 193.573 83.755 215.013 83.755 237.409C83.755 259.804 100.295 281.209 130.323 297.843C135.291 300.586 140.547 303.123 146.01 305.473C148.73 292.691 154.683 280.821 163.3 270.997Z" fill="#35bf53" fillOpacity="1" filter="url(#shadow-4)"></path><path d="M369.248 297.878C399.275 281.28 415.816 259.84 415.816 237.444C415.816 218.274 403.656 199.774 381.236 184.421L301.782 320.551C326.992 316.126 350.044 308.426 369.19 297.845Z" fill="#cb8448" fillOpacity="1" filter="url(#shadow-5)"></path></g></g></svg></span>
                        <div className="card-body  ">
                            <h5 className='card-title'>{recipe.title}</h5>
                            <h6 className='card-title'>{recipe.summary}</h6>
                            {/* {Moment(recipe?.created_at).format("MMM Do YY")} */}
                            <p className='card-text'>{Moment(recipe?.created_at).format("MMM Do YY")}</p>
                            <Link to={`/recipe_details/${recipe.id}`} className='btn btn-link border-primary rounded'>To {recipe.title}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

interface UsersRecipesProps { }

export default UsersRecipes;