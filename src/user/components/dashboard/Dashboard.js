import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div id="dashboard">
      <div className="container pt-5 mb-5">
        <div className="row">
        
          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-peal text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Profile</div>
                    <div className="text-lg fw-bold">Manage Profile</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar feather-xl text-white-50"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a className="text-white stretched-link"  onClick={()=>navigate('/profile')}>View </a>
                <div className="text-white"><i className="fa-solid fa-arrow-right"></i></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-lightgreen text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Connection</div>
                    <div className="text-lg fw-bold">Search People</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square feather-xl text-white-50"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a className="text-white stretched-link"  onClick={()=>navigate('/user/search')}>View </a>
                <div className="text-white"><i className="fa-solid fa-arrow-right"></i></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-lightorange text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Matrimonial</div>
                    <div className="text-lg fw-bold">Search Partner</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square feather-xl text-white-50"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a className="text-white stretched-link"  onClick={()=>navigate('/user/search/partner')}>View Tasks</a>
                <div className="text-white"><i className="fa-solid fa-arrow-right"></i></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-classicbrown text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Making Money</div>
                    <div className="text-lg fw-bold">Search Business</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square feather-xl text-white-50"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a className="text-white stretched-link"  onClick={()=>navigate('/user/search/business')}>View </a>
                <div className="text-white"><i className="fa-solid fa-arrow-right"></i></div>
              </div>
            </div>
          </div>

          

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-darkyellow text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Matrimonial</div>
                    <div className="text-lg fw-bold">Create Matrimonial Profile</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle feather-xl text-white-50"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a className="text-white stretched-link"   onClick={()=>navigate('/user/update-matrimonial-profile')}>View </a>
                <div className="text-white"><i className="fa-solid fa-arrow-right"></i></div>
              </div>
            </div>
          </div>

         
          
          
          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-bluegray text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Events</div>
                    <div className="text-lg fw-bold">Update Contact Information</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar feather-xl text-white-50"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a className="text-white stretched-link"  onClick={()=>navigate('/user/update-contact')}>View</a>
                <div className="text-white"><i className="fa-solid fa-arrow-right"></i></div>
              </div>
            </div>
          </div>
         
          <div className="col-lg-6 col-xl-3 mb-4">
          <div className="card shadow bg-lightvoilet text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  <div className="text-white-75 small">Business</div>
                  <div className="text-lg fw-bold">Add Your Business</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar feather-xl text-white-50"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between small">
              <a className="text-white stretched-link"  onClick={()=>navigate('/user/update-business-profile')}>View</a>
              <div className="text-white"><i className="fa-solid fa-arrow-right"></i></div>
            </div>
          </div>
        </div> 

          

          

        

         
          
        </div>
      </div>
    </div>);
};

export default Dashboard;
