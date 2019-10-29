# Node.js User Directory API
This application provide a user directory API which allows user to register, login and buy a premium plan.

## Quick Start
#### Install Dependencies
Run the following command to install project dependencies.
`$ npm i`

#### Generate Routes and Swagger Documentation.
In order to have the latest routes and swagger documentation matches with the controller run `npm generate` command

#### Configurations
For setting up you need to pass some variables with `.env` file. Can find a sample `.env` file in project's root named `.env.example`
For having multiple environment variables for different stages you will need to have multiple `.env` file. Thanks  to `dotenv-flow` package you are able to add your stages name as suffix of different `.env` files.

 Example: `.env.production`, `.env.development`, etc.

__NOTE:__ If do not need multiple .env file just use ".env" as file name.

#### Start
For running application in development mode simply can run 

    npm run start:dev

#### Start manually

For using .env files you need to run commands with "NODE_ENV" prefix.
__General:__
`cross-env` package is installed

    $ cross-env NODE_ENV=development src/index.ts

__Windows:__

    PS> export NODE_ENV=development
    PS> ts-node src/index.ts

__Linux & Mac:__

    $ NODE_ENV=development ts-node src/index.ts

__NOTE:__ If don't pass any NODE_ENV prefix application will use `.env` file as default.

#### Commands

`$ npm run generate`: Generate routes and swagger config file.
`$ npm run test`: Run unit tests.
`$ npm run start:dev`: Start application in development mode.
`$ npm run build`: Compile ts files to js and store the compiled files in `dist` folder.
`$ npm start`: Start the application in production mode. required `build` command first.


#### Tests
This project uses `mocha` as test framework and `chai` as assertion library.

Currently API tests are located in `test` folder in project root but you can place test files anywhere in `src` folder but test files must have `.test` before their extensions like `service.test.ts`
