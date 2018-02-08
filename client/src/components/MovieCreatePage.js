import React from 'react';
import axios from 'axios';

export default class MovieCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      genre:'',
      year: null,
      rating: null,
      message: ''
    };
  };

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onGenreChange = (e) => {
    const genre = e.target.value;
    this.setState(() => ({ genre }));
  };

  onYearChange = (e) => {
    const currentYear = (new Date()).getFullYear();
    const year = e.target.value;
    if (!year || (year > 0 && year <= currentYear && year.match(/^\d{1,4}$/)))this.setState(() => ({ year }));
  };

  onRatingChange = (e) => {
    const rating = e.target.value;
    if (!rating || (rating>0 && rating <11 && rating.match(/^\d{1,2}$/))) this.setState(() => ({ rating }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.name.trim() === '') return this.setState({ message: "Please enter a name of a movie." });
    if (this.state.genre === '') return this.setState({ message: "Please enter a genre for the movie." });
    if (this.state.year < 1898) return this.setState({ message: "Please enter a valid year for a movie." });
    if (this.state.rating ==='') return this.setState({ message: "Please rate this movie 1-10." });

    axios.post('/api/movies/', {
      name: this.state.name,
      genre: this.state.genre,
      year: this.state.year,
      averageRating: this.state.rating 
    })
      .then((response) => {
        console.log(response);
        //if (response.status === 200) this.props.history.push('/');
        if (response.status === 200) {
          this.setState({ 
            message: "Movie added succesfully!", 
            name: '',
            genre: '',
            year: null,
            rating: null
          });         
        };
      })
      .catch((error) => {
        if (error.response.data.code === 11000) this.setState({ message: "This movie already exists in the database! feel free to rate it in the Rating Page." });
        else this.setState({ message: "We're sorry, an unknown error has occurred." });
      });
  };

  render() {
    return (
      <div>
      <form onSubmit={this.onSubmit}>
        {this.state.message && <p>{this.state.message}</p>}
        <input 
          type="text" 
          name="name"
          placeholder="Movie name"
          autoFocus
          value={this.state.name}
          onChange ={this.onNameChange}
        />
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
          name="year" 
          placeholder="Year"
          value={this.state.year}
          onChange={this.onYearChange}
        />
        <input 
          type="number" 
          name="rating" 
          placeholder="1-10"
          value={this.state.rating}
          onChange={this.onRatingChange}
        />
        <div>
          <button type="submit">Add Movie</button>
        </div>
      </form>
      </div>
    );
  }
};

