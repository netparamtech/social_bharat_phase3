import { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { userAppliedForSameJob } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const UserAppliedJobModel = (props) => {
  const { jobId } = props;
  const [sideDraw, setSideDraw] = useState(false);
  const [data, setData] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [serverError, setServerError] = useState("");
  const [defaultImage, setDefaultImage] = useState(
    "/user/images/netparamlogo.jpg"
  );

  const navigate = useNavigate();

  const handleSideDrawClose = () => {
    setSideDraw(false);
  };
  const handleSideDrawOpen = () => {
    setSideDraw(true);
  };

  const getNameFirstLetter = (name) => {
    const nameArray = name.trim().split("");
    return nameArray[0];
  };

  const fetchMyJobs = async () => {
    try {
      const response = await userAppliedForSameJob(jobId);
      if (response && response.status === 200) {
        setData(response.data.data.jobs);
        setJobTitle(response.data.data.fetchJobTitle);
        setServerError("");
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  useEffect(() => {
    if (sideDraw) {
      fetchMyJobs();
    }
  }, [sideDraw]);

  return (
    <div>
      {serverError && <span className="error">{serverError}</span>}
      <a
        className="hover-pointer text-light text-decoration-none"
        onClick={handleSideDrawOpen}
      >
        Applied
      </a>
      <Offcanvas show={sideDraw} onHide={handleSideDrawClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{jobTitle && jobTitle}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {data &&
            data.map((item, index) => (
              <div className="row ">
              <div className="card">
              <div className="card-body">
              <div className="col-4"></div>
              <div className="col-8">
                <p>Name-{item.username ? item.username : ""}</p>
                <p>Mobile-{item.mobile ? item.mobile : ""}</p>
                <p>Email-{item.email ? item.email : ""}</p>
              </div>
            </div>
              </div>
                
              </div>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
export default UserAppliedJobModel;
