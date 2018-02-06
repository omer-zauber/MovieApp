const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Movie } = require('./models/movie');
const { calculateAverage } = require('./utils/calculateAverage');

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
          console.log(result); //monitoring. delete after
        }).catch((e) => res.status(400).send(e));
      } else {
        return res.status(400).send('the rating is an invalid number');
      };
    })
    .catch(e => res.status(400).send(e));
})

app.listen(3000, () => {
  console.log('listens on port 3000');
});

//dilema - search data from the path? body?
//dilema2 - average computing - server-side? client-side? --if i do the computing client-side i'd have to send the data to the client.



