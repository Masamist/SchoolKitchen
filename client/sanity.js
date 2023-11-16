import { createClient } from '@sanity/client';
import imageBuilder from '@sanity/image-url';

const client = createClient({
    projectId: 'njdbmchi',
    dataset: 'production',
    useCdn: true,
    //token: 'skm1cdOIiNngckyFQg8d6P9pULVUSMCYUgwspuAxHx8NbgLGkQD3FLa9ZZkR6G2714IkgERcJP86t77tIN2OPXrTfoYWdfZQNrBDwlVRWhUlUiJsFk4zq2wT39xGREzXfH5yj2zE6z8C0EZBf7vTzxCzTqf35zVGYEsd6YruSKDDLEjnADcI',
    apiVersion: '2023-10-30',


})
const builder = imageBuilder(client);

export const urlFor = source=> builder.image(source);

export default client;

// sanity cors add http://localhost:3000