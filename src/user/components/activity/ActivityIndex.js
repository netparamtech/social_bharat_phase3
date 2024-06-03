import React, { useEffect, useState } from "react";
import {
  deleteSingleActivityById,
  fetchAllActivities,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { Avatar, Card, Carousel, Image, Modal } from "antd";
import { Divider, List, Skeleton, Statistic } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Meta from "antd/es/card/Meta";
import Search from "antd/es/input/Search";
import { NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { logout } from "../../actions/userAction";

const ActivityIndex = () => {
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [defaultImage, setDefaultImage] = useState("/admin/img/download.jpg");
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [isChat, setIsChat] = useState(false);
  const [isRefressed, setIsRefressed] = useState(false);
  const [isFilter, setIsFilter] = useState(!isAndroidUsed ? false : true);

  const loadMoreData = () => {
    setLoading(false);
    if (items.length < totalRows) {
      if (loading) {
        return;
      }
      setLoading(true);
      search(searchText, category, page, size);
    }
  };

  const changeChatFlag = (value) => {
    setIsChat(value);
  };
  const toggleFilter = () => {
    setIsFilter(!isFilter);
  }

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const deleteSingleActivity = async (activityId, userId) => {
    const isConfirmed = window.confirm("Do you want to delete the activity?");
    if (isConfirmed) {
      try {
        const response = await deleteSingleActivityById(activityId, userId);
        if (response && response.status === 200) {
          console.log(response.data.data);
          setItems(items.filter((item) => item.id !== activityId));
          setServerError("");
          toast.success("Deleted Activity Successfully");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
        //Internal Server Error
        else if (error.response && error.response.status === 500) {
          setServerError("Oops! Something went wrong on our server.");
        }
      }
    }
  };

  const search = async (searchText, category, page, size) => {
    dispatch(setLoader(false));
    try {
      const response = await fetchAllActivities(searchText, category, page, size);
      if (response && response.status === 200) {
        setTotalRows(response.data.data.totalRowsAffected);
        if (page === 1) {
          setItems(response.data.data.activities);
        } else {
          setItems([...new Set([...items, ...response.data.data.activities])]);
        }
        setPage(page + 1);
        setLoading(false);
        setServerError("");
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if the component is not just mounted
    search(searchText, category, 1, size);
  }, [searchText, category]);

  const groupedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    const pair = items.slice(i, i + 2); // Change 3 to 2 here
    groupedItems.push(pair);
  }

  const calculateTimeDifference = (updatedDate) => {
    const currentDate = new Date();
    const updatedDateObj = new Date(updatedDate);
    const differenceInSeconds = Math.floor(
      (currentDate - updatedDateObj) / 1000
    );

    if (differenceInSeconds < 1) {
      return "now";
    } else if (differenceInSeconds < 60) {
      return `${differenceInSeconds} sec ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      if (!days) {
        return "";
      } else if (days) {
        const months = Math.floor(days / 30);
        if (!months) {
          return `${days} day ago`;
        } else {
          const years = Math.floor(months / 12);
          if (!years) {
            return `${months} months ago`;
          } else {
            return `${years} years ago`;
          }
          return `${months} months ago`;
        }
      }
      return `${days} day ago`;
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const customTitle = (
    <div className="fs-2 text-light hover-pointer" onClick={showModal}>
      <i className="fas fa-ellipsis-v text-danger"></i>
    </div>
  );
  const searchIcon = (
    <div>
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  );

  const parseDescription = (description) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const phoneRegex = /[0789]\d{9,}/g;

    // Split the description by URLs and phone numbers, maintaining delimiters
    const parts = description.split(new RegExp(`(${urlRegex.source}|${phoneRegex.source})`, 'g'));

    return parts.map((part, index) => {
      if (part && urlRegex.test(part)) {
        return (
          <a key={index} href={part} style={{ color: "blue" }} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else if (part && phoneRegex.test(part)) {
        return (
          <a key={index} href={`tel:${part}`} style={{ color: "green" }}>
            {part}
          </a>
        );
      } else {
        return part;
      }
    });
  };
  useEffect(() => {
    const handleResize = () => {
      setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the correct value

    // Cleanup the event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="activity-post-section" className="content-wrapper  mb-4">
      <div className="container pt-4" id="">
        <div className="card shadow card-search">
          <div className="card-header mx-auto">
            <h4 > ACTIVITIES</h4>

          </div>

          <div className=" container">
            <div className="row d-flex justify-content-between">

            </div>

          </div>


          <div className="row m-2">
            {serverError && <span className="error m-2">{serverError}</span>}
            <div className="col-12 col-md-4">

              <div className="row mx-auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px', alignContent: 'center' }}>
                <div className="col-md-8 col-12" >
                  <button type="button" style={{ borderRadius: '10px', marginBottom: '10px' }} onClick={toggleFilter}>Filter More</button>
                  <Search
                    classNames=""
                    placeholder="input search text"
                    allowClear
                    enterButton={searchIcon}
                    size="large"
                    onChange={handleSearchText}
                  />
                </div>
                <div className="col-md-12 col-12">
                  <button
                    className="btn bg-darkskyblue btn-success btn-sm small hover-pointer btn-post-activity"
                    onClick={() => navigate("/user/post-activity")}
                  >
                    Post Your Activity
                  </button>
                </div>
                {
                  isFilter ? (
                    <>
                      <div className="bg-success text-light mx-auto" style={{ borderRadius: '10px' }}>You Can Choose Your Interesting Field</div>
                      <div className="activities-filter-container mx-auto" style={{ overflow: 'scroll', height: '200px' }}>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('')}>All</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Information Technology')}>Information Technology</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Sports')}>Sports</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Sales')}>Sales</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Marketing')}>Marketing</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Manufacturing')}>Manufacturing</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Service')}>Service</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Finance')}>Finance</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Real Estate')}>Real Estate</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Healthcare')}>Healthcare</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Transportation and Logistics')}>Transportation and Logistics</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Hospitality')}>Hospitality</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Education')}>Education</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Nonprofit Organization')}>Nonprofit Organization</p>
                        <p className="hover-pointer hover-pointer-green" onClick={() => setCategory('Other')}>Other</p>
                      </div>
                    </>
                  ) : ''
                }

                <div className="col-md-12 col-12 mb-2">
                  <button
                    className="btn bg-warning btn-success btn-sm small hover-pointer btn-post-activity"
                  >
                    Manage Your Activity
                  </button>
                </div>

              </div>

            </div>
            <div className="col-12 col-md-6 mx-auto" style={{ border: '1px solid gray', borderRadius: '10px' }}>
              <div className="mx-auto text-primary" style={{ borderRadius: '10px' }}>You Are Searching In - {category ? category : ''}</div>

              <div className="" id="scrollableDiv1"
                style={{
                  height: 400,
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}>

                <InfiniteScroll
                  dataLength={items.length}
                  next={loadMoreData}
                  hasMore={items.length < totalRows}
                  loader={
                    <Skeleton
                      avatar
                      paragraph={{
                        rows: 1,
                      }}
                      active
                    />
                  }
                  endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                  scrollableTarget="scrollableDiv1"
                >
                  <div className="container pw-20 mt-3">
                    {groupedItems.map((pair, index) => (
                      <div className="row">
                        {pair &&
                          pair.map((item, idx) => (
                            <div className="col-12" key={idx}>
                              <div className=" position-relative">
                                <div className="search-partner-cards">
                                  <Card
                                    className="  mb-1"
                                    style={{ height: item.photo ? '500px' : '' }}
                                  >
                                    <div className="d-flex justify-content-between">
                                      <Meta
                                        avatar={
                                          item.user_profile ? (
                                            <Avatar
                                              src={item.user_profile}
                                              alt={item.name}
                                              size="large"
                                              className="custom-font"
                                            />
                                          ) : (
                                            <button
                                              type="button"
                                              className="dropdown-user-img-letter m-2"
                                            >
                                              {item.name
                                                .charAt(0)
                                                .toUpperCase()}
                                            </button>
                                          )
                                        }
                                        title={item.name}
                                        description={calculateTimeDifference(
                                          item.updated_at
                                        )}
                                      />

                                      <NavDropdown
                                        title={customTitle}
                                        id="basic-nav-dropdown"
                                        disabled={
                                          user.user.id === item.user_id
                                            ? false
                                            : true
                                        }
                                      >
                                        <NavDropdown.Item
                                          className="hover-pointer"
                                          onClick={() =>
                                            navigate(
                                              `/user/activity/update/${item.id}`
                                            )
                                          }
                                          disabled={
                                            user.user.id === item.user_id
                                              ? false
                                              : true
                                          }
                                        >
                                          Edit Activity
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                          className="hover-pointer"
                                          onClick={() =>
                                            deleteSingleActivity(
                                              item.id,
                                              item.user_id
                                            )
                                          }
                                          disabled={
                                            user.user.id === item.user_id
                                              ? false
                                              : true
                                          }
                                        >
                                          Delete Activity
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#">
                                          Manage Your Activities
                                        </NavDropdown.Item>
                                      </NavDropdown>
                                    </div>
                                    <div className="fs-4 m-2 ">{item.title}</div>

                                    {item.photo &&
                                      Array.isArray(item.photo) &&
                                      item.photo.length > 0 ? (
                                      <div className="photo-container mt-2 dotted-border-carousel">
                                        <Carousel
                                          className="photo-carousel"
                                          dotPosition="bottom"
                                          autoplay
                                          effect="fade"
                                        >
                                          {item.photo.map((photo, photoIdx) => (
                                            <div key={photoIdx}>
                                              <Image
                                                src={photo}
                                                alt={`Photos ${photoIdx + 1}`}
                                                className="carousel-image"
                                                style={{ top: '0', left: '0', width: '100%', height: '400px', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }}
                                              />
                                            </div>
                                          ))}
                                        </Carousel>
                                      </div>
                                    ) : item.photo ? (
                                      <Image
                                        src={item.photo}
                                        alt={`Photos ${idx + 1}`}
                                        className="card-img-top m-2"
                                        style={{
                                          height: "300px",
                                          width: "100%",
                                          objectFit: "contain",
                                        }}
                                      />
                                    ) : (
                                      <div className="card card-body mt-2 border-0 mb-2">
                                        <div className="px-5 pb-3 mt-5"
                                          dangerouslySetInnerHTML={{
                                            __html: item.description,
                                          }}
                                        />
                                      </div>
                                    )}

                                  </Card>
                                  <div className="card card-body mt-2 border-0 mb-2">
                                    {item.photo ? (
                                      <div className="px-5 pb-3 mt-5"
                                        dangerouslySetInnerHTML={{
                                          __html: item.description,
                                        }}
                                      />
                                      // <p
                                      //   className=" text-justify custom-activity-description"
                                      //   style={{ overflowY: "scroll" }}
                                      // >
                                      //   {parseDescription(item.description)}
                                      // </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default ActivityIndex;
