# Test Project

`npm install` with node >=18 to get started.

please use `npm run start` to start the API and UI and navigate to http://localhost:4200 to see the application in action. This will take you to the home page that is an empty component. Clicking on the anchor link will take you to the http://localhost:4200/search-cities where you can begin the assessment of the technical test. The purpose of the home component is to demonstrate Angular's standalone components, lazy loading and dependency injection for first page load.

## Testing

Please use the command `npm run test` to execute Jest testing for the API and the UI, In a new terminal with `npm run start` in another one.
Please use the command `npm run e2e` to execute the e2e test created. 

## Technology Used
- Angular 18
- NestJS 10
- NGRX Signals Store(developer preview)
- Jest
- Cypress


### FAQs/Discoveries
- NGRX Signals is still in developer preview so a testing utility library isn't out yet. Also Jest can't really mock a Signal store so real API calls are made which is less than ideal.
- NGRX Signal store is a new reactive state management solution that's super lightweight and performant, ie less than 3KB compared to NGRX reaching 100KB and 500KB with developer tooling.
- `NGIF NGFOR` and other directives are easily replaced with the new template flow sytax that's similar to React, helping to reduce code and the need to re-render components, thus increasing performance.
