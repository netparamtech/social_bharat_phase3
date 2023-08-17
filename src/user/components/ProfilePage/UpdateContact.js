import React, { useState } from 'react';
import { updateContactDetail } from '../../services/userService';

const UpdateContact = () => {

    const [address_type, setAddressType] = useState('');
    const [address_line, setAddressLine] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');

    const handleAddressTypeChange = (event) => {
        setAddressType(event.target.value);
    }

    const handleAddressLineChange = (event) => {
        setAddressLine(event.target.value);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleStateChange = (event) => {
        setState(event.target.value);
    }

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }

    const data = {
        address_type, address_line, city, state, country
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateContactDetail(data);

            if (response && response.status === 200) {

                setErrors('');
                setMessage(response.data.message);
                setAlertClass('alert-success');

                // navigate('/dashboard');

            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setMessage(error.response.data.message);
                setAlertClass('alert-danger');
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setMessage(error.response.data.message);
                setAlertClass('alert-danger');
            }
            //Unauthorized
            else if (error.response && error.response.status === 401) {
                setMessage(error.response.data.message);
                setAlertClass('alert-danger');
                localStorage.removeItem('token');
            }
            else if (error.response && error.response.status === 404) {
                setMessage(error.response.data.message);
                setAlertClass('alert-danger');
                localStorage.removeItem('token');
            }

        }
    }
    return (
        <div className="card mt-4 mb-5">
            <div className="card-body tab-content border-0 bg-white-smoke">
                <div className="tab-pane active" id="jobInfo">
                    <form className="repeater" onSubmit={handleSubmit}>
                        {message && <div className={`alert ${alertClass} mt-2`}>
                            {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
                            {" " + message}
                        </div>
                        }

                        <div className="table-responsive">
                            <table
                                data-repeater-list="tasks"
                                className="table table-striped"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Address Type</th>
                                        <th scope="col">Address Line</th>
                                        <th scope="col">City</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Country</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr data-repeater-item scope="row">
                                        <td>
                                            <select
                                                className="form-select me-4"
                                                name="address_type"
                                                onChange={handleAddressTypeChange}
                                            >
                                                <option value="select">Select Address Type</option>
                                                <option>PERMANENT</option>
                                                <option>CURRENT</option>
                                            </select>
                                            {errors.address_type && <span className='validation-error'>{errors.address_type}</span>}
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleAddressLineChange}
                                            />
                                            {errors.address_line && <span className='validation-error'>{errors.address_line}</span>}
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleCityChange}
                                            />
                                            {errors.city && <span className='validation-error'>{errors.city}</span>}
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleStateChange}
                                            />
                                            {errors.state && <span className='validation-error'>{errors.state}</span>}
                                        </td>
                                        <td>
                                            <select
                                                className="form-select me-4"
                                                name="country"
                                                onChange={handleCountryChange}
                                            >
                                                <option value="select">Select Country</option>
                                                <option value="INDIA">INDIA</option>
                                            </select>
                                            {errors.country && <span className='validation-error'>{errors.country}</span>}
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-2">
                            <button type='submit' className="btn btn-green w-25 mt-2">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateContact;
