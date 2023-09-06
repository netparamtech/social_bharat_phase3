import React, { useEffect, useState } from 'react';
import { encode } from '../../encryt/encode';
import { deleteContact } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';

const ContactInfo = (props) => {

  const { user } = props;
  const [contactDetails, setContactDetails] = useState([]);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteUserContact = async (id) => {
    try{
      const response = await deleteContact(id);
      if(response && response.status === 200){
        navigate('/profile')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate('/login');
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
            <a href="/user/update-contact" title="Add More Detail">
              <i className="btn btn-outline-info fas fa-plus"></i></a>
          </div>
          <div className="card-body">
            <h5 className="fw-3 mb-3">Contact Info</h5>
            <div className="row">
              {contactDetails && contactDetails.length > 0 ?
                contactDetails.map((item, idx) => (
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="edit-icon">
                        <a href={`/user/update-contact/${item.id}`} title="Edit">
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                      </div>
                      <div className="delete-icon"><a href="" title="Delete" onClick={()=>deleteUserContact(item.id)}><i class="fa-solid fa-trash" ></i></a></div>
                      <div className="card-body">
                        <div className="w-100 w-lg-75">
                          <div className="mb-2 row">
                            <u> {item.address_type}</u>
                            <label className="text-muted">
                              {item.address_line},
                              {item.city}, {item.state}, {item.country}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="add-more-info ">
                <a href='/user/update-contact' className='btn btn-outline-info'>Add Contact Info </a>
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
