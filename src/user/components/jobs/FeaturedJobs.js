import { Divider, Table } from "antd";
import { useEffect, useState } from "react";
import { applyJob, fetchFeaturedJobs } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { setLoader } from "../../actions/loaderAction";

const FeaturedJobs = () => {
  const user = useSelector((state) => state.userAuth);
  const defaultImage = "/user/images/netparamlogo.jpg";
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + "...."
      : description;
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  const handlePageSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };
  const checkPdf = (pdfString) => {
    if (pdfString.startsWith("uploads")) {
      return "";
    }
    return pdfString;
  }

  const columns = [
    {
      title: "Featured Jobs",
      dataIndex: "job_title",
      className: "mx-auto text-muted shadow fs-6",
      render: (text, record) => (
        <div
          className="services-hover hover-pointer"
        // onClick={() => navigate(`/users-basedOn-services/${record.title}`)}
        >
          <p className="text-muted mx-auto"> {record.company}</p>
          {
            checkPdf(record.logo) ? (
              <img
                src={record.logo ? record.logo : defaultImage}
                className=""
                width="70"
                height={70}
              />
            ) : ''
          }
          <div className="text-muted">
            <b>Job Title : </b>
            {record.job_title}
          </div>
          <Divider />
          <div className="row">
            <p className="truncate-text-job text-muted ">
              {truncateDescription(record.description, 250)}
            </p>

            <Divider />
            <p className="text-muted m-0"><b>Address :  </b>{record.location}</p>
            {/* <button type="button" className="btn btn-primary btn-sm">Apply</button> */}
            <div className="row mt-4">
              <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                <button type="button" className="btn btn-primary w-100" onClick={() => applyForAJobPosted(record)}
                  disabled={record.is_job_applied === 'false' ? false : true}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const fetchMyJobs = async () => {
    try {
      const response = await fetchFeaturedJobs();
      if (response && response.status === 200) {
        setDataSource(response.data.data);
        console.log(response.data.data);
        setTotalRows(response.data.data.length);
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

  const applyForAJobPosted = async (appliedJob) => {
    const data = {
      job_id: appliedJob.id,
      company: appliedJob.job_subheading,
      username: user.user.name,
      job_title: appliedJob.job_title,
      email: user.user.email ? user.user.email : "",
      mobile: user.user.mobile ? user.user.mobile : "",
    };
    try {
      dispatch(setLoader(true));
      const response = await applyJob(data);
      if (response && response.status === 201) {
        toast.success(`You successfully has applied for this job ${appliedJob.job_title}`);
        fetchMyJobs();
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 400) {
        // toast.error('"Application Error: You have already submitted an application for this job. Duplicate applications are not allowed. If you have any questions or concerns, please contact our support team."')
      } else if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <div>
      {serverError && <span className="error">{serverError}</span>}
      <Table
        // title={()=>'Featured '}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: page,
          pageSize: size,
          total: totalRows,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
        }}
        // onChange={handleTableChange}

        rowKey={(record) => record.id}
      // onChange={handleSearchChange}
      />
    </div>
  );
};
export default FeaturedJobs;
