import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import MovieCreatePage from '../components/MovieCreatePage';
import MovieRatePage from '../components/MovieRatePage';
import MoviesDashboardPage from '../components/MoviesDashboardPage';
import NotFoundPage from '../components/NotFoundPage';

export default () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={MoviesDashboardPage} />
        <Route path="/create" component={MovieCreatePage} />
        <Route path="/rate" component={MovieRatePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
    </BrowserRouter>
);