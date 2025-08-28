import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'VanMaps',
  projectId: 'hu0ksp6y',
  dataset: 'production',
  plugins: [deskTool()],
  schema: { types: schemaTypes },
})
