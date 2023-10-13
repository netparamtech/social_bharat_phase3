import { Card, Image } from "antd";
import { useEffect, useState } from "react";

const BasicProfile = (props) => {
  const { userDetails } = props;
  const defaultPhoto = "/user/images/user.png";

  const [availableForMarriage, setAvailableForMarriage] = useState('');

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString('en-GB', options)
      .split('/');
    return `${month}-${day}-${year}`;
  };

  useEffect(() => {
    if (userDetails?.data?.is_available_for_marriage) {
      setAvailableForMarriage("YES")
    } else {
      setAvailableForMarriage("NO");
    }
  }, [userDetails])

  return (
    <div id="basic-profile-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="row mb-3 fw fs-5">
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
                <Image
                  className="img-fluid max-width-100 community-img"
                  src={
                    userDetails?.data?.community?.thumbnail_image
                      ? userDetails?.data?.community?.thumbnail_image
                      : defaultPhoto
                  }
                  width={50}
                  alt=""
                  title=""
                />
                <span className="" id="communityName">{userDetails?.data?.community?.name || "N/A"}</span>
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
                    <label className="fw-bold">Date Of Birth :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{formatDate(userDetails?.data?.dob)}</label>
                  </div>
                </div>
              </div>
              <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Marital Status :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{userDetails?.data?.marital_status}</label>
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
            </div>
            <div className="row">
              <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Is Available For Marriage :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{availableForMarriage}</label>
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
