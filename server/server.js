const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Movie } = require('./models/movie');

const app = express();

app.use(bodyParser.json());

app.post('/movies', (req, res)=> {
  const { name, genre, year, averageRating, numberOfRatings } = req.body;
  const movie = new Movie({ name, genre, year, averageRating, numberOfRatings });

  movie.save()
  .then(doc => res.status(200).send(doc))
  .catch(e => res.status(400).send(e));
});

app.listen(3000, () => {
  console.log('listens on port 3000');
});




// const newMovie= new Movie({
//   name: 'Die Hard',
//   genre: 'action',
//   year: 1988,
//   averageRating: 34,
//   numberOfRatings: 3
// });

// newMovie.save().then((doc) =>{
//   console.log('added movie: \n', doc);
// }).catch((e) => {
//   console.log('error:', e);
// })