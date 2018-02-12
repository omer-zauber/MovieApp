const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { mongoose } = require('./db/mongoose');
const { Movie } = require('./models/movie');
const { calculateAverage } = require('./utils/calculateAverage');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

  //
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  //addition from github



app.post('/api/movies', (req, res)=> {
  const { name, genre, year, averageRating, numberOfRatings } = req.body;
  const movie = new Movie({ name, genre, year, averageRating, numberOfRatings });
  movie.save()
    .then(movie => res.status(200).send(movie))
    .catch(e => res.status(400).send(e));
});

app.get('/api/movies/:genre/:start/:end', (req, res) => {
  const { genre, start, end } = req.params;
  console.log(genre, start, end);
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

app.patch('/api/movies/:name', (req, res) => {
  const name = req.params.name;
  Movie.findOne({ name })
    .then((movie) => {
      if (!movie) return res.status(400).send('unable to find movie');
      
      const { rating } = req.body;
      if (rating >=0 && rating <=10) {
        const { _id, averageRating, numberOfRatings } = movie; 
        const updatedAverageRating = calculateAverage(rating, averageRating, numberOfRatings);
        Movie.findByIdAndUpdate(_id, {
          $set: {
            averageRating: updatedAverageRating
          },
          $inc: {
            numberOfRatings: 1
          }
        }, {
            new: true
        }).then((result) => {
          res.status(200).send(result);
        }).catch((e) => res.status(400).send(e));
      } else {
        return res.status(400).send('the rating is an invalid number');
      };
    })
    .catch(e => res.status(400).send(e));
})

app.listen(port, () => {
  console.log('listens on port', port);
});




