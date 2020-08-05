import React from 'react';
import './styles.css';

class MoviesContainer extends React.Component {
	state={
		movieList:[
		  {
		    "popularity": 83.0,
		    "director": "Victor Fleming",
		    "genre": [
		      "Adventure",
		      " Family",
		      " Fantasy",
		      " Musical"
		    ],
		    "imdb_score": 8.3,
		    "name": "The Wizard of Oz"
		  },
		  {
		    "popularity": 88.0,
		    "director": "George Lucas",
		    "genre": [
		      "Action",
		      " Adventure",
		      " Fantasy",
		      " Sci-Fi"
		    ],
		    "imdb_score": 8.8,
		    "name": "Star Wars"
		  },
		  {
		    "popularity": 66.0,
		    "director": "Giovanni Pastrone",
		    "genre": [
		      "Adventure",
		      " Drama",
		      " War"
		    ],
		    "imdb_score": 6.6,
		    "name": "Cabiria"
		  },
		  {
		    "popularity": 87.0,
		    "director": "Alfred Hitchcock",
		    "genre": [
		      "Horror",
		      " Mystery",
		      " Thriller"
		    ],
		    "imdb_score": 8.7,
		    "name": "Psycho"
		  },
		  {
		    "popularity": 80.0,
		    "director": "Merian C. Cooper",
		    "genre": [
		      "Adventure",
		      " Fantasy",
		      " Horror"
		    ],
		    "imdb_score": 8.0,
		    "name": "King Kong"
		  }
		],

		movieName:''
	}

	compareMovie=(a ,b) =>{
		if (a.name < b.name) return -1;
		else if (a.name > b.name) return 1;
		else return 0;
	}

	compareDirector = (a, b) => {
		if (a.director < b.director) return -1;
		else if (a.director > b.director) return 1;
		else return 0;
	
	}

	comparePopularity = (a,b) =>{
		return b.popularity - a.popularity;
	}

	sortByPopularity= () => {
		let data = [...this.state.movieList];
		data.sort(this.comparePopularity);
		this.setState({movieList: data});
	}

	sortByDirectorName = () => {
		let data = [...this.state.movieList];
		data.sort(this.compareDirector);
		this.setState({movieList: data});
	}

	sortByMoviesName = () => {
		let data = [...this.state.movieList];
		data.sort(this.compareMovie);
		this.setState({movieList: data});
	}

	showMatchingMovies = (movieList, searchName) => {
		//console.log(movieList, movieName);
		return movieList.filter((movie) => {
			let movieName = movie.name.toLowerCase();
			let queryString = searchName.toLowerCase();
			if(movieName.includes(queryString))
				return movie;
		})

	}

	onChangeHandler = (e) => {
		const movieName = e.target.value;
		this.setState({ movieName });
	}

	onSubmitHandler = (e) => {
	    e.preventDefault();
	    let movieList = this.showMatchingMovies(this.state.movieList,this.state.movieName);
	    this.setState({ movieList });
	}

	render() {
	  return (
	  	<div>
	  		<form onSubmit={this.onSubmitHandler}>
	  			<input type="text" onChange={this.onChangeHandler}></input>
	  			<button type="submit"></button>
	  		</form>
	  		<div>
	  		</div>
		  	<div>sort By
		  		<li onClick={this.sortByPopularity}>Popularity</li>
		  		<li onClick={this.sortByDirectorName}>Director name</li>
		  		<li onClick={this.sortByMoviesName}>Movies Name</li>
		  	</div>
		    <div className="movies_container">
		     {this.state.movieList.map((movies) => {
		     	return(<div>{movies.name}</div>)
		     })}
		    </div>
	    </div>
	  );
	}
}
export default MoviesContainer;
