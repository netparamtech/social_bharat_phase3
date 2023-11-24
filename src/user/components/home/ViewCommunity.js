import { useNavigate, useParams } from "react-router-dom";
import { fetchCommunityWithNAME } from "../../services/userService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewCommunity = () => {
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const { name } = useParams();
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (isAuthenticUser) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }
  const fetchCommunity = async () => {
    try {
      const response = await fetchCommunityWithNAME(name);
      if (response && response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) { }
  };
  useEffect(() => {
    fetchCommunity();
  }, []);
  return (
    <div id="auth-wrapper" className="pt-3">
      <div className="container" id="community-text">
        <div className="row">
          <div className="col-lg-12">
            <div className="mb-5 community-img">
              <img src={data.banner_image} className=" img-fluid rounded-2" alt="Banner" />
            </div>
            <div className="card shadow mb-5 p-5">
              {data && (
                <div
                  dangerouslySetInnerHTML={{ __html: data.community_archive }}
                />
              )}
              <div>
                <a className="hover-pointer fs-2" onClick={handleHomeClick}>Go Home</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewCommunity;
