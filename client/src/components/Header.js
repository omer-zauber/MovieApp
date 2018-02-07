import React from 'react';
import { Link } from 'react-router-dom';

export default ()=> (
  <div>
    <h1>
      MovieApp.
    </h1>
    <Link to="/">Dashboard</Link> | 
    <Link to="/create">Add a Movie</Link> | 
    <Link to="/rate">Rate a Movie</Link> 
  </div>
  
);