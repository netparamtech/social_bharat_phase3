import { useNavigate, useParams } from "react-router-dom";
import { fetchCommunityWithNAME } from "../../services/userService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import NotFound from "../../../NotFound";

const ViewCommunity = () => {
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const { name } = useParams();
  const [data, setData] = useState({});
  const [serverError, setServerError] = useState('');
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    navigate(-1);
  }
  const fetchCommunity = async () => {
    try {
      const response = await fetchCommunityWithNAME(name);
      if (response && response.status === 200) {
        setData(response.data.data);
        setServerError('');
        setNotFound(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      } else if (error.response && error.response.status === 404) {
        setNotFound(true);
      }
    }
  };
  useEffect(() => {
    fetchCommunity();
  }, [name]);

  return (
    <div id="auth-wrapper" className="pt-3">
      <div className="container" id="community-text">
        {
          !notFound ? (
            <div className="row">
              <div className="col-lg-12">
                {serverError && <p>{serverError}</p>}
                <div className="mb-5 community-img">

                  <img src={data.banner_image} className=" img-fluid rounded-2" alt="Banner" />
                </div>
                <div className="card shadow mb-5 p-5">
                  {data && (
                    <>
                      <div><h2 className="fs-bold">{data.name}</h2></div>
                      <div
                        dangerouslySetInnerHTML={{ __html: data.community_archive }}
                      />
                    </>
                  )}
                  <div>
                    {
                      isAuthenticUser ? <a className="btn btn-primary hover-pointer" onClick={handleHomeClick}>Go Back</a> : ''
                    }
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <NotFound />
          )
        }
      </div>
    </div>
  );
};
export default ViewCommunity;
