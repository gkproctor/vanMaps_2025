import { WiTrain as icon } from 'react-icons/wi';

export default {
  name: 'location',
  title: 'Locations',
  type: 'document',
  icon,
  fields: [
    { name: 'id', title: 'ID', type: 'string', description: 'ID for this location entry (should be auto generated somehow)' },
    { name: 'name', title: 'Location Name', type: 'string', description: 'Name of this location' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 100 } },
    { name: 'radioChannel', title: 'Radio Channel', type: 'string', description: 'Radio channel to be on at this location' },
    { name: 'additionalInfo', title: 'Additional Info', type: 'string', description: 'Directions after you arrive' },
    { name: 'googleMapsUrl', title: 'Google Maps URL Link', type: 'url' },
    { name: 'appleMapsUrl', title: 'Apple Maps URL Link', type: 'url' },
    { name: 'coordinates', title: 'Location Coordinates', type: 'geopoint' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: { title: 'name', media: 'image' },
    // If you want to keep prepare, uncomment the block below:
    // prepare(selection) {
    //   const { title, media } = selection || {};
    //   return { title, media };
    // },
  },
};
