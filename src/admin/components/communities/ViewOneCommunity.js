import { useEffect, useState } from "react";
import { fetchOneCommunity } from "../../services/AdminService";
import { useNavigate, useParams } from "react-router-dom";

const ViewOneCommunity = () => {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchOneActiveCommunity = async () => {
    try {
      const response = await fetchOneCommunity(name);
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
    <>
      <div className="container" id="view-community-detail">
        <div className="banner mb-4"></div>
        <div className="text-content">
          {data.length > 0 && (
            <div
              dangerouslySetInnerHTML={{ __html: data[0].community_archive }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ViewOneCommunity;
