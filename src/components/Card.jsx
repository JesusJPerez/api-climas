import axios from 'axios'
import { useState, useEffect } from 'react'


const Card = ({dark}) => {
    const[celcius,setCelcius] =useState(0)
    const[fahrenheit,setFahrenheit] =useState(0)
    const[grados,setGrados]=useState("F°")
    const[gradosOn,setGradosOn]=useState(false)

    const [data,setData]=useState({})
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position) =>{
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=6bd6717d80622b4689b7b89ada975886`)
            .then(resp => {
                setData(resp.data)
                setCelcius((resp.data.main?.temp)-273.15)
                setFahrenheit((((resp.data.main?.temp)-273.5)*9/5)+32)
            })
            .catch(error => console.error(error))
        })
    }, [])

    const show_convert=() =>{
        setGradosOn(!gradosOn)

        if (gradosOn) {
            setGrados("C°")
        } else {
            setGrados("F°")
        }
    }

    return(
        <div className={`card ${dark ? "card-dark" : ""}`}>
            <div className="temperature">{gradosOn ? Math.round(fahrenheit):Math.round(celcius)}°</div>
            <div className="icon"><img src={`/img/${data.weather?.[0]?.icon}.svg`} alt="" /></div>
            <div className="info">
                <div>
                    <span>VIENTO: </span><span>{data.wind?.speed}m/s </span>
                </div>
                <div>
                    <span>NUBES: </span><span>{data.clouds?.all}% </span>
                </div>
                <div>
                    <span>PRESION: </span><span>{data.main?.pressure}hPa </span>
                </div>
            </div>
            <div className="location"><span>{data.name}, </span><span>{data.sys?.country}</span>
            </div>
            <div className="description">{data.weather?.[0]?.description}</div>
            <div className='container-convert'>
            <button onClick={show_convert} className='convert'>Conventir a {grados} </button>
            </div>
        </div>
    )
}

export default Card