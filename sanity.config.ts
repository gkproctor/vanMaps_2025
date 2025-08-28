import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'VanMaps',
  projectId: 'hu0ksp6y',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
})
