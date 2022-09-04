## Start your first react project

```
  npx create-react-app <packageName> --template redux-typescript
```

## Dependencies
```
  npm i -D miragejs
  npm i react-router-dom @types/react-dom prettier
```

## Folder Structure
```
src
  - app
  - components
  - features
  - pages
  - services
  - types
```

## Modify the `package.json`
```
"start:port": "export PORT=8888 && npm start"
```

## Modify Website title
Find the `./public/index.html` file and modify the content of the `title` tag.


## Components - [Primereact](https://www.primefaces.org/primereact/)
#### Dependencies
```
  npm i primereact primeflex primeicons react-transition-group 
```
#### Import `primereact` css into the `index.css`
```
@import "primereact/resources/themes/lara-light-indigo/theme.css";
@import "primereact/resources/primereact.min.css";
@import "primeicons/primeicons.css";
```

## Referrences
- [Primereact](https://www.primefaces.org/primereact/)
- [PrimeIcona](https://www.primefaces.org/diamond/icons.xhtml)
