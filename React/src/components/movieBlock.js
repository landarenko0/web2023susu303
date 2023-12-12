import React from "react";
import Movie from "./movie";

function MovieBlock(props) {
    return props.movies.map((movie, index) => <Movie key={index} id={index} movie={movie} onClick={props.onClick} />)
}

export default MovieBlock;