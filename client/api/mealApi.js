import sanityClient from '../sanity';
import client from '../sanity';
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

export async function handler(req, res){
  switch (req.method){
    case "POST" :
    //this JSON arrives as a string,
    //so we turn it into a JS object with JSON.parse()
    const createMeal = await JSON.parse(req.body)

    try{
      await client
        .create({
          _type: "meal",
          title: formData.title,
          price: formData.price,
          discription: formData.discription,
          allergies: formData.allergies,
          image: formData.image,
          category: {
            _type: "category",
            _ref: formData.category,
          }          
        })
        .then((res) => {
          console.log(`Meal wasa created, document ID is ${res._id}`)
        })
    }catch(error){
      console.log(error)
    }
  }
}
