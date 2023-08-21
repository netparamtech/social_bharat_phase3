import { useEffect, useState } from 'react';
import { fetchStates, updateContactDetail } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const UpdateContact = () => {

  const [addressType, setAddressType] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState([]);
  const [country, setCountry] = useState('India');

  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const handleAddressTypeChange = (e) => {
    setAddressType(e.target.value);
  };

  const handleAddressLineChange = (e) => {
    setAddressLine(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      address_type: addressType,
      address_line: addressLine,
      city,
      state,
      country,
    };

    try {
      const response = await updateContactDetail(updatedData);

      if (response && response.status === 200) {
        setErrors('');
        navigate('/dashboard')
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);

      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const [states, setStates] = useState([]);
  const [isLoadingStates, setIsLoadingStates] = useState(true);

  useEffect(() => {
    const fetchStatesData = async () => {
      try {
        const response = await fetchStates();

        if (response && response.status === 200) {
          setStates(response.data);
        }

      } catch (error) {
        console.error('An error occurred while fetching states', error);
      } finally {
        setIsLoadingStates(false);
      }
    };

    fetchStatesData();
  }, []);

  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Contact</h3>
                </div>
                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Address Type</label>
                      <select className="form-select form-control" aria-label="Default select example" onChange={handleAddressTypeChange}>
                        <option value="">---Address Type---</option>
                        <option value="PERMANENT">PERMANENT</option>
                        <option value="CURRENT">CURRENT</option>
                      </select>
                      {errors.address_type && <span className='error'>{errors.address_type}</span>}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Address Line</label>
                      <input
                        type="text"
                        name="addressLine"
                        id="addressLine"
                        placeholder="Enter Address Line"
                        className="form-control"
                        onChange={handleAddressLineChange}
                      />
                      {errors.address_line && <span className='error'>{errors.address_line}</span>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Country</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        onChange={handleCountryChange}
                      >
                        <option value="">---Select Country---</option>
                        <option value="India" selected>India</option>
                      </select>
                      {errors.country && <span className='error'>{errors.country}</span>}
                    </div>

                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">State</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        value={state}
                        onChange={handleStateChange}
                      >
                        <option value="">---Select State---</option>
                        {
                          states.map((stateData) => (
                            <option key={stateData.id} value={stateData.name}>
                              {stateData.name}
                            </option>
                          
                       ) )}
                      </select>
                      {errors.state && <span className='error'>{errors.state}</span>}
                    </div>
                  </div>

                  <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label className="form-label">City</label>
                    <select
                      className="form-select form-control"
                      aria-label="Default select example"
                      onChange={handleCityChange}
                    >
                      <option selected>---Select City---</option>
                      <option value="1">Jaipur</option>
                      <option value="2">Sikar</option>
                      <option value="3">Other</option>
                    </select>
                    {errors.city && <span className='error'>{errors.city}</span>}

                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default UpdateContact;
