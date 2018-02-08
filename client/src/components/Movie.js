import React from 'react';

const Movie = props => (
  <div >
    <h4>{props.name} </h4>
    <div>Year: {props.year} - Users' Rating: {props.averageRating}</div>    
  </div>
);

export default Movie;