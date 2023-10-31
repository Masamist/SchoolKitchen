import { createClient } from '@sanity/client';
import imageBuilder from '@sanity/image-url';

const client = createClient({
    projectId: 'njdbmchi',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-10-30',


})
const builder = imageBuilder(client);

export const urlFor = source=> builder.image(source);

export default client;

// sanity cors add http://localhost:3000