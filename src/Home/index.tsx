import React, { useState } from 'react';
import './index.css';


const Home: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [degrees, setDegrees] = useState<string>('');
    const [iconSrc, setIconSrc] = useState<string>('');
    const [wind, setWind] = useState<string>('');
    const [contentVisible, setContentVisible] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const getDataAPI = async () => {
        if (!inputValue) return;

        const apiKey = '210dd652f30cd05248017ad4cb486e38';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
            inputValue
        )}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data?.cod && data.cod === '404') {
                console.log(data)
                alert('Local não encontrado!');
            } else {
                loadData(data);
            }
        } catch (error) {
            alert('Ocorreu um erro ao obter os dados do clima.');
        }
    };

    const loadData = (data: any) => {
        setPlace(`${data.name}, ${data.sys.country}`);
        setDegrees(`Temperatura: ${Math.floor(data.main.temp)}° C`);
        setIconSrc(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        setWind(`Vento: ${data.wind.speed} km/h`);
        setContentVisible(true);
    };

    return (
        <div className="Home">
            <h1 className="title">Tempo&Clima</h1>
            <input id="input" type="text" value={inputValue} onChange={handleInputChange} placeholder="Digite uma localização" />
            <button id="button" onClick={getDataAPI}>Buscar</button>

            <div className="content">
                <section>
                    <h2>{place}</h2>
                    <span>{degrees}</span>
                    <br />
                    <span>{wind}</span>
                </section>
                <img src={iconSrc} alt="Clima" />
            </div>


        </div >
    );
}

export default Home;
