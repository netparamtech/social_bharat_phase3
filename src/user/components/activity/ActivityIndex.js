import React, { useEffect, useState } from "react";
import {
  deleteSingleActivityById,
  fetchAllActivities,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { setLoader } from "../../actions/loaderAction";
import { Avatar, Card, Carousel, Image, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import Search from "antd/es/input/Search";
import { NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";

const ActivityIndex = () => {
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [defaultImage, setDefaultImage] = useState("/admin/img/download.jpg");

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [isChat, setIsChat] = useState(false);
  const [isRefressed, setIsRefressed] = useState(false);

  const changeChatFlag = (value) => {
    setIsChat(value);
  };

  const fetchMoreData = () => {
    if (!isLoading && items.length < totalRows) {
      search(searchText, page + 1, 20);
      setPage(page + 1);
    }
  };

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

  const search = async (searchText, page, size) => {
    setIsLoading(true);
    dispatch(setLoader(true));
    try {
      const response = await fetchAllActivities(searchText, page, size);

      if (response && response.status === 200) {
        console.log(response.data.data.totalRowsAffected);
        setTotalRows(response.data.data.totalRowsAffected);
        setServerError("");

        if (searchText) {
          if (response.data.data.activities.length !== 0) {
            if (page === 1) {
              setItems([...new Set([...response.data.data.activities])]);
            } else {
              setItems([
                ...new Set([...items, ...response.data.data.activities]),
              ]);
            }

            setTotalRows(response.data.data.totalRowsAffected);
          } else {
            if (page === 1) {
              setItems([...new Set([...response.data.data.activities])]);
            } else {
              setItems([
                ...new Set([...items, ...response.data.data.activities]),
              ]);
            }
            setTotalRows(response.data.data.totalRowsAffected);
          }
        } else {
          const combinedItems = [...items, ...response.data.data.activities];
          const uniqueItems = [];

          for (const item of combinedItems) {
            if (!uniqueItems.some((u) => u.id === item.id)) {
              uniqueItems.push(item);
            }
          }

          setItems(uniqueItems);
        }
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    // Check if the component is not just mounted
    search(searchText, page, 20);
  }, [searchText]);

  useEffect(() => {
    setPage(1);
  }, [searchText]);

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
      <i className="fas fa-ellipsis-v"></i>
    </div>
  );
  const searchIcon = (
    <div>
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  );

  return (
    <div id="searchPeople-section" className="content-wrapper  mb-4">
      <div className="container" id="service-section">
        <div className="card shadow card-search">
          <div className="card-header mx-auto mt-2 fs-3 fw-bold mb-3">
            ACTIVITIES
          </div>

          <div className=" container">
          <div className="row d-flex justify-content-between">
          <div className="mt-2 col-lg-10 col-12">
            <Search
              classNames="w-100"
              placeholder="input search text"
              allowClear
              enterButton={searchIcon}
              size="large"
              onChange={handleSearchText}
            />
          </div>
          <div className="col-lg-2 col-12 mt-2 mt-lg-0">
            <button
              className="btn bg-darkskyblue btn-success btn-sm small hover-pointer btn-post-activity"
              onClick={() => navigate("/user/post-activity")}
            >
              Post Your Activity
            </button>
          </div>
        </div>
        
          </div>
          {serverError && <span className="error">{serverError}</span>}

          <div className="row">
            {/* Repeat the user card structure as needed */}
            <InfiniteScroll
              style={{ overflowX: "hidden" }}
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={items.length < totalRows}
              loader={isLoading && <h4>Loading...</h4>}
            >
              <div className="container pw-20 mt-3">
                {groupedItems.map((pair, index) => (
                  <div className="row">
                    {pair &&
                      pair.map((item, idx) => (
                        <div className="col-md-6 col-sm-6 col-12" key={idx}>
                          <div className=" position-relative">
                            <div className="">
                              <Card
                                className=" bg-darkskyblue mb-1"
                                style={{ height: "375px" }}
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
                                          {user.user.name
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
                                            style={{
                                              height: "200px",
                                              width: "100%",
                                              objectFit: "contain",
                                            }}
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
                                  <p className="fs-4 m-2 text-light">
                                    {item.DESCRIPTION}
                                  </p>
                                )}
                                <div className="">
                                  {item.photo ? (
                                    <p
                                      className=" text-justify"
                                      style={{ overflowY: "scroll" }}
                                    >
                                      {item.DESCRIPTION}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Card>
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
  );
};

export default ActivityIndex;
