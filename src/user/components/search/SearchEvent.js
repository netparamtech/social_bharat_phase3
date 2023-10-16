import React, { useEffect, useState } from 'react';
import { fetchAllCitiesByStateID, fetchAllStatesByCountryID, fetchBannerWithPageAndSection, searchBusinessWithCityState, searchBusinessWithSearchText } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { Carousel } from 'antd';

const SearchEvent = () => {

    const user = useSelector((state) => state.userAuth);

    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [defaultImage] = useState('/admin/img/de-default-1.jpeg');

    const [selectedCountry, setSelectedCountry] = useState('India');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countryID, setCountryID] = useState(101);

    //to show state and city according to user search

    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    //to show message on top of page

    const [message, setMessage] = useState('');
    const [serverError, setServerError] = useState("");

    const [isFilter, setIsFilter] = useState(false);

    const navigate = useNavigate();

    const [imageUrls, setImageUrls] = useState([]);
    const defaultEventImage = '/user/images/banner-3.jpg';

    const fetchBanners = async () => {
        try {
            const response = await fetchBannerWithPageAndSection('Home', 'Why Social Bharat');

            const activeBanners = response.data.data.filter((banner) => banner.status === 'Active');
            if (!Array.isArray(activeBanners[0].banner_urls)) {
                const updatedBannerUrls = [activeBanners[0].banner_urls];
                activeBanners[0].banner_urls = updatedBannerUrls;
            }
            setImageUrls(activeBanners[0].banner_urls);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                navigate('/login');
            }
        }
    };

    const handleCreateEventClick = (e) => {
        e.preventDefault();
        navigate("/event");
    };

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        setCity('');
        setSelectedCity('');

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

    const handleFilterClicked = () => {
        setIsFilter(!isFilter ? true : false);
    }

    const handleSearchText = (e) => {
        setSearchText(e.target.value);
    }



    const search = async (searchText) => {
        try {
            const response = await searchBusinessWithSearchText(searchText);
            if (response && response.status === 200) {
                setData(response.data.data);
                setServerError('');
            }

        } catch (error) {

            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    }

    const handleGoButtonClick = async () => {

        const queryParams = {
            q: '',
            state: selectedState ? selectedState.label : '',
            city: selectedCity ? selectedCity.label : ''
            // Add other modal fields to the queryParams
        };

        // Construct the query string from the queryParams object
        const queryString = new URLSearchParams(queryParams).toString();
        try {
            const response = await searchBusinessWithCityState(queryString);
            setData(response.data.data);
            setCity(selectedCity.label ? selectedCity.label : city);
            setState(selectedState.label ? selectedState.label : state);
            setServerError('');

        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }

        }

    }

    const getAllStates = async () => {
        try {
            const response = await fetchAllStatesByCountryID(countryID);
            if (response && response.status === 200) {
                setStates(response.data.data);
                setServerError('');
            }
        } catch (error) {

            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }

        }
    }

    const getAllCities = async (stateID) => {
        try {
            const response = await fetchAllCitiesByStateID(stateID);
            if (response && response.status === 200) {
                setCities(response.data.data);
                setServerError('');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    }

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    useEffect(() => {
        setState(user && user.user && user.user.native_place_state);
        setCity(user && user.user && user.user.native_place_city);
    }, [user]);
    useEffect(() => {
        search(searchText);
    }, [searchText]);

    useEffect(() => {
        // Check if selectedCountry is already set
        if (selectedCountry) {
            getAllStates();
        }
    }, [selectedCountry]);
    useEffect(() => {
        setState(selectedState.label)
    }, [city]);
    useEffect(() => {
        fetchBanners();
      }, []);
    return (
        <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">

            <div className="col-lg-12 col-md-6 float-end mt-0 mt-lg-5 d-none d-md-block wow animate__animated animate__zoomIn">
                <div className="image-zoom-containerm fade-in-image ">
                    <Carousel effect="fade" autoplay>
                        {imageUrls.map((item, index) => (
                            <div key={index} style={contentStyle}>
                                <img src={item} className="img-fluid image-zoom pb-3 " alt={`Banner ${index}`} />

                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>

            <div className="container">
                <div className="card shadow">
                    <div className="card-body">
                        {serverError && <span className='error'>{serverError}</span>}

                        <div>
                            <h5 className="fw-3 d-none d-sm-block">Search Event</h5>
                        </div>
                        <div className="filter-content pt-5 d-md-block">
                            {
                                city ? (
                                    <p >
                                        {city}
                                        {state && `(${state})`}
                                    </p>
                                ) : (
                                    <p >
                                        {state && `state - ${state}`}
                                    </p>
                                )
                            }
                        </div>
                        <div className="filter-icon">
                            <a title="Filter" className="btn btn-primary btn-sm me-2 hover-pointer" onClick={handleFilterClicked}>
                                <i className="fas fa-filter me-1"></i>Filter
                            </a>
                            <a title='Add Business' className='btn btn-primary hover-pointer' onClick={handleCreateEventClick}>Create Event </a>
                        </div>

                        <div className="container-input mb-3">
                            <input type="text" placeholder="Search event" name="text" className="input form-control" onChange={handleSearchText} />
                            <i className="fas fa-search"></i>
                        </div>
                        <div className={`row ${isFilter ? '' : 'd-none'}`}>
                            <div className="col-5 mb-3">
                                <Select
                                    options={states.map(state => ({ value: state.name, label: state.name }))}
                                    value={selectedState}
                                    onChange={handleStateChange}
                                    placeholder="State"
                                />

                            </div>
                            <div className="col-5 mb-3">
                                <Select
                                    options={cities.map(city => ({ value: city.name, label: city.name }))}
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                    placeholder="City"
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <a className="btn btn-set btn-primary hover-pointer" onClick={handleGoButtonClick}>Go</a>
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
                                                        <p>{item.business_name}</p>
                                                        <p>{item.city}</p>
                                                        <p>{item.state ? `(${item.state})` : ""}</p>
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

export default SearchEvent;
