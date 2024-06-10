import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './Previu.css';


import fon2 from "./fon2.jpg"
import fon from "./fon.jpg"


export default function Previu() {

    // const [weatherData, setWeatherData] = useState(null)
    const [city, setСity] = useState("")
    const [open, setOpen] = useState(false)
    const [weatherData, setWeatherData] = useState(null);

    function handleFormSubmit(e) {
        e.preventDefault();
        if(city.trim()!==""){
            fetch(`http://api.weatherapi.com/v1/current.json?key=173f99cb647b47a8a35214439241606&q=${city}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setWeatherData(data);

                })
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                });
        }
    };


    function handleInputChange(e) {
        setСity(e.target.value.trim());
    }

    function toggleFormVisibility() {
        if(!open){
            setOpen(true)
        }
    }



    return (
        <>

            <header className="menu">

                <div className="line_menu">

                    <h2 className="menu_title">Weather Forecast</h2>

                </div>
                <form onSubmit={handleFormSubmit} className="line_input">
                    <input onChange={handleInputChange} className="input" type="text" placeholder="Город"/>
                    <button  onClick={toggleFormVisibility} type="submit" className="button btn btn-secondary">Submit</button>
                </form>
            </header>
            <p className="header-line"></p>


            <main className="container_main">
                {open && (
                    <div className={`package ${open ? 'visible' : ''}`}>
                        <p className="package_name">{weatherData?.location?.name}</p>
                        <hr/>
                        <p className="price">{weatherData?.current?.temp_c}&deg;</p>
                        <p className="desclamer"></p>
                        <hr/>
                        <img className="featuris" src={weatherData?.current?.condition?.icon} alt=""/>
                    </div>
                )}
            </main>

        </>
    );
}




