import React from 'react';

const Movie = props => (
  <div >
    <h4>{props.name} </h4>
    <div>Release year: {props.year} - Users' rating: {props.averageRating.toFixed(1)}</div>    
  </div>
);

export default Movie;