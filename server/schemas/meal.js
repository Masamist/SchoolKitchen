import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'meal',
  title: 'Meals',
  type: 'document',
  fields: 
    [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
        validation: rule=> rule.required(),
      },
      {
        name: 'price',
        type: 'number',
        title: 'Price',
        validation: rule=> rule.required(),
      },
      {
        name: 'description',
        type: 'string',
        title: 'Description',
        validation: rule=> rule.max(200),
    },
     {
      name: 'allergis',
      type: 'array',
      title: 'Allergies',
      of: [{ type: 'string' }]
      //validation: rule=> rule.required(),
    },
    {
      name: 'limit',  
      type: 'number',
      title: 'Order Limit',
      //validation: rule=>rule.required().min(1).max(5).error('Please enter a value between 1 to 5')
    },
    {
      name: 'mealimage',
      type: 'image',
      title: 'Meal Image',
      
    },
    {
      name: 'category',
      title: 'Category',
      validation: rule=> rule.required(),
      type: 'reference',
      to: [{type: 'category'}]
    }
  ]
})