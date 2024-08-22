import createClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'ogyok950', 
  dataset: 'production', 
  apiVersion: 'v1', 
  useCdn: true, 
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
