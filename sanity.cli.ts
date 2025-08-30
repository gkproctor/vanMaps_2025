// sanity.cli.ts
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'hu0ksp6y',     // ← your projectId
    dataset: 'production',      // ← your dataset
  },
  // Optional: pick a subdomain for hosted Studio
  // studioHost: 'vanmaps-studio',
})
