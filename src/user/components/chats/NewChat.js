import React, { useEffect, useState } from "react";
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
      console.log(data);
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
    console.log(selectedUser, "selectedUser");
    try {
      const response = await receiveMessage(selectedUser.id);
      if (response && response.status === 200) {
        console.log(response.data);
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
    console.log(selectedUser);
    receiveChatMessage();
  }, [selectedUser]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div id="chat">
      <main class="content mb-5">
        <div class="container p-0">
          <div class="card mt-2">
            <div class="row g-0">
              <div class="col-12    ">
                <div class="py-2 px-4 border-bottom">
                  <div class="d-flex align-items-center py-1">
                    <div class="position-relative">
                      {user && user.user && user.user.photo ? (
                        <img
                          src={user.user.photo}
                          class="rounded-circle mr-1"
                          alt={user && user.user.name}
                          width="40"
                          height="40"
                        />
                      ) : (
                        <button
                          type="button"
                          className="dropdown-user-img-letter m-2"
                        >
                          {loggedUserFirstLatter}
                        </button>
                      )}
                    </div>
                    <div class="flex-grow-1 pl-3 ms-2">
                      <strong class="fs-6 text-white">
                        {" "}
                        {user && user.user && user.user.name}
                      </strong>
                      <div class="text-muted small ">
                        <em class="text-white">Online</em>
                      </div>
                    </div>
                    <div>
                  
                        
                          <span
                            class="btn fs-4  btn-whites close-button-chat"
                            onClick={handleCloseClick}
                            title="Close"
                          >
                            <i class="fa-regular fa-circle-xmark hover-pointer"></i>
                          </span>
                        
                      
                    </div>
                  </div>
                </div>

                <div class="position-relative">
                  <div class="chat-messages p-4">
                    {messageList &&
                      messageList.map((item, index) => (
                        <>
                          {item.sender_id === user.user.id ? (
                            <div class="chat-message-right pb-4">
                              <div>
                                <img
                                  src={user.user.photo}
                                  class="rounded-circle mr-1 m-1"
                                  alt="Chris Wood"
                                  width="40"
                                  height="40"
                                />
                                
                              </div>
                              <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                <div class="font-weight-bold ">You</div>
                                <p class="p-0 m-0 font-messages">
                                  {item.message}
                                  <div class="text-muted small text-nowrap">
                                  {calculateTimeDifference(item.timestamp)}
                                </div>
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div class="chat-message-left pb-4">
                              <div>
                                {selectedUser && selectedUser.photo ? (
                                  <img
                                    src={selectedUser.photo}
                                    class="rounded-circle mr-1 m-1"
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
                              <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                <div class="font-weight-bold ">
                                  {selectedUser && selectedUser.name}
                                </div>
                                <p class="p-0 m-0 font-messages">
                                  {item.message}
                                  <div class="text-muted small text-nowrap ">
                                  {calculateTimeDifference(item.timestamp)}
                                </div>
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      ))}
                  </div>
                </div>

                <div class="flex-grow-0 py-3 px-4 border-top">
                  <div class="input-group sticky-bottom">
                    <input
                      type="text"
                      class="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleEnterKey}
                      placeholder="Type your message here..."
                      autoFocus
                    />
                    <button
                      class="btn btn-primary"
                      id="btn-chat"
                      onClick={sendChatMessage}
                      title="Send Message"
                    >
                      Send
                    </button>
                    <button
                      class="btn btn-primary"
                      id="btn-chat"
                      onClick={receiveChatMessage}
                      title="Refresh"
                    >
                      <i class="fa fa-refresh" aria-hidden="true"></i>
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
