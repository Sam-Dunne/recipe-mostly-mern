import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IFlavorTags, IUserRecipes } from '../../interfaces';
import { apiService } from '../utils/api-services';
import Moment from 'moment';
import SingleSelect from '../components/SingleSelect';



const ByFlavorTag = (props: ByFlavorTagProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    // const [x, setx] = useState<string>('');
    // const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => setx(e.target.value);
    
    const [recipes, setRecipes] = useState<IUserRecipes[]>([]);

    const [flavorTag, setFlavorTag] = useState<IFlavorTags>(null);
    
    const [headerTag, setHeaderTag] = useState<IFlavorTags>(null);
    
    useEffect(() => {
        apiService(`/api/recipes/user_recipes_flavortag/${id}`)
            .then(recipes => setRecipes(recipes))
        apiService(`/api/flavortags/${id}`)
            .then(flavorTag => setHeaderTag(flavorTag))
    }, [id]);

    return (
        <section className="container my-2">
            {(recipes.length === 0) &&
            <h3 className="text-success text-center mb-3">No {headerTag?.name} Recipes</h3>
            }
            {(recipes.length > 0) && 
            <h3 className="text-success text-center mb-3">{headerTag?.name} Recipes</h3>
            }
            <div className='col-12 col-md-8 col-lg-6 mx-auto'>
                <SingleSelect setter={setFlavorTag} type={'flavorTags'} placeholder={'Flavor Tags'} />
            </div>
            <div className="row d-flex justify-content-around align-items-center">
                {recipes?.map(recipe => (
                    <div className="card rounded shadow bg-light px-0 m-3 col-12 col-md-5 col-lg-3" key={`option-${recipe.id}`}>
                    <Link to={`/recipe_details/${recipe.id}`} className=''>
                        <div className="bg-success p-2 rounded mb-2 justify-content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id='svg-card'><defs><linearGradient id="caro-asercion-charcuterie-gradient-1"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#f8fafd" stopOpacity="1"></stop></linearGradient><linearGradient id="caro-asercion-charcuterie-gradient-11" x1="0" x2="1" y1="1" y2="0"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#ba9f0b" stopOpacity="1"></stop></linearGradient><linearGradient id="caro-asercion-charcuterie-gradient-12" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#cecece" stopOpacity="1"></stop></linearGradient><linearGradient id="caro-asercion-charcuterie-gradient-13"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#ba9f0b" stopOpacity="1"></stop></linearGradient><linearGradient id="caro-asercion-charcuterie-gradient-14"><stop offset="0%" stopColor="#edf3ee" stopOpacity="1"></stop><stop offset="100%" stopColor="#ba9f0b" stopOpacity="1"></stop></linearGradient></defs><path d="M0 0h512v512H0z" fill="#195f9f" fillOpacity="1"></path><g transform="translate(0,0)"><g><path d="M429.7 55.3L386.9 120.1L391.8 137C425.5 111.1 432.9 78.2 433.5 56.4C432.7 53.96 431.3 53.92 429.7 55.3Z" fill="#000000" fillOpacity="1"></path><path d="M377.9 133.8L291.6 264.5C301.5 261.9 312.3 259.5 323.4 258L390 176.2C386 162.1 381.9 147.9 377.9 133.8Z" fill="#9b9b9b" fillOpacity="1"></path><path d="M249 202.2C224.9 202.3 197.7 206.6 172.6 220L177.2 240.5L228.4 259.1L227.3 279.8C233.2 280.3 239.4 280.6 245.7 280.6C250.4 278.5 260.1 274.4 272.9 270.2L312.2 210.6C299.9 207.3 276.4 202 249 202.2Z" fill="#d8d6c3" fillOpacity="1"></path><path d="M295.9 218.9C247.5 237.1 193.8 223.1 193.8 223.1C227.1 213.2 261.1 209.6 295.9 218.9Z" className="selected" fill="#5d961b" fillOpacity="1"></path><path d="M360.9 249.3C353.5 257.4 348.1 266 345.1 273.8C346 273.4 347 273 348 272.5C364.3 265.5 380.5 263.3 392.1 265.3L393.3 265.6C399.8 256.8 403.9 247.9 405.1 240.4C408 209 366.3 243.6 360.9 249.3Z" fill="#b57204" fillOpacity="1"></path><path d="M142.8 241.3C136.6 241.7 107.8 244.8 89.76 262.7L92.77 276.6L129 267.8C131.3 267.2 133.8 268 135.3 269.9L146.8 284.1L170.9 278.2C173.2 277.7 175.7 278.5 177.2 280.4L188.1 293.9C203.5 290.7 188.1 293.9 214.4 288.5L215.4 267.7Z" fill="#f5a623" fillOpacity="1"></path><path d="M416 248.6C414 255.5 410.2 263.1 405 270.6C407.8 272.7 409.8 275.3 411.1 278.2C413 282.6 413.1 287.7 411.3 293C414.1 291.3 416.9 289.4 419.6 287.3C431.5 278.3 440.1 267.6 443.4 258.3C449.3 237.4 426.1 244.3 416 248.6Z" fill="#8b572a" fillOpacity="1"></path><path d="M333.5 269.2C300.1 272.4 268.8 284.3 255.2 290.1L258.4 294.3L326.6 285C327.7 284.1 328.9 283.2 330.1 282.4C330.7 277.8 332.1 272.9 333.5 269.2Z" fill="#e93905" fillOpacity="1"></path><path d="M382 277.1C373.4 277.2 363.3 279.6 352.9 284C339.2 289.9 328.3 298.3 322.9 306.5C320.4 310.4 318.9 314.2 320.3 317.3C321.7 320.5 325.4 322 330 322.9C339.7 324.6 353.2 322.4 366.9 316.5C380.7 310.6 391.6 302.2 396.9 294C399.5 290.1 401 286.3 399.6 283.2C398.2 280 394.5 278.5 389.9 277.6C387.5 277.2 384.8 277 382 277.1Z" fill="#d6962e" fillOpacity="1"></path><path d="M128.1 280.8L82.28 292L111.9 328.9L126 324.7L108.3 302.7C105.9 298.7 107.5 293.8 111.7 292.7L133.3 287.4Z" fill="url(#caro-asercion-charcuterie-gradient-11)"></path><path d="M454.6 281.7C398.9 339.1 335.9 335.9 335.9 335.9C333 335.9 330.3 335.6 327.8 335.2C318.3 333.5 311.6 328.8 308.8 322.3C306 315.8 307.2 307.7 312.5 299.6L312.6 299.5L256.4 307.1C250.4 306.9 248.2 301.5 244.8 297C237.3 297 230 296.6 223.3 296L255.4 335.9C257.9 339.8 256.3 344.5 252.3 345.8L195.3 363.1C192.9 363.8 190.2 363 188.6 361L176.3 345.7L153.4 352.6C151 353.3 148.3 352.5 146.7 350.5L134.4 335.2L111.5 342.1C109 342.8 106.4 342 104.8 340L81.48 311L37.36 323.3C26.5 326.7 29.18 341 38.32 343.6L80.14 354C109.5 363 52.87 364 35.55 377.7C28.02 391 38.26 404.4 47.2 408C96.35 427 135.7 365.5 195.4 382.9C204 384.8 241.4 394.2 258.2 398.4C264.7 400 271.5 399.4 277.6 396.7C314.3 380.4 447.3 321.4 478.8 307.4C488.7 303.4 492.2 287.2 480 285.2Z" fill="url(#caro-asercion-charcuterie-gradient-12)"></path><path d="M170 291.3L124.2 302.5L153.8 339.4L167.9 335.1L150.2 313.2C147.8 309.2 149.4 304.3 153.6 303.2L175.3 297.9Z" fill="url(#caro-asercion-charcuterie-gradient-13)"></path><path d="M211.9 301.8L166.1 313L195.7 349.9L239.8 336.5Z" fill="url(#caro-asercion-charcuterie-gradient-14)"></path></g></g></svg>
                        </div>
                        <div className="card-body  ">
                            <h5 className='card-title'>{recipe.title}</h5>
                            <h6 className='card-title'>{recipe.summary}</h6>
                            <p className='card-text'>{Moment(recipe?.created_at).format("MMM Do YY")}</p>
                        </div>
                    </Link>
                </div>
                ))}
            </div>
        </section>
    );
};

interface ByFlavorTagProps { }

export default ByFlavorTag;