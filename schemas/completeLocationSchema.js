// schemas/completeLocationSchema.js
import { WiTrain as icon } from 'react-icons/wi'

export default {
  name: 'location',
  title: 'Locations',
  type: 'document',
  icon,
  fields: [
    { name: 'id', title: 'ID', type: 'string' },
    { name: 'name', title: 'Location Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 100 } },
    { name: 'radioChannel', title: 'Radio Channel', type: 'string' },
    { name: 'additionalInfo', title: 'Additional Info', type: 'string' },
    { name: 'googleMapsUrl', title: 'Google Maps URL Link', type: 'url' },
    { name: 'appleMapsUrl', title: 'Apple Maps URL Link', type: 'url' },
    { name: 'coordinates', title: 'Location Coordinates', type: 'geopoint' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: { title: 'name', media: 'image' },
    prepare: ({ title, media }) => ({ title, media }),
  },
}
