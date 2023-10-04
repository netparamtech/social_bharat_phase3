import { Card, Image } from "antd";
import { useEffect, useState } from "react";

const BasicProfile = (props) => {
  const { userDetails } = props;
  const [userProfile, setUserProfile] = useState("");
  const defaultPhoto = "/user/images/user.png";

  return (
    <div id="basic-profile-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-sm-3 ">
            <div className="card shadow">
              <div className="container-profilepic mx-auto card card-block-md overflow-hidden ">
                <Image
                  src={
                    userDetails?.data?.photo
                      ? userDetails.data.photo
                      : "/user/images/OIP.jpg"
                  }
                  title={userDetails?.data?.name}
                />
              </div>
              <div className="card-body ">
                <p className="card-text text-center mb-0">
                  {userDetails?.data?.name}
                </p>
                <p className="card-text text-center text-muted"></p>
              </div>
            </div>
          </div>

          <Card className="col-md-9 w-100 w-lg-75">
            <div className="row">
              <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Name :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{userDetails?.data?.name}</label>
                  </div>
                </div>
              </div>
              <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Email :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{userDetails?.data?.email}</label>
                  </div>
                </div>
              </div>
              <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Gender :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{userDetails?.data?.gender}</label>
                  </div>
                </div>
              </div>
              <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Mobile :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{userDetails?.data?.mobile}</label>
                  </div>
                </div>
              </div>
              <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Community :</label>
                  </div>
                  <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6">
                    <label className="">
                    {userDetails?.data?.community?.name}
                  </label>
                    </div>
                    <div className="col-md-6">
                    <Image
                      height={70}
                      src={
                        userDetails?.data?.community?.thumbnail_image
                          ? userDetails?.data?.community?.thumbnail_image
                          : defaultPhoto
                      }
                      title={userDetails?.data?.name}
                    />
                    </div>
                  </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BasicProfile;
