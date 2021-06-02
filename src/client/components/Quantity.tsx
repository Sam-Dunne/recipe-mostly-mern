// import React, { useState, useEffect } from 'react'

// const Quantity = ({ ingredients }) => {
//     const [stateOfStates, setStateOfStates] = useState({});

//     useEffect(() => {
//         const items = {};
//         ingredients.forEach((i: string) => (items[i] = i));
//         setStateOfStates(items);
//     }, [ingredients]);

//     const handleQuantityUpdate = (e, stateKey) => {
//         setStateOfStates({
//             ...stateOfStates,
//             [stateKey]: e.target.value
//         });
//     }

//     return (
//         <div>
//             {Object.keys(stateOfStates).map(ingName => (
//                 <div key={`ingredient-${ingName.replace(' ', '-')}`}>
//                     <input
//                         onChange={e => handleQuantityUpdate(e, ingName)}
//                         placeholder={ingName + ' qty (3 cups, 2 tbsp, etc...'}
//                     />
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default Quantity;