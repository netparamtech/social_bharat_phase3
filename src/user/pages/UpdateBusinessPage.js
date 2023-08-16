import React from 'react';
import UserLayout from '../layouts/UserLayout';
import UpdateBusinessProfile from '../components/ProfilePage/UpdateBusinessProfile';

const UpdateBusinessPage = () => {
  return (
    <UserLayout>
      <div id="profile-page-bg">
        <div className="container">
          <div id="profile-page">
            <div className="row">
              {/* <SideBar /> */}
              <div class="col-lg-9 col-md-8 mt-3 mx-auto ">
                <UpdateBusinessProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateBusinessPage;