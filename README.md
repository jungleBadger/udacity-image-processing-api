TBD

### Project stack

#### Frontend

- TBD


#### Backend

- [Node.js v14+](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Sharp package](https://www.npmjs.com/package/sharp)


#### Tooling

- [Gulp.js](https://gulpjs.com/)
- [ESLint](https://eslint.org/)
- [Nodemon](https://nodemon.io/)


### Getting started

To get this project up and running one will need to:

1. Download the project & install the dependencies
2. Add the environment variables
3. Build & execute the application


#### Install dependencies

This is straightforward, after cloning/downloading this repository you can execute the following command from the root folder:

```bash
npm install
```


#### Add the environment variables

Since this is a very simple app, all variables has a default injected into the code, but if you want to run the app in a
different port you can change it within the `.env` file.

1. Create a new file named `.env`
2. Add/modify the following values

| Variable    | Default value |
|-------------|---------------|
| NODE_ENV    | development   |
| APP_PORT    | 3030          |
| LOCAL_HTTPS | false         |
| DEBUG       | app:*         |


#### Build & execute the application

Check out more details below, but after installing the dependencies you can start the app with the following command:

```bash
npm run start:server
```


### Automations

All tasks are available through `npm run` scripts.


#### Linter/prettier

Code styling check and automatic fix is handled by ESLint through a Gulp task. You can execute the command below:

```bash
npm run lint:server
```


#### Typescript transpiling

The backend code is delivered through the `server/src` folder, and the transformed output is placed under `server/dist.
You can execute the command below:


```bash
npm run build:server
```


#### Executing the server

There are two modes of execution:

1. Single execution
2. Execution with watcher mode and restart enabled

The commands to achieve the builds described above are, respectively:

```bash
npm run start:server
npm run start:server:dev
```