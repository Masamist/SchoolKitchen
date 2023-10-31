import sanityClient from './sanity';
let sanityQuery = (query, params)=> sanityClient.fetch(query, params);

export const getAllMeals = ()=>{
    return sanityQuery(`
        *[_type == 'meal']
    `);
}

// export const getNewMeals = ()=>{
//     return sanityQuery(`
//         *[_type == 'meal'] | order(_createdAt desc){
//             ...,
//         }[0...6]
        
//     `);
//   }

export const getCategories = ()=>{
  return sanityQuery(`
      *[_type == 'category']
  `);
}