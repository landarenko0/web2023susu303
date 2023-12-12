import './App.css';
import './header.css';
import './body.css';
import './movieDetails.css';
import './createOrEditMovie.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieBlock from './components/movieBlock';
import {useState} from 'react';
import MovieDetails from './components/movieDetails';
import CreateMovie from './components/createMovie';
import EditMovie from './components/editMovie';

function App() {
  var xhttp = new XMLHttpRequest()
  xhttp.open("GET", "movies.json", false)
  xhttp.send()

  var json = {}
  if (xhttp.status === 200) json = JSON.parse(xhttp.responseText)

  const [creatingMovie, setCreatingMovie] = useState(false)
  const [editingMovie, setEditingMovie] = useState(false)
  const [movies, setMovies] = useState(json.movies)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [filterText, setFilterText] = useState('')

  function addMovieButton() {
    setCreatingMovie(true)
    document.getElementById("addMovieButton").classList.add("hidden")
  }

  function editMovieButton() {
    setEditingMovie(true)
    document.getElementById("addMovieButton").classList.add("hidden")
  }

  function itemClick(id) {
    setSelectedMovie(filterredMovies[id])
    setCreatingMovie(false)
    setEditingMovie(false)
    document.getElementById("addMovieButton").classList.remove("hidden")
  }

  function onCancelClick() {
    setCreatingMovie(false)
    setEditingMovie(false)
    document.getElementById("addMovieButton").classList.remove("hidden")
  }

  async function addMovie(movie) {
    if (movie.title === "" || movie.year === "" || movie.plot === "" || movie.posterUrl === "" || movie.runtime === "" || movie.genres === "" || movie.actors === "" || movie.director === "") {
      alert("Вы ввели не все параметры")
      return
    }

    var newMovie = {}
    await fetch("https://my-json-server.typicode.com/landarenko0/web2023susu303/movies", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => { newMovie = JSON.parse(JSON.stringify(json)) })
    
    newMovie.id = findMaxId(movies) + 1
    setMovies(prevState => [...prevState, newMovie])
    setCreatingMovie(false)
    document.getElementById("addMovieButton").classList.remove("hidden")
  }

  function editMovie(movie) {
    if (movie.title === "" || movie.year === "" || movie.plot === "" || movie.posterUrl === "" || movie.runtime === "" || movie.genres === "" || movie.actors === "" || movie.director === "") {
      alert("Вы ввели не все параметры")
      return
    }

    selectedMovie.title = movie.title
    selectedMovie.year = movie.year
    selectedMovie.runtime = movie.runtime
    selectedMovie.genres = movie.genres
    selectedMovie.director = movie.director
    selectedMovie.actors = movie.actors
    selectedMovie.plot = movie.plot
    selectedMovie.posterUrl = movie.posterUrl

    setMovies(prevState => [...prevState])
    setEditingMovie(false)
    document.getElementById("addMovieButton").classList.remove("hidden")
  }

  function findMaxId(list) {
    var maxId = 0

    list.forEach(movie => { if (movie.id > maxId) maxId = movie.id })
    return maxId
  }

  const filterredMovies = movies.filter(movie => {
    return movie.title.toLowerCase().includes(filterText.toLowerCase())
  })

  return (
    <div>
      {/* Header */}
      <div className="header">
        <b>Фильмотека</b>
        <div className="authorBlock"><b>Ландаренко Никита, КЭ-303</b></div>
      </div>

      {/* Body */}
      <div className="wrapper">
      <div className="moviesList">
        <div className="searchBlock">
          <div className="search">
            <input type="text" className="searchText" placeholder="Введите название фильма" id="searchText"></input>
          </div>
          <button className="searchButton" onClick={ () => { setFilterText(document.getElementById("searchText").value) } }>Искать</button>
        </div>
        <div className="list">
          { filterredMovies.length !== 0 ? <MovieBlock movies={filterredMovies} onClick={itemClick} /> : <div></div> }
        </div>
        <div className="line"></div>
        <div className="moviesListFooter">
          <label>Найдено {filterredMovies.length} элементов</label>
          <button className="addMovieButton" onClick={addMovieButton} id="addMovieButton"><img src='plus.svg' alt=''></img> Добавить</button>
        </div>
        </div>
        <div>
          { creatingMovie ? <CreateMovie onCancelClick={onCancelClick} onSubmit={addMovie} /> : <div></div> }
          { editingMovie ? <EditMovie onCancelClick={onCancelClick} onSubmit={editMovie} movie={selectedMovie} /> : <div></div> }
          { selectedMovie != null && !(creatingMovie || editingMovie) ? <MovieDetails movie={selectedMovie} onEditClick={editMovieButton} /> : <div></div> }
        </div>
      </div>
    </div>
  );
}

export default App;
