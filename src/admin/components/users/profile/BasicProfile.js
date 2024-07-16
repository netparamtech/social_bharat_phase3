import { Card, Image } from "antd";
import { useEffect, useState } from "react";

const BasicProfile = (props) => {
  const { userDetails } = props;
  const defaultPhoto = "/user/images/user.png";

  const [availableForMarriage, setAvailableForMarriage] = useState('');

  const formatDate = (dateString) => {
    if (dateString !== null) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const [month, day, year] = new Date(dateString)
        .toLocaleDateString('en-GB', options)
        .split('/');
      return `${month}-${day}-${year}`;
    } else {
      return "N/A"
    }
  };

  const checkMobileVisibility = (mobile) => {
    return typeof mobile === 'string' && mobile.includes("*");
}

  useEffect(() => {
    if (userDetails?.data?.is_available_for_marriage) {
      setAvailableForMarriage("YES")
    } else {
      setAvailableForMarriage("NO");
    }
  }, [userDetails])

  return (
    <div id="" className="content-wrapper ">
      <div className="container">
        <div className="row mb-3 fw fs-5">
          <div className="col-md-12 mb-sm-3 bg-warning p-2 ">
            <div className="card shadow p-1" style={{borderRadius:'10px'}}>
              <div className="container-profilepic mx-auto  card-block-md overflow-hidden ">
                <img
                  src={
                    userDetails?.data?.photo
                      ? userDetails.data.photo
                      : "/user/images/OIP.jpg"
                  }
                  title={userDetails?.data?.name}
                />
              </div>
              <div className="card-body mx-auto ">
                <p className=" text-center mb-0">
                  <b>{userDetails?.data?.name.toUpperCase()}</b>
                </p><span>{userDetails?.data?.community?.name}</span>
                <Image
                  className="img-fluid community-img ms-2"
                  src={
                    userDetails?.data?.community?.thumbnail_image
                      ? userDetails?.data?.community?.thumbnail_image
                      : defaultPhoto
                  }
                  width={50}
                  alt=""
                  title=""
                />

              </div>
            </div>
          </div>

          <Card className="col-md-12 w-100 w-lg-75">
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
                    <label className="">{userDetails?.data?.email ? userDetails.data.email : 'N/A'}</label>
                  </div>
                </div>
              </div>
              <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Gender :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{userDetails?.data?.gender ? userDetails.data.gender : 'N/A'}</label>
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
                    <label className="fw-bold">Marital Status:</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{userDetails?.data?.marital_status ? userDetails.data.marital_status : 'N/A'}</label>
                  </div>
                </div>
              </div>
              <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Mobile :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{userDetails?.data?.user_mobile ? userDetails.data.user_mobile : 'N/A'}{" "}
                      
                     ( {checkMobileVisibility(userDetails?.data?.mobile)?('Invisible'):('Visible To Everyone')})
                      </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Occupation :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="text-wrap-break-word">{userDetails?.data?.occupation ? userDetails.data.occupation : 'N/A'}</label>
                  </div>
                </div>
              </div>
              <div className="mb-2 col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Highest Qualification :</label>
                  </div>
                  <div className="col-md-8">
                    <label className="">{userDetails?.data?.highest_qualification ? userDetails.data.highest_qualification : 'N/A'}</label>
                  </div>
                </div>
              </div>
              <div className=" col-md-6  col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-4">
                    <label className="fw-bold">Available For Marriage :</label>
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
