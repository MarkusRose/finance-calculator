/**
 * Setup for the jest-preset-angular library.
 * See here for detail: https://github.com/thymikee/jest-preset-angular#jest-preset-angular
 */
module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
};
