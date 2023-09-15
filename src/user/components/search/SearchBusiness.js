import React, { useEffect, useState } from 'react';
import { searchBusinessWithSearchText } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const SearchBusiness = () => {

    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [defaultImage ] = useState('/admin/img/de-default-1.jpeg');

    const [isFilter, setIsFilter] = useState(false);

    const navigate = useNavigate();

    const handleFilterClicked = () => {
        setIsFilter(!isFilter?true:false);
    }

    const handleSearchText = (e) => {
        setSearchText(e.target.value);
    }

    const search = async (searchText) => {
        try {
            const response = await searchBusinessWithSearchText(searchText);
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
    return (
        <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">
            <div className="container">
                <div className="card shadow">
                    <div className="card-body">
                        <div>
                            <h5 className="fw-3 mb-3 d-none d-sm-block">Search Business</h5>
                        </div>
                        <div className="filter-content">
                            <p>Rajasthan, Jaipur</p>
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
                        <div className={`row ${isFilter?'':'d-none'}`}>
                            <div className="col-5 mb-3">
                                <select name="state" id="state" className="form-control form-select">
                                    <option value="">State</option>
                                    {/* Add state options here */}
                                </select>
                            </div>
                            <div className="col-5 mb-3">
                                <select id="city" name="city" className="form-control form-select">
                                    <option value="">City</option>
                                    {/* Add city options here */}
                                </select>
                            </div>
                            <div className="col-2 mb-3">
                                <a href="#" className="btn btn-set btn-primary">Go</a>
                            </div>
                        </div>
                        <div className="row">
                            {/* User Cards */}

                            {
                                data && data.map((item, idx) => (
                                    <div className="col-md-4">
                                        <div className="card shadow mb-2">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={item.photo ? item.photo : defaultImage} alt={item.name} title={item.name} className="avatar img-fluid img-circle " />
                                                    </div>
                                                    <div className="col-8 user-detail">
                                                        <p>{item.business_name}</p>
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

export default SearchBusiness;
