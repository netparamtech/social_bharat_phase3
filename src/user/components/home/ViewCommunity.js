import { useParams } from "react-router-dom";
import { fetchCommunityWithNAME } from "../../services/userService";
import { useEffect, useState } from "react";

const ViewCommunity = () => {
    const { name } = useParams();
    const [data, setData] = useState({});
    const fetchCommunity = async () => {
        try {
            const response = await fetchCommunityWithNAME(name)
            if (response && response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchCommunity();
    }, []);
    return (
        <div id="auth-wrapper" className="pt-5 pb-5">
        <div className="container">
          <div className="mx-auto">
            <div className="">
              <div className="row">
                <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
                  <div className="text-center">
                    <img src={data.banner_image} className="img-fluid" alt="Banner" />
                  </div>
                  {data && (
                    <div
                      dangerouslySetInnerHTML={{ __html: data.community_archive }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default ViewCommunity;