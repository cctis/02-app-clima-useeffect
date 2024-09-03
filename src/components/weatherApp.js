//api gratuita del clima https://www.weatherapi.com/
import {useEffect, useState} from 'react';
import WeatherForm from './weatherForm';
import WeatherMainInfo from './weatherMainInfo';

import styles from "./weatherApp.module.css";

export default function WeatherApp(){

    const [weather,setWeather]=useState(null);

    //si loadInfo no tiene ninguna ciudad especificada carga por defecto london, pero el usuairio ingresa por primera vez
    //va a tener una ciudad por defecto. useEffect = efectos laterales,
    // 1. se ejecuta codigo cuando carga la app. 2. cada vez que hay un render de todo el estado 3.cuando el componente se destruye

    useEffect(()=>{
        loadInfo();
    },[]);
    //al dejarlo vacio se ejecuta una sola vez

    useEffect(()=>{
        document.title=`Weather | ${weather?.location.name ?? ""}`;
    },[weather]);

    async function loadInfo(city = 'london'){
        //solicitud http para consulta de la api, asincrono
        try {
            const request= await fetch(
                `${process.env.REACT_APP_URL}&KEY=${process.env.REACT_APP_KEY}&q=${city}`
            );

            const json= await request.json();

            setWeather(json);

            console.log(json);
        } catch (error) {
            
        }
    }

    function handleChangeCity(city){
        setWeather(null);
        loadInfo(city);
    }

    return <div className={styles.weatherContainer}>
        <WeatherForm onChangeCity={handleChangeCity} />
        {/* para que no se rompa la aplilcacion porque si un estado es null es decir */}
        {/* en lo que carga la solicitud de la api se debe colocar ?*/}
      {weather ? <WeatherMainInfo weather={weather} /> : '...cargando info'}
    </div>
}