import React from 'react';
import axios from 'axios';

import Movie from './Movie';

export default class MovieDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: '',
      start: '',
      end: '',
      message: '',
      movies: []
    };
  };

  onGenreChange = (e) => {
    const genre = e.target.value;
    this.setState(() => ({ genre }));
  };

  onStartChange = (e) => {
    const currentYear = (new Date()).getFullYear();
    const start = e.target.value;
    if (!start || (start > 0 && start <= currentYear && start.match(/^\d{1,4}$/))) this.setState(() => ({ start }));
  };

  onEndChange = (e) => {
    const currentYear = (new Date()).getFullYear();
    const end = e.target.value;
    if (!end || (end > 0 && end <= currentYear && end.match(/^\d{1,4}$/))) this.setState(() => ({ end }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { genre, start, end } = this.state;

    if (genre === '') return this.setState({ message: "Please enter a genre for the movie." });
    if (start < 1898 || start > end) return this.setState({ message: "Please enter a valid starting year for the movie search." });
    if (end < 1898) return this.setState({ message: "Please enter a valid ending year for the movie search." });

    axios.get(`/api/movies/${genre}/${start}/${end}`)
      .then((response) => {
        this.setState({movies:response.data.movies});
      })
      .catch((error) => {
        this.setState({ message: "We're sorry, an unknown error has occurred." });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.message && <p>{this.state.message}</p>}
          <select
            value={this.state.genre}
            onChange={this.onGenreChange}
          >
            <option value="" disabled>Genre</option>
            <option value="Action">Action</option>
            <option value="Animated">Animated</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
          </select>
          <input
            type="number"
            name="start"
            placeholder="From"
            value={this.state.start}
            onChange={this.onStartChange}
          />
          <input
            type="number"
            name="end"
            placeholder="To"
            value={this.state.end}
            onChange={this.onEndChange}
          />
          <div>
            <button type="submit">Search Movie</button>
          </div>
        </form>
        <div>
          {this.state.movies.length === 0 && <p>Please pick a genre and years range to search for movies!</p>}
          {
            this.state.movies.map((movie) => (
              <Movie
                key={movie._id}
                name={movie.name}
                year={movie.year}
                averageRating={movie.averageRating}
              />)
            )
          }
        </div>
      </div>
    );
  }
};
