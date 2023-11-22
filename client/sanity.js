import {SANITY_PROJECT_ID, SANITY_AUTH_TOKEN} from "@env"
import { createClient } from '@sanity/client'
import imageBuilder from '@sanity/image-url'

const client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-10-30',
})


export const fpClient = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: 'production',
    token: SANITY_AUTH_TOKEN,
    apiVersion: '2023-10-30',
    useCdn: true
})

const builder = imageBuilder(client);

export const urlFor = source=> builder.image(source);

export default client;

// sanity cors add http://localhost:3000