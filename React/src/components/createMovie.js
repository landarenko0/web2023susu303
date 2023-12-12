import React from "react";

function CreateMovie(props) {
    function getParameters() {
        return {
            title: document.getElementById("movieTitle").value,
            year: document.getElementById("movieYear").value,
            runtime: document.getElementById("movieRuntime").value,
            genres: document.getElementById("movieGenres").value.split(", "),
            director: document.getElementById("movieDirector").value,
            actors: document.getElementById("movieActors").value,
            plot: document.getElementById("moviePlot").value,
            posterUrl: document.getElementById("moviePosterUrl").value
        }
    }
    
    return (
        <div>
            <div className="createOrEdit">
            <p className="mainLable">Создание фильма</p>
            <div>
                <div className="item">
                    <p className="itemStyle">Название фильма</p>
                    <div className="inputStyle">
                        <input type="text" className="textStyle" placeholder="Введите название фильма" id="movieTitle"></input>
                    </div>
                </div>
                <div className="item">
                    <p className="itemStyle">Жанры</p>
                    <div className="inputStyle">
                        <input type="text" className="textStyle" placeholder="Введите жанры фильма (через ', ')" id="movieGenres"></input>
                    </div>
                </div>
                <div className="item">
                    <p className="itemStyle">Год выпуска</p>
                    <div className="inputStyle">
                        <input type="text" className="textStyle" placeholder="Введите год выпуска" id="movieYear"></input>
                    </div>
                </div>
                <div className="item">
                    <p className="itemStyle">Описание</p>
                    <div className="inputStyle">
                        <input type="text" className="textStyle" placeholder="Введите описание" id="moviePlot"></input>
                    </div>
                </div>
                <div className="item">
                    <p className="itemStyle">Ссылка на обложку</p>
                    <div className="inputStyle">
                        <input type="text" className="textStyle" placeholder="Укажите ссылку на обложку" id="moviePosterUrl"></input>
                    </div>
                </div>
                <div className="item">
                    <p className="itemStyle">Длительность фильма (мин)</p>
                    <div className="inputStyle">
                        <input type="text" className="textStyle" placeholder="Укажите длительность фильма в минутах" id="movieRuntime"></input>
                    </div>
                </div>
                <div className="item">
                    <p className="itemStyle">Список актеров</p>
                    <div className="inputStyle">
                        <input type="text" className="textStyle" placeholder="Введите актеров (через ', ')" id="movieActors"></input>
                    </div>
                </div>
                <div className="item">
                    <p className="itemStyle">Режиссер</p>
                    <div className="inputStyle">
                        <input type="text" className="textStyle" placeholder="Введите режиссера" id="movieDirector"></input>
                    </div>
                </div>
            </div>
            </div>
            <div className="footerLine"></div>
            <div className="createOrEditFooter">
                <button className="cancelButton" onClick={ () => { props.onCancelClick() } }>Отменить</button>
                <button className="saveButton" onClick={ () => { props.onSubmit(getParameters()) } }>Сохранить</button>
            </div>
        </div>
    )
}

export default CreateMovie;