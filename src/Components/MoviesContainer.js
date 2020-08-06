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
		      "Family",
		      "Fantasy",
		      "Musical"
		    ],
		    "imdb_score": 8.3,
		    "name": "The Wizard of Oz"
		  },
		  {
		    "popularity": 88.0,
		    "director": "George Lucas",
		    "genre": [
		      "Action",
		      "Adventure",
		      "Fantasy",
		      "Sci-Fi"
		    ],
		    "imdb_score": 8.8,
		    "name": "Star Wars"
		  },
		  {
		    "popularity": 66.0,
		    "director": "Giovanni Pastrone",
		    "genre": [
		      "Adventure",
		      "Drama",
		      "War"
		    ],
		    "imdb_score": 6.6,
		    "name": "Cabiria"
		  },
		  {
		    "popularity": 87.0,
		    "director": "Alfred Hitchcock",
		    "genre": [
		      "Horror",
		      "Mystery",
		      "Thriller"
		    ],
		    "imdb_score": 8.7,
		    "name": "Psycho"
		  },
		  {
		    "popularity": 80.0,
		    "director": "Merian C. Cooper",
		    "genre": [
		      "Adventure",
		      "Fantasy",
		      "Horror"
		    ],
		    "imdb_score": 8.0,
		    "name": "King Kong"
		  }
		],
		movieListOriginal:[
		  {
		    "popularity": 83.0,
		    "director": "Victor Fleming",
		    "genre": [
		      "Adventure",
		      "Family",
		      "Fantasy",
		      "Musical"
		    ],
		    "imdb_score": 8.3,
		    "name": "The Wizard of Oz"
		  },
		  {
		    "popularity": 88.0,
		    "director": "George Lucas",
		    "genre": [
		      "Action",
		      "Adventure",
		      "Fantasy",
		      "Sci-Fi"
		    ],
		    "imdb_score": 8.8,
		    "name": "Star Wars"
		  },
		  {
		    "popularity": 66.0,
		    "director": "Giovanni Pastrone",
		    "genre": [
		      "Adventure",
		      "Drama",
		      "War"
		    ],
		    "imdb_score": 6.6,
		    "name": "Cabiria"
		  },
		  {
		    "popularity": 87.0,
		    "director": "Alfred Hitchcock",
		    "genre": [
		      "Horror",
		      "Mystery",
		      "Thriller"
		    ],
		    "imdb_score": 8.7,
		    "name": "Psycho"
		  },
		  {
		    "popularity": 80.0,
		    "director": "Merian C. Cooper",
		    "genre": [
		      "Adventure",
		      "Fantasy",
		      "Horror"
		    ],
		    "imdb_score": 8.0,
		    "name": "King Kong"
		  }
		],
		movieName:'',
		userName:'',
		showSigninBox: false,
		signIn: ''
	}

	 showSigninBox = () => {
	 	if(this.state.userName.length === 0)
			this.setState({showSigninBox: true, signIn: false});
		else{
			this.setState({ userName: '', signIn: false, showSigninBox: true});
			localStorage.setItem('UserName', JSON.stringify(''));
		}
	}

	handleSignIn = (e) => {
		e.preventDefault();
	    this.setState({showSigninBox: false, signIn: true});
	    localStorage.setItem('UserName', JSON.stringify(this.state.userName));
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
		return movieList.filter((movie) => {
			let movieName = movie.name.toLowerCase();
			let queryString = searchName.toLowerCase();
			if(movieName.includes(queryString))
				return movie;
		})
	}

	onChangeHandler = (e) => {
		const val = e.target.value;
		let name = e.target.name;
		this.setState({[name]: val});
	}

	onSubmitHandler = (e) => {
	    e.preventDefault();
	    let movieList = this.showMatchingMovies(this.state.movieList,this.state.movieName);
	    this.setState({ movieList });
	}

	reset = (e) => {
		let movieList = this.state.movieListOriginal;
		this.setState({ movieList});
	}

	handleGenre = (genre) =>{
		let data = [...this.state.movieList];
		var flag = false;
		let movieList=[];
		data.forEach((movie) => {
			movie.genre.forEach((movieGenre) => {
				console.log(genre , movieGenre);
				if(movieGenre == genre){ 
					movieList.push(movie);
				}
		 	})
		})
		this.setState({ movieList });
	}

	componentDidMount(){
		let userName = localStorage.getItem('UserName');
		if(userName.length> 0) {
			this.setState({
				userName: JSON.parse(userName),
				signIn: true
			});
		}
	}

	render() {
	  return (
	  	<div className="movie_app_container">
	  		<h3 id="sign_in_out" onClick={this.showSigninBox}>{this.state.signIn? "Sign Out" : "Sign In"}</h3>
	  		{this.state.showSigninBox? 
	  		(<form type="submit" onSubmit={this.handleSignIn}>
	  			<input type="text" onChange={this.onChangeHandler} name="userName"></input>
	  			<button>Sign In</button>
	  		</form>): null}
	  		<font face="Comic sans MS" size="5">
	  			<h1 className="heading"> Movies </h1>
	  		</font>
	  		<form onSubmit={this.onSubmitHandler}>
	  			<input className = "movie_searchbox" type="text" onChange={this.onChangeHandler} name="movieName"></input>
	  			<button className= "search_button" type="submit" >Search</button>
	  		</form>
	  		<button className= "reset_button" type="submit" onClick={this.reset} >Reset</button>
	  		<div id="genre_container">
	  			<h2 id="genre_heading">Genres</h2>
	  			<ul id="genre_list_container">
	  				<li className= "genre_item" onClick={() => this.handleGenre("Adventure")}>Adventure</li>
	  				<li className= "genre_item" onClick={() => this.handleGenre("Family")}>Family</li>
	  				<li className= "genre_item" onClick={() => this.handleGenre("Fantasy")}>Fantasy</li>
	  				<li className= "genre_item" onClick={() => this.handleGenre("Musical")}>Musical</li>
	  				<li className= "genre_item" onClick={() => this.handleGenre("Sci-Fi")}>Sci-Fi</li>
	  				<li className= "genre_item" onClick={() => this.handleGenre("War")}>War</li>
	  				<li className= "genre_item" onClick={() => this.handleGenre("Drama")}>Drama</li>
	  				<li className= "genre_item" onClick={() => this.handleGenre("Mystery")}>Mystery</li>
	  				<li className= "genre_item" onClick={() => this.handleGenre("Thriller")}>Thriller</li>
  				</ul>
  				<button id="genre_button" onClick={this.reset}>Remove</button>
	  		</div>
		  	<div id="sort_container">
		  		<h3 id="sort_heading"> Sort By </h3>
		  		<ul id="sort_list_container">
			  		<li className= "sort_item" onClick={this.sortByPopularity}>Popularity</li>
			  		<li className= "sort_item" onClick={this.sortByDirectorName}>Director name</li>
			  		<li className= "sort_item" onClick={this.sortByMoviesName}>Movies Name</li>
		  		</ul>
		  	</div>
		  	{this.state.signIn && 
			  	<div id="adminPanel">
				  	<p> Add Movie </p>
				  	<p>Delete Movie</p>
				  	<p>Update Movie</p>
			  	</div>}
		    <div className="movies_container">
		     {this.state.movieList.map((movies) => {
		     	return(<div className="movie">{movies.name}</div>)
		     })}
		    </div>
	    </div>
	  );
	}
}
export default MoviesContainer;