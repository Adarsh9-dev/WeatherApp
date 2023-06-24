import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faStreetView} from "@fortawesome/free-solid-svg-icons"
import "./Weather.css";
import axios from 'axios';

function Weather() {
    const [name,setName] = useState("");
    const [cityName,setCityName] = useState("Mumbai")
    const [minTemp,setMinTemp] = useState(24.52);
    const [maxTemp,setMaxTemp] = useState(26.52);
    const [temp,setTemp] = useState(26.52);
    const [checker,setCheckeer] = useState(false);

    const Changer = (e) => {
        const city = e.target.value;
        setName(city);
        setCityName(city);
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a8dbeb613527376f2d5b528142531340`)
        .then((res)=> {
            setCheckeer(true);
            setMinTemp((res.data.main.temp_min - 273.15 ).toFixed(2));
            setMaxTemp((res.data.main.temp_max - 273.15 ).toFixed(2));
            setTemp((res.data.main.temp - 273.15).toFixed(2))
        })
        .catch((err)=> {
            setCheckeer(false);
        })
    }
    const deleteCityName = ()=> {
        setName("");
        setCheckeer(false);
    }
    
    return (
        <div className='weather'>
        <div className='weatherContainer'>
            <div className='input'>
                <input type="text" className='weatherInput' value={name} onChange={Changer}/>
                <FontAwesomeIcon icon={faXmark} className="weatherInputCross" onClick={deleteCityName}/>
            </div>
            {checker === false ? <span>No Data Found</span> : <div className='weatherData'>
                <div className='weatherDataContainer'>
                    <div className='weatherDataTitle'>
                        <FontAwesomeIcon className='weatherDataIcon' icon={faStreetView} />
                        <span className='weatherDataHeading'>{cityName}</span>
                    </div>
                    <div className='weaatherDataDegree'>
                        <span className='weaatherDataDegreeVal'>{temp}°Cel</span>
                        <span className='weaatherDataDegreeMax'>Min : {minTemp}°Cel | Max: {maxTemp}°Cel</span>
                    </div>
                    <div className='HalfCircle'></div>
                </div>
            </div>}
        </div>
        </div>
    )
}


export default Weather
