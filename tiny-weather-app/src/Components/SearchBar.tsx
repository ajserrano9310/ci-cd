import Reacts from "react";
import Form from 'react-bootstrap/Form'
import InputGroup from "react-bootstrap/esm/InputGroup";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
//import CityDisplayModal from "./CityDisplayModal";
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import CityDisplayModal from "./CityDisplayModal";

interface CityProps {
    name: string
}

interface CityDisplayModalProps {
    cityName: string;
    lat: number;
    long: number
}

interface MyComponentProps {
    option: any
}

var currentOptionsObj: { [id: number]: any } = {}

function SearchBar() {
    // Search bar input
    const [inputCountry, setInputCity] = useState('');
    const handleInputChange = (e: any) => { setInputCity(e.target.value); }

    // Show and close modal
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

    const [citiesAsync, setCitiesAsyc] = useState<any>([]);

    const [option, setSelectedOption] = useState({});

    const getWeatherAutocomplete = async (inputValue: any) => {

        if (inputValue === null) return [];

        let selectOptionsArr: any[] = [];
        const API_KEY = "117dc4bba31cb1ddc1ceeb399015666e";
        let cityUri = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&limit=5&appid=" + API_KEY;

        try {

            const response = await fetch(cityUri);
            const data = await response.json();

            currentOptionsObj = {};

            for (let i = 0; i < data.length; i++) {
                var { name } = data[i];
                var { country } = data[i];
                currentOptionsObj[i] = data[i]
                selectOptionsArr.push({ label: name + ", " + country, value: i });
            }
            return selectOptionsArr;

        } catch (error) {
            console.log('Something went wrong when fetching');
            return [];
        }
    }

    // Function to handle option selection
    const handleSelectChange = (selectedOption: any) => {
        const value = selectedOption.value;

        console.log("Your selected option", currentOptionsObj[value]);
        const weatherProps = CityDisplayModal();

        setSelectedOption(selectedOption);
    };

    return (
        <div>
            <InputGroup className="mb-3"></InputGroup>

            <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={getWeatherAutocomplete} // Function to fetch options asynchronously
                placeholder="Search for a city"
                onChange={handleSelectChange}
            />
            <div>
                <WeatherDisplay
                    option={option}
                ></WeatherDisplay>
            </div>
        </div>);


}

export default SearchBar;

const WeatherDisplay: React.FC<MyComponentProps> = ({ option }) => {
    return (
        <>
            <div>
                {/* {option} */}
            </div>

            <h1> Hello </h1>
        </>)
}
