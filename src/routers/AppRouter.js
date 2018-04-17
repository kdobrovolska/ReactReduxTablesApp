
import React from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DataContainer from '../components/DataContainer.js';

 
const AppRouter=()=>
(
  <BrowserRouter>
  <div>
    <Switch>
      <Route path="/" component={DataContainer} exact={true} />
    </Switch>
    </div>
  </BrowserRouter>
);
export default AppRouter;
