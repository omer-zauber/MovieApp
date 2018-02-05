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

app.get('/movies/:genre/:start/:end', (req, res) => {
  const { genre, start, end } = req.params;
  Movie.find({
      genre,
      year: {
        $gte: start,
        $lte: end
      }
    })
    .then((movies) => res.status(200).send({ movies }))
    .catch(e => res.status(400).send(e));
});

app.patch('/movies/:name', (req, res) => {
  const name = req.params.name;
  Movie.findOne({ name })
    .then((movie) => {
      if (!movie) return res.status(400).send('unable to find movie');
      res.status(200).send(movie);
    })
    .catch(e => res.status(400).send(e));
})

app.listen(3000, () => {
  console.log('listens on port 3000');
});




