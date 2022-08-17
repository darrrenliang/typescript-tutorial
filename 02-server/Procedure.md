## Start your first Project (Dependencies)

```
npm init -y                             // Initialize the `npm` settings
npm i fastify pino-pretty dotenv        // Install dependencies of backend project
npm install -D typescript @types/node   // 安裝 typescript
npx tsc -init                           // Initialize the `typescript` settings
```

#### Edit `tsconfig.json` file

```
"include": ["src/**/*.ts"],
"exclude": ["node_modules"],
"compilerOptions": {
  "outDir": "./out",
  "rootDir": "./src",
}
```

##### Create `.env` file

```
FASTIFY_PORT=8888
```

## Setup prettier

```
npm i -D prettier
```

#### Create `.prettierrc` file

```
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 120,
  "trailingComma": "none",
  "arrowParens": "always"
}
```
#### add the script in `package.json` file

```
"fix-prettier": "prettier --write \"./src/**/*.ts\""
```

## Edit `package.json` file
```
"scripts": {
  "build": "tsc",
  "start": "npm run build && node \"./out/index.js\"",
},
```

## Rebuild the project automatically when the source code has been changed

#### Install concurrently and nodemon

```
npm i -D concurrently nodemon
```

#### Add the script in `package.json` file

```
"dev": "concurrently \"tsc -w \" \"nodemon ./out/index.js\""
```

## Setup Jest

#### Install Jest package

```
npm i -D jest ts-jest @types/jest
```
- jest - JavaScript testing framework
- ts-jest - TypeScript preprocessor for jest
- @types/jest - type definition for jest

### Create `jest.config.js` file

```
module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
  ],
  testTimeout: 20000,
  testPathIgnorePatterns: [
    "/node_modules/",
    "/out/"
  ]
}
```

#### Edit `package.json` file

```
"test": "jest --verbose --coverage --runInBand"
```

## Setup `mongoose` package
```
npm install mongoose 
```

## Referrences
- [gitignore](https://github.com/github/gitignore)
- [Prettier](https://prettier.io/docs/en/options.html)
- [Facebook - Jest](https://github.com/facebook/jest)
- [Official Website - Jest](https://jestjs.io/)
