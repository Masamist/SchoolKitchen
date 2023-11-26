import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'server',

  projectId: 'njdbmchi',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  // auth: {
  //   redirectOnSingle: false,
  //   mode: 'append',
  //   providers: [
  //     {
  //       name: 'vandelay',
  //       title: 'Vandelay Industries',
  //       url: 'https://api.vandelay.industries/login',
  //       logo: '/static/img/vandelay.svg'
  //     }
  //   ],
  //   loginMethod: 'dual',
  // }
})
