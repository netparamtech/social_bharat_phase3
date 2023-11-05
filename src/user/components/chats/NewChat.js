import React, { useEffect, useRef, useState,useLayoutEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveMessage, sendMessage } from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { setLoader } from "../../actions/loaderAction";
import { Image } from "antd";

const NewChat = (props) => {
  const user = useSelector((state) => state.userAuth);

  const { changeChatFlag, selectedUser } = props;

  const [loggedID, setLoggedID] = useState("");
  const [receiverID, setReceiverID] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isSendClicked, setIsSendClicked] = useState(false);

  const [secondaryId, setSecondaryId] = useState("");
  const [loggedUserFirstLatter, setLoggedUserFirstLatter] = useState("");

  const [errors, setErrors] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseClick = () => {
    changeChatFlag(false);
  };

  const handleSendClicked = () => {
    setIsSendClicked(!isSendClicked);
  };

  const sendChatMessage = async () => {
    if (message) {
      dispatch(setLoader(true));
      const data = {
        receiver_id: selectedUser && selectedUser.id,
        message,
      };
      try {
        const response = await sendMessage(data);
        if (response && response.status === 200) {
          setServerError("");
          handleSendClicked();
          setMessage("");
          dispatch(setLoader(false));
        }
      } catch (error) {
        dispatch(setLoader(false));
        // Handle error
        if (error.response && error.response.status === 400) {
          setErrors(error.response.data.errors);
          setServerError("");
        }

        //Unauthorized
        else if (error.response && error.response.status === 401) {
          setServerError("");
          navigate("/login");
        }
        //Internal Server Error
        else if (error.response && error.response.status === 500) {
          setServerError("Oops! Something went wrong on our server.");
        }
      }
    }
  };

  const receiveChatMessage = async () => {
    dispatch(setLoader(true));
    try {
      const response = await receiveMessage(selectedUser.id);
      if (response && response.status === 200) {
        const sortedMessages = response.data.data
          .sort((a, b) => a.timestamp - b.timestamp)
          .reverse();
        setMessageList(sortedMessages);
        setServerError("");
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      // Handle error
      if (error.response && error.response.status === 401) {
        setServerError("");
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

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
      }
      return `${days} day ago`;
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      sendChatMessage();
    }
  };

  useEffect(() => {
    if (user && user.user) {
      setLoggedID(user && user.user.id);
      setLoggedUserFirstLatter(user.user.name.charAt(0).toUpperCase());
    }
  }, [user]);

  useEffect(() => {
    receiveChatMessage();
  }, [isSendClicked]);

  useEffect(() => {
    receiveChatMessage();
  }, [selectedUser]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

const chatMessagesContainerRef = useRef();

useEffect(() => {
    // Scroll to the end when the component mounts
    chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  useLayoutEffect(() => {
    // Scroll to the end whenever the messageList changes
    chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
  }, [messageList]);

  return (
    <div id="chat" className="new-chat-container">
      <main className="content mb-5">
        <div className="container p-0">
          <div className="card shadow mt-2">
            <div className="row g-0">
              <div className="col-12">
                <div className="py-2 px-4 border-bottom bg-primary">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      {selectedUser && selectedUser.photo ? (
                        <img
                          src={selectedUser && selectedUser.photo}
                          className="rounded-circle mr-1"
                          alt={selectedUser && selectedUser.photo}
                          width="40"
                          height="40"
                        />
                      ) : (
                        <button
                          type="button"
                          className="dropdown-user-img-letter m-2"
                        >
                          {selectedUser &&
                            selectedUser.name.charAt(0).toUpperCase()}
                        </button>
                      )}
                    </div>
                    <div className="flex-grow-1 pl-3 ms-2">
                      <strong className="fs-6 text-white">
                        {" "}
                        {selectedUser && selectedUser.name}
                      </strong>
                      {/* <div className="text-muted small ">
                                                <em className="text-white">Online</em>
                                            </div> */}
                    </div>
                    <div>
                      <span
                        className="btn fs-4  btn-whi close-button-chat"
                        onClick={handleCloseClick}
                        title="Close"
                      >
                        <i className="fa-regular fa-circle-xmark hover-pointer"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="position-relative">
                  <div className="chat-messages p-4" ref={chatMessagesContainerRef}>
                    {messageList &&
                      messageList.map((item, index) => (
                        <div key={index}>
                          {item.sender_id === user.user.id ? (
                            <div className="chat-message-right pb-4">
                              <div>
                                <img
                                  src={user.user.photo}
                                  className="rounded-circle mr-1 m-1"
                                  alt={user&&user.user.name}
                                  width="40"
                                  height="40"
                                />
                              </div>
                              <div className="flex-shrink-1 bg-right-msg rounded py-2 px-3 mr-3">
                                <div className="font-weight-bold text-dark">You</div>
                                <div className="p-0 m-0 font-messages">
                                  {item.message}
                                  <div className="text-muted  small text-nowrap">
                                    {calculateTimeDifference(item.timestamp)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="chat-message-left pb-4">
                              <div>
                                {selectedUser && selectedUser.photo ? (
                                  <img
                                    src={selectedUser.photo}
                                    className="rounded-circle mr-1 m-1"
                                    alt={selectedUser.name}
                                    width="40"
                                    height="40"
                                  />
                                ) : (
                                  <button
                                    type="button"
                                    className="dropdown-user-img-letter mr-1 m-2"
                                  >
                                    {selectedUser &&
                                      selectedUser.name.charAt(0).toUpperCase()}
                                  </button>
                                )}
                              </div>
                              <div className="flex-shrink-1 bg-white rounded py-2 px-3 ml-3">
                                <div className="font-weight-bold ">
                                  {selectedUser && selectedUser.name}
                                </div>
                                <div className="p-0 m-0 font-messages">
                                  {item.message}
                                  <div className="text-muted small text-nowrap ">
                                    {calculateTimeDifference(item.timestamp)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                         
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group sticky-bottom">
                    <input
                      type="text"
                      className="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleEnterKey}
                      placeholder="Type your message here..."
                      autoFocus
                    />
                    <button
                      className="btn btn-primary"
                      id="btn-chat"
                      onClick={sendChatMessage}
                      title="Send Message"
                    >
                      Send
                    </button>
                    <button
                      className="btn btn-primary"
                      id="btn-chat"
                      onClick={receiveChatMessage}
                      title="Refresh"
                    >
                      <i className="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewChat;
