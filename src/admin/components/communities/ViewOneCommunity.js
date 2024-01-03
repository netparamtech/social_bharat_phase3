import { useEffect, useState } from "react";
import { fetchOneCommunity } from "../../services/AdminService";
import { useNavigate, useParams } from "react-router-dom";

const ViewOneCommunity = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [subcast, setSubcast] = useState('');
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  // const fetchOneActiveCommunity = async () => {
  //   try {
  //     const response = await fetchOneCommunity(id);
  //     if (response && response.status === 200) {
  //       setData(response.data.data);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       navigate("/admin");
  //     } else if (error.response && error.response.status === 500) {
  //       let errorMessage = error.response.data.message;
  //       navigate("/server/error", { state: { errorMessage } });
  //     }
  //   }
  // };



  // useEffect(() => {
  //   fetchOneActiveCommunity();
  // }, []);

  const handleSubmit = () => {

  }

  return (
    <div id="auth-wrapper" className="pt-3 pb-5">
      <div className="container" id="font-Resize">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="card">
              <div className="card-header text-light bg-success fs-5 fw-bold">Registered Subcasts</div>
              <div className="card-body">

              </div>

            </div>

          </div>

          <div className="col-12 col-sm-6">
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
                <button type="submit" className="btn btn-primary w-25 ">
                  Submit
                </button>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOneCommunity;
