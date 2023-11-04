import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveMessage, sendMessage } from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { setLoader } from "../../actions/loaderAction";
import { Image } from "antd";

const Chat = (props) => {
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
    <div class="container " id="chat">
      <div class="row mb-5 ">
        <div class="col-md-6 mx-auto">
          <div class="card">
            <div class="card-header text-bg-primary">
              <span
                class="m-2 btn btn-danger close-button-chat"
                onClick={handleCloseClick}
              >
                <i class="fa-solid fa-x hover-pointer"></i>
              </span>
              <span class="glyphicon glyphicon-comment"></span> Chat
              <span class="m-5">{user && user.user && user.user.name}</span>
              <span class="m-2">
                {" "}
                {user && user.user && user.user.photo ? (
                  <Image
                    src={user.user.photo}
                    alt={user && user.user.name}
                    size="small"
                    className="dropdown-user-img me-2"
                    width={50}
                  />
                ) : (
                  <button
                    type="button"
                    className="dropdown-user-img-letter m-2"
                  >
                    {loggedUserFirstLatter}
                  </button>
                )}
              </span>
            </div>
            <div class="card-body overflow-y-scroll">
              {serverError && <span className="error">{serverError}</span>}
              <ul class="list-group ">
                {messageList &&
                  messageList.map((item, index) => (
                    <>
                      {item.sender_id === user.user.id ? (
                        <li class="list-group-item text-end align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">
                              {user && user.user && user.user.name}
                            </div>
                            {item.message}
                          </div>
                          <span class="badge bg-primary rounded-pill text-muted">
                            <i class="bi bi-clock"></i>{" "}
                            {calculateTimeDifference(item.timestamp)}
                          </span>
                        </li>
                      ) : (
                        <li class="list-group-item  text-start  align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">
                              {selectedUser && selectedUser.name}
                            </div>
                            {item.message}
                          </div>
                          <span class="badge bg-success rounded-pill text-muted">
                            <i class="bi bi-clock "></i>
                            {calculateTimeDifference(item.timestamp)}
                          </span>
                        </li>
                      )}
                    </>
                  ))}
              </ul>
            </div>

            <div class="card-footer">
              <div class="input-group">
                <input
                  id="btn-input"
                  type="text"
                  class="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleEnterKey}
                  placeholder="Type your message here..."
                  autoFocus
                />
                <button
                  class="btn btn-warning"
                  id="btn-chat"
                  onClick={sendChatMessage}
                >
                  Send
                </button>
                <button
                  class="btn btn-warning"
                  id="btn-chat"
                  onClick={receiveChatMessage}
                >
                  <i class="fa fa-refresh" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
