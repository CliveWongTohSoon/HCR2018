import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App as MainPage } from 'app/containers/App';
import { hot, setConfig } from 'react-hot-loader';

const isProduction = process.env.NODE_ENV == 'production';

setConfig({ logLevel: isProduction ? 'error' : 'debug' });

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={MainPage} />
  </Switch>
));
