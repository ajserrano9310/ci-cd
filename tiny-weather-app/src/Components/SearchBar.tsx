import Reacts from "react";
import Form from 'react-bootstrap/Form'
import InputGroup from "react-bootstrap/esm/InputGroup";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
//import CityDisplayModal from "./CityDisplayModal";

interface CityProps {
    name: string }

interface CityDisplayModalProps {
    cityName: string;
    value: number;
}

function SearchBar() {
    // Search bar input
    const [inputCountry, setInputCity] = useState('');
    const handleInputChange = (e: any) => { setInputCity(e.target.value);}

    // Show and close modal
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

    const [citiesAsync, setCitiesAsyc] = useState<CityDisplayModalProps[]>([]);

    // Use effect -- updated modal select cities
    useEffect(()=> {
        getCitiesFromCountry(inputCountry)
    }, [inputCountry])

    const getCitiesFromCountry = async (countryName: string) => {
        if (countryName === null) {
            alert('Country name cannot be empty');
            setShowModal(false);
            return;
        }
        const apiUrl = 'https://countriesnow.space/api/v0.1/countries/cities';
        const requestData = {
            country: countryName,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            for (let index = 0; index < data.data.length; index++) {
                const element = data.data[index];
                citiesAsync.push({cityName:element, value: index});   
            }
            handleOpen();

        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    Country

                </InputGroup.Text>
                <Button variant="primary" onClick={handleOpen}>
                    Search
                </Button>
                <Form.Control value={inputCountry} onChange={handleInputChange}
                    //placeholder="Username"
                    aria-label="countryInput"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select> 
                        <option> Select a city </option>
                        {citiesAsync.map((x) => <option value={x.value}>{x.cityName}</option> )}
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
        </div>)

}

export default SearchBar;

const City: React.FC<CityProps> = ({ name }): JSX.Element => {
    return (
        <>
            <p className="lead"> This is {name} </p>
        </>
    )
}