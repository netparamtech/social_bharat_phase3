import { useEffect, useState } from "react";
import { fetchOneCommunity } from "../../services/AdminService";
import { useNavigate, useParams } from "react-router-dom";

const ViewOneCommunity = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchOneActiveCommunity = async () => {
    try {
      const response = await fetchOneCommunity(id);
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
    fetchOneActiveCommunity();
  }, []);

  return (
    <div id="auth-wrapper" className="pt-3 pb-5">
      <div className="container" id="font-Resize">
        <div className="row">
          <div className="col-lg-12">
            {data && data.length > 0 && (
              <>
                <div className="row mb-4">
                  <div className="col-6">
                    <label className="fw-bold text-black">Banner Image :</label>
                  </div>
                  <div className="col-6 text-center text-black">
                    <label className="fw-bold">Thumbnail Image :</label>
                  </div>
                  <div className="col-6">
                  <div className="card w-100 mx-auto p-3">
                    <img
                      src={data && data[0].banner_image}
                      className="img-fluid"
                      alt="Banner"
                    />
                    </div>
                  </div>
                  <div className="col-6 text-center">
                  <div className="card w-50 mx-auto p-3">
                    <img
                      src={data && data[0].thumbnail_image}
                      className="img-fluid"
                      alt="Banner"
                    />
                    </div>
                  </div>
                </div>

                <div className="row">
                <div className="col-12"> 
                  <label className="fw-bold text-black">Community Content :</label>
                </div>
                <div className="card shadow px-5 pb-3"
                  dangerouslySetInnerHTML={{
                    __html: data[0].community_archive,
                  }}
                />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOneCommunity;
