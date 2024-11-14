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

### Testing simple utility functions

With this commit we are introducing unit tests to our application:

-   We have extracted some business logic / simple calculations and moved them to the utility file `finance.util.ts`.
-   At the same time we have added `finance.util.spec.ts` and have started creating tests for how we imagine our future utilities to function.
-   Finally we have moved the code for the utilities from `loan-calculator.component.ts` into the utility functions and adapted the code so that our tests pass. (This last step ideally does not alter the tests themselves, but only the newly created utility functions.)

Now that we have tested some basic utilities, it is time to move on to a more complex service class.
See commit "adding a history service with unit tests" to continue.

### Adding unit tests to a service

Now we are adding a history service, that will keep track of previous requests and allows us to look what we have already calculated. The new service and associated test are under the services folder: `loan-history.service.*`.

Services are more complex to test. These require a `TestBed` to configure a test module. This is done very similarly to normal Angular modules. Once that is done, we can inject the service we create.

After injecting the service, testing is very similar to utility functions. We do have to keep in mind that the service needs to be fresh for each test, so the `beforeEach` statement becomes very important.

Changes:

-   add service for history & spec file
-   Store up to the last `maxHistoryLength` requests in a history object.
-   add function to recall history item and clear history
-   show history table / list below results section.

Next up: component testing in jest.

### Adding tests to components

We have arrived at component testing. Our existing component `loan-calculator.component` deserves to be tested thoroughly. To do this we make the following changes:

-   add spec file to the `loan-calculator.component`
-   configure TestBed's testing module and compile the imported/declared components
-   mock the `LoanHistoryService` and provide it
-   test the form validation
-   test the history display

Notes to keep in mind:

-   Mocking is important to test only the component and not any services that might have complex functionality. These should be tested independantly.
-   Instead of waiting on the outcome of a already tested function, we can use jest's `spyOn` to check that the function was called (optionally with the correct inputs, or the correct number of times).
-   When testing an entire component I took the approach of a user actually clicking a button and observing an outcome. This allows us to indireclty test private members, such as the form validator function in this example.

I made heavy use of this resource: https://angular.dev/guide/testing/components-scenarios

Next we want to take a look at state management. How do we test NgRx?

### Adding NgRx State and tests

To test state management for NgRx reuses most of the approaches taken for utilities, services and components.

-   Actions are a set of defined objects, so there is nothing to test here. All the functionality lies in reducers, selectors and effects.
-   The reducers can always be testes just like utilities, since they are simple functions.
-   Selectors can make use of the projector member to direclty test them on differents states as test cases.

Changes:

-   add ngrx to the project: `ng add @ngrx/store@latest`
-   (optional) add ngrx devtools to project.
-   create actions, reducers, selecters so that the user can switch to the about page and back to Loan Calculator without loosing the input values.
-   add tests to reducer and selectors
-   add integration tests to the `loan-calculator` component via the MockStore

Most used resource: [NgRx Store Testing](https://ngrx.io/guide/store/testing)

Remarks:

-   Selector testing to me only makes sense, if the selector is more complex than just passing state properties.
-   Components can also mock the selectors, so we can separate the testing of the store from the components. (Not doing integration testing).
-   Effects have not been included here. I'm hoping to cover them in the future. Meanwhile please have a look at the docs here: [EffectTesting](https://ngrx.io/guide/effects/testing)

Next: testing observables and promises

### Testing Promises and Observables

Since we didn't encounter any scenario yet where asynchronous behavior was a factor, I've included the `asynchronous.service` with tests to highlight some appooaches when it comes to observables and promises.

Main takeaways:

-   Observables: When observables require time to emit the next value, then we need to provide a `done()` callback to the argument of our testing function: `it("<Test name>", (done) => {< do the tests here>})`
-   Promises: It is very dangerous while testing promises to forget async/await. The test will run, but the expect will not be encountered or will not be awaited for. The result is a test that passes, because no expectation was tested. Ways to avoid this is using `waitForAsync`, or returning the expect statement in the testing function: `it("<test name>", () => { return expect(<promise to test>).resolve.toEqual(<expected value>)})`

Resources:

-   [Jest Documentation: asynchronous tests](https://jestjs.io/docs/asynchronous)
-   [Fireship: testing observables](https://fireship.io/snippets/testing-rxjs-observables-with-jest/)
