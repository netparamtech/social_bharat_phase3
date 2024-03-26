import { useEffect, useState } from "react";
import { createSubcast, fetchAllSubcastsInOneCommunity, fetchOneCommunity } from "../../services/AdminService";
import { useNavigate, useParams } from "react-router-dom";
import UpdateSubcastCommunityForm from "./UpdateSubcastCommunityForm";
import { Divider } from "antd";

const ViewOneCommunity = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [subcast, setSubcast] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [subcastId, setSubcastId] = useState('');
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const handleSubcastClicked = (value, id) => {
    setIsClicked(value);
    console.log(id)
    setSubcastId(id);
  }

  const fetchAllSubcasts = async () => {
    try {
      const response = await fetchAllSubcastsInOneCommunity(id);
      if (response && response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };


  useEffect(() => {
    fetchAllSubcasts();
    setErrors('');
  }, [isClicked]);

  const handleSubmit = async () => {
    const data = {
      community_id: id,
      subcast: subcast.toUpperCase(),
    }
    try {
      const response = await createSubcast(data);
      if (response && response.status === 201) {
        fetchAllSubcasts();
        setErrors('');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  }

  return (
    <div id="auth-wrapper" className="pt-3 pb-5">
      <div className="container" id="font-Resize">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="card">
              <div className="card-header text-light bg-success fs-5 fw-bold">Registered Subcasts</div>
              <div className="card-body">
                <div className="" style={{height:'500px',overflow:"scroll"}}>
                  {
                    data.map((item, index) => (
                      <>
                        <li key={index} className="hover-pointer-admin hover-pointer-admin-green fs-5 fw-bold" onClick={() => handleSubcastClicked(true, item.subcast_id)}>{item.subcast}</li>
                        <Divider />
                      </>
                    ))
                  }
                </div>

              </div>

            </div>

          </div>

          <div className="col-12 col-sm-6 mt-2">
            {
              !isClicked ? (
                <div className="card">
                  <div className="card-header bg-success text-light fs-5 fw-bold">
                    Add Subcast
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="fw-bold">Subcast</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={subcast}
                        onChange={(e) => setSubcast(e.target.value)}
                        placeholder="Enter Subcast Name"
                      />
                      {errors.subcast && <span className="error">{errors.subcast}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary w-25 " onClick={handleSubmit}>
                      Submit
                    </button>
                    <button type="submit" className="btn btn-primary m-2 " onClick={() => navigate('/admin/communities')}>
                      View All Communities
                    </button>

                  </div>

                </div>
              ) : (
                <UpdateSubcastCommunityForm handleSubcastClicked={handleSubcastClicked} id={id} subcastId={subcastId} />
              )
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOneCommunity;
