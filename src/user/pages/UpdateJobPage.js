import React from 'react';
import UserLayout from '../layouts/UserLayout';
import UpdateJobProfile from '../components/ProfilePage/UpdateJobProfile';

const UpdateJobPage = () => {
  return (
    <UserLayout>
      <div id="profile-page-bg">
        <div className="container">
          <div id="profile-page">
            <div className="row">
              {/* <SideBar /> */}
              <div class="col-lg-9 col-md-8 mt-3 ms-auto ">
                <UpdateJobProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateJobPage;