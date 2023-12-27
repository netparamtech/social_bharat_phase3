import React, { useEffect, useState } from "react";
import {
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
  searchPeopleInService,
  searchPeopleWithSearchText,
} from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import { setLoader } from "../../actions/loaderAction";
import { Image } from "antd";
import NewChat from "../chats/NewChat";

const SearchUsersWithService = () => {
  const { title } = useParams();
  const user = useSelector((state) => state.userAuth);

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage, setDefaultImage] = useState(
    "/admin/img/download.jpg"
  );

  const [isSearchingPerformed, setIssearchingPerformed] = useState(false);

  //to show state and city according to user search

  const [isGoClick, setIsGoClick] = useState(false);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [isChat, setIsChat] = useState(false);

  const changeChatFlag = (value) => {
    setIsChat(value);
  };

  const handleChatclick = (item) => {
    setIsChat(true);
    setSelectedUser(item);
  };

  useEffect(() => {
    if (items.length > 0) {
      setIssearchingPerformed(true);
    }
  }, [items]);

  const fetchMoreData = () => {
    if (!isLoading && items.length < totalRows) {
      search(page + 1, 20);
      setPage(page + 1);
    }
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const search = async (page, size) => {
    setIsLoading(true);
    dispatch(setLoader(true));
    try {
      const response = await searchPeopleInService(
        searchText,
        page,
        size,
        title
      );

      if (response && response.status === 200) {
        setServerError("");
        setTotalRows(response.data.data.totalRowsFetched);
        if (response.data.data.users.length === 0) {
          setIssearchingPerformed(false);
        }
        if (searchText) {
          if (response.data.data.users.length !== 0) {
            if (page === 1) {
              setItems([...new Set([...response.data.data.users])]);
            } else {
              setItems([...new Set([...items, ...response.data.data.users])]);
            }
            setTotalRows(response.data.data.totalRowsFetched);
          } else {
            setItems([...response.data.data.users]);
            setTotalRows(response.data.data.totalRowsFetched);
          }
        } else {
          if (isGoClick) {
            if (page === 1) {
              setItems([...new Set([...response.data.data.users])]);
            } else {
              setItems([...new Set([...items, ...response.data.data.users])]);
            }
          } else {
            const combinedItems = [...items, ...response.data.data.users];
            const uniqueItems = [];

            for (const item of combinedItems) {
              if (!uniqueItems.some((u) => u.id === item.id)) {
                uniqueItems.push(item);
              }
            }

            setItems(uniqueItems);
          }
        }
        dispatch(setLoader(false));
      }
      setIsLoading(false);
    } catch (error) {
      dispatch(setLoader(false));
      setIsLoading(false);
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  const handleScrollToUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    search(1, 20);
  }, [user]);

  useEffect(() => {
    // Check if the component is not just mounted
    if (page > 1 || searchText || !searchText) {
      search(page, 20);
    }
  }, [searchText, isGoClick, page]);

  useEffect(() => {
    setPage(1);
  }, [searchText]);

  const groupedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    const pair = items.slice(i, i + 2); // Change 3 to 2 here
    groupedItems.push(pair);
  }

  const checkMobileVisibility = (mobileNumber) => {
    const isHidden = /\*/.test(mobileNumber);
    return !isHidden;
  };

  return (
    <>
      {isChat ? (
        <NewChat changeChatFlag={changeChatFlag} selectedUser={selectedUser} />
      ) : (
        <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">
          <div className="container">
            <div className="card shadow card-search">
              <div className="card-header bg-success">
                <div className="d-sm-flex align-items-center justify-content-between text-light">
                  {title}
                  <a className="d-sm-inline-block btn btn-sm btn-primary shadow-sm hover-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/user/user-registered-services')
                    }}
                  >
                    My Registered Services
                  </a>
                  <a className="d-sm-inline-block btn btn-sm btn-primary shadow-sm hover-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/user/search/service')
                    }}
                  >
                    View All Services/Create
                  </a>
                </div>
              </div>
              <div className="card-body">
                {serverError && <span className="error">{serverError}</span>}


                {!isSearchingPerformed ? (
                  <span className="error">No Data Available</span>
                ) : (
                  ""
                )}

                <div className="container-input mb-3">
                  <input
                    type="text"
                    placeholder="Search"
                    name="text"
                    className="input form-control"
                    value={searchText}
                    onChange={handleSearchText}
                  />
                  <i className="fas fa-search"></i>
                </div>

                <div className="row">
                  {/* Repeat the user card structure as needed */}
                  <InfiniteScroll
                    style={{ overflowX: "hidden" }}
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={items.length < totalRows}
                    loader={isLoading && <h4>Loading...</h4>}
                  >
                    <div className="container pw-20">
                      {groupedItems.map((pair, index) => (
                        <div className="row" key={index}>
                          {pair.map((item, innerIndex) => (
                            <div className="col-md-6" key={innerIndex}>
                              <div className="card shadow mb-2">
                                <div className="card-header">{item.title}</div>
                                <div className="card-body">
                                  <div className="row wow animate__animated animate__zoomIn">
                                    <div className="col-4">
                                      <Image
                                        src={
                                          item.photo ? item.photo : defaultImage
                                        }
                                        alt={item.name}
                                        title={item.name}
                                        className="avatar img-fluid img-circle"
                                      />

                                      <div
                                        className="text-start ms-3 mt-2 hover-pointer"
                                        onClick={() => handleChatclick(item)}
                                      >
                                        <img
                                          src="/user/images/chat-icon.jpg"
                                          width="40px"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-6 user-detail">

                                      <div className="col-12 user-detail">
                                        <p>Name-{item.name}</p>
                                        <p>Service At-{item.location}</p>
                                        <p>Experience-{item.experience}</p>
                                        {/* <p>{item.state ? `(${item.state})` : ""}</p> */}
                                        <p className="d-flex">
                                          Contact Numbers:
                                          <a href={`tel:${item.mobile1}`}>
                                            {item.mobile1}
                                          </a>
                                          {item.mobile2 ? (
                                            <>
                                              ,{" "}
                                              <a href={`tel:${item.mobile2}`}>
                                                {item.mobile2}
                                              </a>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                          {
                                            checkMobileVisibility(item.masked_mobile) ? (
                                              <p>
                                                <a href={`tel:${item.masked_mobile}`}>
                                                  ,{item.masked_mobile}
                                                </a>
                                              </p>
                                            ) : ''
                                          }

                                        </p>{" "}
                                        <p>
                                          Occupation-
                                          {item.occupation
                                            ? item.occupation
                                            : "N/A"}
                                        </p>

                                        <p>
                                          Education-
                                          {item.highest_qualification
                                            ? item.highest_qualification
                                            : "N/A"}
                                        </p>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-footer">Description-{item.description}</div>
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
      )}
      <div className={`scroll-to-up ${isChat ? "d-none" : ""}`}>
        <a
          className="btn btn-primary btn-sm me-2 mb-2 hover-pointer"
          id=""
          onClick={handleScrollToUp}
          title="Refresh"
        >
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </a>
      </div>
    </>
  );
};

export default SearchUsersWithService;
