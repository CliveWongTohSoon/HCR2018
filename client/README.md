# Instruction
The client uses the following:
## Libraries 
- [x] [Typescript](https://www.typescriptlang.org/) 3
- [x] [React](https://facebook.github.io/react/) 16.5
- [x] [Redux](https://github.com/reactjs/redux) 4
- [x] [React Router](https://github.com/ReactTraining/react-router) 4.3
- [x] [React Router Redux](https://github.com/reactjs/react-router-redux) 5
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

## Build tools
- [x] [Webpack](https://webpack.github.io) 4
  - [x] [Tree Shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)
  - [x] [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
- [x] [Typescript Loader](https://github.com/TypeStrong/ts-loader)
- [x] [PostCSS Loader](https://github.com/postcss/postcss-loader)
  - [x] [PostCSS Preset Env](https://preset-env.cssdb.org/)
  - [x] [CSS modules](https://github.com/css-modules/css-modules)
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)
- [x] [Prettier](https://github.com/prettier/prettier)

## Setup
To install all dependencies, do:
```
$ npm ci
```

## Running
To serve the web app, do:
```
$ npm start
```

## Build
To build the web app:
```
$ npm run build
```

## Prettier
To format the codes:
```
$ npm run format
```

## Production:
After npm run build, the bundled project contained in the directory dist. It can be served with node using the command:
```
$ node app.js
```
