// Your separate file for Sanity integration
import client from './sanity'; // Import the Sanity client

const authenticateSanity = (token) => {
//const authenticateSanity = async (token) => {
  try {
    // Set the Firebase authentication token in the Sanity client
    client.config({ token });




    // Now you can make authenticated requests to Sanity
    //const response = await client.fetch('*[_type == "yourSchemaType"]');
    //console.log('Sanity Data:', response);
  } catch (error) {
    console.error('Error fetching Sanity data:', error);
  }
};

export default authenticateSanity;