import { useEffect, useState } from "react";
import { deleteMatrimonialDetailsById, fetchMatrimonialInfo, toggleMatrimonial } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import GenerateBiodata from "./GenerateBiodata";
import { logout } from "../../actions/userAction";
import MatrimonialCard from "./MatrimonialCard";
import { Image } from 'antd';

const MatrimonialInfo = () => {
  const [matrimonialDetails, setMatrimonialDetails] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [isShowMatrimonial, setIsShowMatrimonial] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [serverError, setServerError] = useState('');
  const [defaultImage, setDefaultImage] = useState(
    "/admin/img/download.jpg"
  );

  const searchIcon = "/user/images/search-icon.png";

  const handleIsSearchClicked = () => {
    setIsSearch(!isSearch);
  }
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    if (searchText || !searchText) {
      const filteredData = copyData.filter(item =>
        item.matrimonial_profile_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setMatrimonialDetails(filteredData);
    }
  }, [searchText]);

  function getRandomColor() {
    const colors = ["#6c757d", "#afeeee", "#8b4513", "#ff69b4", "#ffa07a", "#90ee90", "#a0522d", "#000080"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMatrimonialShow = () => {
    setIsShowMatrimonial(!isShowMatrimonial);
  }

  const deleteMatrimonialDetails = async (id) => {
    dispatch(setLoader(true));
    try {
      const response = await deleteMatrimonialDetailsById(id);
      if (response && response.status === 200) {
        fetchMatrimonialDetails();
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
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



  const fetchMatrimonialDetails = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchMatrimonialInfo();
      if (response && response.status === 200) {
        setMatrimonialDetails(response.data.data);
        setCopyData(response.data.data);
      }

    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    } finally {
      dispatch(setLoader(false));
    }
  }
  const handleMatrimonialToggleStatus = async (id) => {
    try {
      const response = await toggleMatrimonial(id);
      if (response && response.status === 200) {
        fetchMatrimonialDetails();
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  useEffect(() => {
    if (!isSearch) {
      setSearchText('');
    }
  }, [isSearch]);

  useEffect(() => {
    fetchMatrimonialDetails()
  }, []);

  const age = (dob) => {
    if (dob !== null) {
      const dobDate = new Date(dob);
      const currentDate = new Date();

      // Calculate the age in years
      const ageInMilliseconds = currentDate - dobDate;
      const ageInYears = Math.floor(
        ageInMilliseconds / (1000 * 60 * 60 * 24 * 365)
      );

      return ageInYears;
    }
    return "N/A";
  };

  return (
    <div id="matrimonial-section" className="content-wrapper pt-4">
      <div className="container">

        <div className="card shadow">


          <div className="card-header d-flex flex-wrap justify-content-between align-items-center">

            <h5 className="fw-3 mb-3 text-primary">Matrimonial Info</h5>
            <div className="hover-pointer" style={{ border: isSearch ? '1px solid black' : '' }} onClick={handleIsSearchClicked}>
              <img src={searchIcon} width={40}></img>
            </div>
            {/* {matrimonialDetails && matrimonialDetails.length > 0 && <GenerateBiodata userData={matrimonialDetails} />} */}
            {isShowMatrimonial && copyData.length > 0 && (
              <div className="d-flex align-items-center">
                {/* Add a button to trigger PDF generation */}
                <button className='me-3 mb-3 rounded bg-secondary text-light mt-2' onClick={handleMatrimonialShow}>Hide Matrimonial Info</button>

              </div>
            )}

            <a className="hover-pointer" title="Add More Detail" onClick={() => navigate("/user/create-matrimonial-profile")}>
              <i className="btn btn-outline-info fas fa-plus"></i>
            </a>
          </div>
          {serverError && <p className="fs-4 text-danger">{serverError}</p>}
          <div className="row m-2" style={{ maxHeight: '400px', overflow: 'scroll' }}>
            {
              isSearch && (
                <div className="col-xl-3 col-md-6 mb-4" style={{ position: 'absolute', zIndex: 9999, transition: 'height 0.8s' }}>
                  <div className="input-group rounded">
                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={handleSearchText} />
                    <span className="input-group-text border-0" id="search-addon">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
              )
            }
            {
              matrimonialDetails && matrimonialDetails.length > 0 && (

                matrimonialDetails && matrimonialDetails.length > 0 && isShowMatrimonial ? matrimonialDetails.map((item, index) => (

                  <div className="col-11 col-md-4 mb-4 mx-auto mt-2">

                    <div className={`card h-100`} >
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="me-3">
                            <div className="text-white-75 fs-6 text-wrap-break-word">{item.matrimonial_profile_name}</div>



                          </div>
                          {/* <img src="/user/images/searchPeople.png" width="40px" /> */}
                          {
                            item.proposal_photos && item.proposal_photos.length > 0 ?
                              (
                                Array.isArray(item.proposal_photos) ? <Image
                                  src={item.proposal_photos[0]}
                                  alt={item.matrimonial_profile_name}
                                  className="img-fluid"
                                  style={{ width: '40px', height: '40px', borderRadius: '10px' }}
                                /> : <Image
                                  src={item.proposal_photos}
                                  alt={item.matrimonial_profile_name}
                                  className="img-fluid"
                                  style={{ width: '40px', height: '40px', borderRadius: '10px' }}
                                />
                              ) : <img
                                src={defaultImage}
                                alt={item.matrimonial_profile_name}
                                className="img-fluid"
                                style={{ width: '40px', height: '40px', borderRadius: '10px' }}
                              />
                          }

                        </div>

                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-between small">
                        {item && <GenerateBiodata userData={item} />}
                      
                        <div className="">
                          <MatrimonialCard item={item} />
                          <a className='hover-pointer m-2' onClick={() => navigate(`/user/update-matrimonial-profile/${item.id}`)} title="Edit">
                            <i className="text-light fas fa-pencil-alt"></i>
                          </a>
                          <a className='hover-pointer m-2' onClick={() => handleMatrimonialToggleStatus(item.id)} title="Edit">

                            {
                              item.status === 'Active' ? (
                                <i
                                  className="text-warning fa fa-thumbs-up"
                                  title="Active"
                                />
                              ) : (
                                <i
                                  className="fa fa-thumbs-down  text-danger"
                                  title="Inactive"
                                />
                              )
                            }
                          </a>
                          <a className='hover-pointer' onClick={() => deleteMatrimonialDetails(item.id)} title="Delete">
                            <i className="text-danger fas fa-trash"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>

                )) : (
                  <div className="card-body">
                    <div className="add-more-info ">
                      <a
                        className="btn btn-secondary hover-pointer"
                        onClick={handleMatrimonialShow}
                      >
                        Show Matrimonial Info
                      </a>
                    </div>
                  </div>
                )

              )
            }
          </div>

          {
            copyData && copyData.length === 0 && (
              <div className="card-body">
                <div className="add-more-info ">
                  <a
                    className="btn btn-secondary hover-pointer"
                    onClick={() => navigate("/user/create-matrimonial-profile")}
                  >
                    Add Matrimonial Info
                  </a>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default MatrimonialInfo;
