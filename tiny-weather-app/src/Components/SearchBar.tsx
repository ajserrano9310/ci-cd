import Reacts from "react";
import Form from 'react-bootstrap/Form'
import InputGroup from "react-bootstrap/esm/InputGroup";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
//import CityDisplayModal from "./CityDisplayModal";
import Select from 'react-select'
import AsyncSelect from 'react-select/async';

interface CityProps {
    name: string
}

interface CityDisplayModalProps {
    cityName: string;
    value: string;
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

function SearchBar() {
    // Search bar input
    const [inputCountry, setInputCity] = useState('');
    const handleInputChange = (e: any) => { setInputCity(e.target.value); }

    // Show and close modal
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

    const [citiesAsync, setCitiesAsyc] = useState<any>([]);
    const uri = "https://api.openweathermap.org/data/2.5/weather?lat=40.7608&lon=-111.8910&units=metric&appid=117dc4bba31cb1ddc1ceeb399015666e"


    // Use effect -- updated modal select cities
    useEffect(() => {
        getWeather(inputCountry)

    }, [inputCountry])

    // Function section

    /**
     * Gets cities based on country input
     * @param countryName 
     * @returns 
     */
    // const getCitiesFromCountry = async (countryName: string) => {
    //     if (countryName === null || countryName.length < 3) {
    //         alert('Country name cannot be empty');
    //         setShowModal(false);
    //         return;
    //     }
    //     const apiUrl = 'https://countriesnow.space/api/v0.1/countries/cities';
    //     const requestData = {
    //         country: countryName,
    //     };

    //     try {
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(requestData),
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         const temp = new Array<CityDisplayModalProps>();

    //         console.log(data.data);

    //         for (let index = 0; index < 2; index++) {
    //             const element = data.data[index];
    //             temp.push({ cityName: element, value: index });
    //         }

    //         setCitiesAsyc(temp);

    //     } catch (error) {
    //         console.error('Fetch error:', error);
    //     }
    // }

    const getWeather = (city: string) => {
        if (city.length < 1) {
            return;
        }
        let temp: any[] = [];
        const API_KEY = "117dc4bba31cb1ddc1ceeb399015666e";
        const DEFAULT_CITY = city;
        let cityUri = "http://api.openweathermap.org/geo/1.0/direct?q=" + DEFAULT_CITY + "&limit=5&appid=" + API_KEY;
        fetch(cityUri).then(
            function (response) {
                return response.json();
            }
        ).then(

            function (responseObj: any[]) {
                for (let x = 0; x < responseObj.length; x++) {
                    let { name } = responseObj[x];
                    let { country } = responseObj[x];

                    temp.push({ cityName: name, value: x, valueName: name + " " + country });
                }
                setCitiesAsyc(temp);
            }
        )
    }


    const getWeatherAutocomplete = async (inputValue: any) => {

        let temp: any[] = [];
        const API_KEY = "117dc4bba31cb1ddc1ceeb399015666e";
        const DEFAULT_CITY = 'New York';
        let cityUri = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&limit=5&appid=" + API_KEY;

        try {
            const response = await fetch(cityUri);
            const data = await response.json();
            for (let i = 0; i < data.length; i++) {
                var { name } = data[i];
                var { country } = data[i];
                temp.push({ label: name + ", " + country, value: i });
            }
            return temp;

        } catch (error) {
            console.log('Something went wrong when fetching');
            return [];
        }
    }

    // Function to handle option selection
    const handleSelectChange = (selectedOption: any) => {
        console.log('Selected option:', selectedOption);
    };

    return (
        <div>
            <InputGroup className="mb-3">
                {/* <InputGroup.Text>
                    Country

                </InputGroup.Text>
                <Button variant="primary" onClick={handleOpen}>
                    Search
                </Button>
                <Form.Control value={inputCountry} onChange={handleInputChange}
                    //placeholder="Username"
                    aria-label="countryInput"
                    aria-describedby="basic-addon1"
                /> */}



            </InputGroup>
            <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={getWeatherAutocomplete} // Function to fetch options asynchronously
                placeholder="Search for a city"
                onChange={handleSelectChange}
            />

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Select options={options} />
                    <Form.Select>
                        <option> Select a city </option>
                        {citiesAsync.map((x: any) => <option key={x.value} value={x.value}>{x.valueName}</option>)}
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>);


}

export default SearchBar;
