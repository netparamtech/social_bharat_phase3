import React, { useEffect, useState } from 'react';
import { fetchAllCitiesByStateID, fetchAllStatesByCountryID, searchPeopleWithSearchText, searchWithCityState } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const SearchPeople = () => {

    const user = useSelector((state) => state.userAuth);

    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [defaultImage, setDefaultImage] = useState('/admin/img/de-default-1.jpeg');

    const [selectedCountry, setSelectedCountry] = useState('India');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countryID, setCountryID] = useState(101);

    const [isFilter, setIsFilter] = useState(false);
    const navigate = useNavigate();

    const handleFilterClicked = () => {
        setIsFilter(!isFilter ? true : false);
    }


    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);

        if (selectedOption) {
            const selectedStateObject = states.find((state) => state.name === selectedOption.value);
            if (selectedStateObject) {
                getAllCities(selectedStateObject.id);
            }
        }
    };

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption); // Update the state with the selected option object
    };

    const handleSearchText = (e) => {
        setSearchText(e.target.value);
    }



    const handleGoButtonClick = async () => {
        const queryParams = {
            q:'',
            native_place_state: selectedState ? selectedState.label : '',
            native_place_city: selectedCity ? selectedCity.label : ''
            // Add other modal fields to the queryParams
        };

        // Construct the query string from the queryParams object
        const queryString = new URLSearchParams(queryParams).toString();

        // Do something with the query string (e.g., redirect to a new URL)
        try {
            const response = await searchWithCityState(queryString);
            setData(response.data.data);
        } catch (error) {
             //Unauthorized
             if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                navigate('/login');
            }

        }

    }


    const getAllStates = async () => {
        try {
            const response = await fetchAllStatesByCountryID(countryID);
            if (response && response.status === 200) {
                setStates(response.data.data);
            }
        } catch (error) {

            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                navigate('/login');
            }

        }
    }

    const getAllCities = async (stateID) => {
        try {
            const response = await fetchAllCitiesByStateID(stateID);
            if (response && response.status === 200) {
                setCities(response.data.data);
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                navigate('/login');
            }
        }
    }

    const search = async (searchText) => {
        try {
            const response = await searchPeopleWithSearchText(searchText);
            if (response && response.status === 200) {
                setData(response.data.data);
            }

        } catch (error) {

            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                navigate('/login');
            }
        }
    }
    useEffect(() => {
        search(searchText);
    }, [searchText]);

    useEffect(() => {
        // Check if selectedCountry is already set
        if (selectedCountry) {
            getAllStates();
        }
    }, [selectedCountry]);


    return (
        <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">
            <div className="container">
                <div className="card shadow">
                    <div className="card-body">
                        <div>
                            <h5 className="fw-3 mb-3 d-none d-sm-block">Search People</h5>
                        </div>
                        <div className="filter-content">
                            <p>{user && user.user && user.user.native_place_state}, {user && user.user && user.user.native_place_city}</p>
                        </div>
                        <div className="filter-icon">
                            <a href="#" title="Filter" className="btn btn-primary btn-sm me-2" onClick={handleFilterClicked}>
                                <i className="fas fa-filter me-1"></i>Filter
                            </a>
                        </div>
                        <div className="container-input mb-3">
                            <input type="text" placeholder="Search" name="text" className="input form-control" onChange={handleSearchText} />
                            <i className="fas fa-search"></i>
                        </div>
                        <div className={`row ${isFilter ? '' : 'd-none'}`}>
                            <div className="col-5 mb-3">
                                <Select
                                    options={states.map(state => ({ value: state.name, label: state.name }))}
                                    value={selectedState}
                                    onChange={handleStateChange}
                                />

                            </div>
                            <div className="col-5 mb-3">
                                <Select
                                    options={cities.map(city => ({ value: city.name, label: city.name }))}
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <a href="#" className="btn btn-set btn-primary" onClick={handleGoButtonClick}>Go</a>
                            </div>
                        </div>
                        <div className="row">
                            {/* User Cards */}

                            {
                                data && data.map((item, idx) => (
                                    <div className="col-md-4" key={idx}>
                                        <div className="card shadow mb-2">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={item.photo ? item.photo : defaultImage} alt={item.name} title={item.name} className="avatar img-fluid img-circle " />
                                                    </div>
                                                    <div className="col-8 user-detail">
                                                        <p>{item.name}</p>
                                                        <p>{item.mobile}</p>
                                                        <p className="text-muted">designation</p>
                                                        <p className="text-muted">D.O.B</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }



                            {/* Repeat the user card structure as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPeople;
