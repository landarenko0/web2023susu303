import React from "react";

function Movie(props) {
    return (
        <div className="filmBlock" onClick={() => {props.onClick(props.id)}} >
            <div className="movieName">{props.movie.title}</div>
            <div className="movieBriefInfo">
                <div className="movieBriefInfoItem">{props.movie.year}</div>
                <div className="movieBriefInfoItem"><label>|</label></div>
                <div className="movieBriefInfoItem"><label>{props.movie.genres.join(", ")}</label></div>
            </div>
        </div>
    )
}

export default Movie;