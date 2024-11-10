# FinanceCalculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Running, building and testing the app

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4444/`. The application will automatically reload if you change any of the source files.

Alias: `npm start`

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Jest for testing in Angular

Using [jest-preset-angular](https://github.com/thymikee/jest-preset-angular#jest-preset-angular) the project is configured to use `npm test` to run jest unit tests.

## About the app

This app was created as a practical exercise for unit and e2e testing. Git's commits have been structured to follow a clear progression. We will use this application to step through intersting topics of test-automation to learn with an example the do's (and sometimes dont's) of how testing works.

First up: adding jest and removing jasmine and karma.

### Adding the required packages for jest in angular

To add jest to an existing angular project we can run:
`npm i jest jest-preset-angular @types/jest`

To have a cleaner project, we can also remove all packages associated with jasmine and karma. Be aware that ng test will not work after this step unless using.

Regarless of removing jasime and karma, it is important to replace the types in the `tsconfig.spec.json` with `types = ['jest']`. We also need to setup the jest configuration within the files:

-   `jest.config.js`
-   `setup-jest.ts`

Once that is done we can start to build our project's framework.
Please see commit "create a prototype app without tests" to continue.

### The app prototype - Finance Calculator

Within this commit we are setting up a very simple finance calculator app that takes in information about a loan and calculates the repayment duration as well as total spent money and total amount spent on interest.

The app will have a navbar with routing and an about page. But the heart of the application will take place in the `loan-calculator` component. Here is where most of the changes will of the future commits will originate as we begin to refactor this application and add tests to it.

Next we will start adding our first tests. Please see commit "refactor to have utilities with tests".
