import Reacts from "react";
import Form from 'react-bootstrap/Form'
import InputGroup from "react-bootstrap/esm/InputGroup";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
//import CityDisplayModal from "./CityDisplayModal";
import Select from 'react-select'

interface CityProps {
    name: string
}

interface CityDisplayModalProps {
    cityName: string;
    value: number;
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

    const [citiesAsync, setCitiesAsyc] = useState<CityDisplayModalProps[]>([]);

    // Use effect -- updated modal select cities
    useEffect(() => {
        if (showModal) {
            getCitiesFromCountry(inputCountry)
        }

    }, [inputCountry, showModal])

    // Function section

    /**
     * Gets cities based on country input
     * @param countryName 
     * @returns 
     */
    const getCitiesFromCountry = async (countryName: string) => {
        if (countryName === null || countryName.length < 3) {
            alert('Country name cannot be empty');
            setShowModal(false);
            return;
        }
        const apiUrl = 'https://countriesnow.space/api/v0.1/countries/cities';
        const requestData = {
            country: countryName,
        };

        try {
            console.log('here');
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
            const temp = new Array<CityDisplayModalProps>();
            for (let index = 0; index < data.data.length; index++) {
                const element = data.data[index];
                temp.push({ cityName: element, value: index });
            }
            setCitiesAsyc(temp);

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
                <Select options={options} />
            </InputGroup>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select>
                        <option> Select a city </option>
                        {citiesAsync.map((x) => <option key={x.value} value={x.value}>{x.cityName}</option>)}
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

const City: React.FC<CityProps> = ({ name }): JSX.Element => {
    return (
        <>
            <p className="lead"> This is {name} </p>
        </>
    )
}