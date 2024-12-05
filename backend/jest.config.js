/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // No es necesario usar ESM en CommonJS
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Resolver extensiones ".js" correctamente
  },
  testMatch: ['**/src/tests/**/*.[jt]s?(x)', '**/src/tests/?(*.)+(spec|test).[tj]s?(x)'], // Localizar pruebas
};
