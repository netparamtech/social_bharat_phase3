import React, { useEffect, useState } from 'react';
import { deleteContact } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';

const ContactInfo = (props) => {

  const { user } = props;
  const [contactDetails, setContactDetails] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");

  const deleteUserContact = async (id) => {
    dispatch(setLoader(true));
    try {
      const response = await deleteContact(id);
      if (response && response.status === 200) {
        setContactDetails((prevContactDetails) =>
          prevContactDetails.filter((contact) => contact.id !== id)
        );
        setServerError('');
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));

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

  useEffect(() => {
    setContactDetails(user?.data?.contacts);
  }, [user]);
  return (
    <div id="contact-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow">
          <div className={`edit-icon add-more-detail ${contactDetails && contactDetails.length > 1 ? 'd-none' : ''}`}>
            <a className='hover-pointer' onClick={()=>navigate('/user/update-contact')} title="Add More Detail">
              <i className="btn btn-outline-info fas fa-plus"></i></a>
          </div>
          <div className="card-body">
          {serverError && <span className='error'>{serverError}</span>}
            <h5 className="fw-3 mb-3">Address Info</h5>
            <div className="row">
              {contactDetails && contactDetails.length > 0 ?
                contactDetails.map((item, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="card shadow mb-2">
                      <div className="edit-icon">
                        <a className='hover-pointer' onClick={()=>navigate(`/user/update-contact/${item.id}`)} title="Edit">
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                      </div>
                      <div className="delete-icon"><a href="" title="Delete" onClick={(e) => {
                        e.preventDefault();
                        deleteUserContact(item.id)
                      }}><i className="fa-solid fa-trash" ></i></a></div>
                      <div className="card-body">
                        <div className="w-100 w-lg-75">
                          <div className="mb-2 row">
                            <u> {item.address_type}</u>
                            <label className="text-muted">
                              {item.address_line} {item.city}, {item.state}, {item.country}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="add-more-info ">
                    <a onClick={()=>navigate('/user/update-contact')} className='btn btn-secondary hover-pointer'>Add Contact Info </a>
                  </div>
                )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
