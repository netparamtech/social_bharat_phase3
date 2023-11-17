import { Switch } from "antd";
import { useEffect, useState } from "react";
import { getUserFullProfile, toggleMobile } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../actions/loaderAction";

const Setting = () => {

  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const [isMobileVisible, setIsMobileVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserProfile = async () => {
    dispatch(setLoader(false));
    try {
      const response = await getUserFullProfile();
      if (response && response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        // navigate('/login');
      }
    } finally {
      dispatch(setLoader(false));
    }
  }

  const handleToggleChangeForMobile = async () => {
    setIsMobileVisible(!isMobileVisible);
    dispatch(setLoader(false));
    try {
      const response = await toggleMobile();
      if (response && response.status === 200) {
        setMessage(response.data.message);
        
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
      }
    } finally {
      dispatch(setLoader(false));
    }
  }
  useEffect(() => {
    if (user && user.data && user.data.mobile) {
      const isHidden = /\*/.test(user.data.mobile);
      setIsMobileVisible(!isHidden);
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserProfile();
  }, []);

  return (
    <>
      <div id="setting-page">
        <div className="container mb-5">
          <div className="card shadow p-4 border border-info rounded">
            <div className="card-body">
              <div className="card-header bg-primary rounded">
              <h5 className="text-light">Settings</h5>
              </div>
             
              <ol className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className=" text-setting-page">Mobile</div>
                    <label className="text-muted">
                      Allow to show your contact number visible to others
                    </label>
                  </div>

                  <Switch
                    checked={isMobileVisible}
                    onChange={handleToggleChangeForMobile}
                  />

                </li>

              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Setting;
