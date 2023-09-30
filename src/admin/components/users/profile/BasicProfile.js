import { Card, Image } from "antd";
import { useEffect, useState } from "react";

const BasicProfile = (props) => {
  const { userDetails } = props;
  const [userProfile, setUserProfile] = useState('');
  const defaultPhoto = '/user/images/user.png';

  return (
    <div id="basic-profile-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-sm-3 ">
            <div className="card shadow">

              <div className="container-profilepic mx-auto card card-block-md overflow-hidden ">
                <Image
                  
                  src={userDetails?.data?.photo ? userDetails.data.photo : "/user/images/OIP.jpg"}
                  title={userDetails?.data?.name}
                />

              </div>
              <div className="card-body ">
                <p className="card-text text-center mb-0">{userDetails?.data?.name}</p>
                <p className="card-text text-center text-muted"></p>
              </div>
            </div>
          </div>
          {/* <div className="col-md-9 ">
            <div className="card shadow">
              <div className="card-body ">
                <div className="w-100 w-lg-75">
                  <div className="mb-2 row">
                    <label htmlFor="" className="col-sm-3">Name</label>
                    <div className="col-sm-8"><span className="text-muted">{userDetails?.data?.name}</span></div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3">Email </label>
                    <div className="col-sm-8"><span className="text-muted">{userDetails?.data?.email}</span></div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3 ">Gender</label>
                    <div className="col-sm-8"><span className="text-muted">{userDetails?.data?.gender}</span></div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3">Community </label>
                    <div className="col-sm-8"><span className="text-muted">{userDetails?.data?.community?.name}</span></div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3">Mobile No</label>
                    <div className="col-sm-8"><span className="text-muted">{userDetails?.data?.mobile}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <Card className="col-md-9 w-100 w-lg-75">
            <p>Name - {userDetails?.data?.name}</p>
            <p>Email - {userDetails?.data?.email}</p>
            <p>Gender - {userDetails?.data?.gender}</p>
            <p>Mobile - {userDetails?.data?.mobile}</p>

            <div className="container-profilepic mx-auto card-block-md overflow-hidden ">
                <Image
                  width={100}
                  height={50}
                  src={userDetails?.data?.community?.thumbnail_image ? userDetails?.data?.community?.thumbnail_image : defaultPhoto}
                  title={userDetails?.data?.name}
                />
                 <p>Community - {userDetails?.data?.community?.name}</p>

              </div>
            
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BasicProfile;
