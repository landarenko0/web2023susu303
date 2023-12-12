import React from "react";

function MovieDetails(props) {
    const allActors = props.movie.actors.split(", ")
    const actors = allActors.map((actor, index) => <div className="actor" key={index}><p>{actor}</p></div>)
    return (
        <div className="movieDetails">
            <div className="movieDetailsHeader">
                <label>ID: <label id="id">{ props.movie.id }</label> <img className="copyButton" src="copy.svg" alt="" onClick={ () => { navigator.clipboard.writeText(document.querySelector("#id").innerText) } }></img></label>
                <div className="edit" onClick={ () => { props.onEditClick() } }>
                    <label className="editText"><img className="editText" src="edit.svg" alt=""></img> Редактировать</label>
                </div>
            </div>
            <div className="movieDetailsWrapper">
                <img className="poster" alt="" src={props.movie.posterUrl}></img>
                <div>
                    <p><b className="titleStyle">{props.movie.title}</b></p>
                    <p className="directorStyle">{props.movie.director}</p>
                    <div className="detailsWrapper">
                        <div className="parameters">
                            <b>Параметры</b>
                            <div className="parameter">
                                <label className="parameterNameStyle">Год производства</label>
                                <label>{ props.movie.year }</label>
                            </div>
                            <div className="parameter">
                                <label className="parameterNameStyle">Длительность (мин)</label>
                                <label>{ props.movie.runtime }</label>
                            </div>
                            <div className="parameter">
                                <label className="parameterNameStyle">Жанры</label>
                                <label>{ props.movie.genres.join(", ") }</label>
                            </div>
                        </div>
                        <div>
                            <b>В главных ролях <img src="checkMark.svg" alt=""></img></b>
                            {actors}
                        </div>
                    </div>
                </div>
            </div>
            <div className="description">
                <p><b>Описание</b></p>
                <p>{ props.movie.plot }</p>
            </div>
        </div>
    )
}

export default MovieDetails;