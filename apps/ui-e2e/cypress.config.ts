import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npm run start',
        production: 'npm run start',
        both: 'npm run start'
      },
      ciWebServerCommand: 'npm run start',
    }),
    baseUrl: 'http://localhost:4200',
    chromeWebSecurity: false,
  },
});
