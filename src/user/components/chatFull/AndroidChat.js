import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveMessage, receiveMessageAll, sendMessage } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../actions/loaderAction";
import { Avatar, Image, List } from 'antd';
import { Result } from 'antd';

const AndroidChat = (props) => {
    const user = useSelector((state) => state.userAuth);

    const { changeChatFlag } = props;

    const [loggedID, setLoggedID] = useState("");
    const [loggedUserProfile, setLoggedUserProfile] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [receiverID, setReceiverID] = useState("");
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [isSendClicked, setIsSendClicked] = useState(false);
    const [sideList, setSideList] = useState([]);

    const [secondaryId, setSecondaryId] = useState("");
    const [loggedUserFirstLatter, setLoggedUserFirstLatter] = useState("");
    const [isSideLabel, setIsSideLabel] = useState(true);

    const [errors, setErrors] = useState("");
    const [serverError, setServerError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSideLabel = () => {
        setIsSideLabel(!isSideLabel);
    }

    const handleCloseClick = () => {
        changeChatFlag(false);
    };

    const handleSendClicked = () => {
        setIsSendClicked(!isSendClicked);
    };

    const sendChatMessage = async () => {
        if (message) {
            dispatch(setLoader(false));

            const data = {
                receiver_id: selectedUser.sender_id === loggedID ? selectedUser.receiver_id : selectedUser.sender_id,
                message,
            };
            try {
                const response = await sendMessage(data);
                if (response && response.status === 200) {
                    const newMessage = {
                        id: '',
                        sender_id: selectedUser.sender_id === loggedID ? selectedUser.sender_id : selectedUser.receiver_id,
                        receiver_id: selectedUser.sender_id === loggedID ? selectedUser.receiver_id : selectedUser.sender_id,
                        message,
                    }
                    setServerError("");
                    handleSendClicked();
                    allChatMessage();
                    receiveChatMessage();
                    setMessage("");
                    setErrors('');
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
                    setErrors(error.response.data.error);
                }
            }
        }
    };

    const receiveChatMessage = async () => {
        dispatch(setLoader(false));
        try {
            const response = await receiveMessage(selectedUser.sender_id === loggedID ? selectedUser.receiver_id : selectedUser.sender_id);
            if (response && response.status === 200) {
                const sortedMessages = response.data.data
                    .sort((a, b) => a.timestamp - b.timestamp)
                    .reverse();
                setMessageList(sortedMessages);
                allChatMessage();
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

    const allChatMessage = async () => {
        dispatch(setLoader(false));
        try {
            const response = await receiveMessageAll();
            if (response && response.status === 200) {
                setSideList(response.data.data);
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
            setLoggedUserProfile(user && user.user.photo);
            setLoggedUserFirstLatter(user.user.name.charAt(0).toUpperCase());
        }
    }, [user]);

    useEffect(() => {
        if (selectedUser) {
            setIsSideLabel(false);
            receiveChatMessage();
        }
    }, [selectedUser]);

    useEffect(() => {
        allChatMessage();
        window.scroll(0, 0);
    }, []);

    const chatMessagesContainerRef = useRef();

    useEffect(() => {
        // Ensure the ref is defined before accessing its properties
        if (chatMessagesContainerRef.current) {
            chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
        }
    }, []); // Runs only once when the component mounts

    useLayoutEffect(() => {
        // Scroll to the end whenever the messageList changes
        if (chatMessagesContainerRef.current) {
            chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
        }
    }, [messageList]);

    return (
        <div id="chat" className="">
            <main className="content mb-5">
                <div className="p-0">
                    <div className="card shadow">
                        <div className="row g-0">
                            {
                                isSideLabel && <div className="col-12 col-md-4 bg-light" style={{ borderRight: '1px solid #CECECE', height: '' }}>
                                    <div className="py-2 px-4 border-bottom bg-primary">
                                        <div className="d-flex align-items-center py-1">
                                            <div className="position-relative">
                                                {loggedUserProfile ? (
                                                    <img
                                                        src={loggedUserProfile}
                                                        className="dropdown-user-img-letter"
                                                        alt={selectedUser && selectedUser.photo}
                                                        width="40"
                                                        height="40"
                                                    />
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="dropdown-user-img-letter"
                                                    >
                                                        {loggedUserFirstLatter}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2" style={{ overflow: 'scroll', height: '', overflowX: 'hidden', height: '500px' }}>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={sideList}
                                            renderItem={item => {
                                                const isSender = item.sender_id === loggedID;
                                                const photo = isSender ? item.receiver_photo : item.sender_photo;
                                                const name = isSender ? item.receiver_name : item.sender_name;
                                                const displayName = item.receiver_id === item.sender_id ? 'Yourself' : name;

                                                const avatarContent = photo ?
                                                    <Avatar src={photo} /> :
                                                    <Avatar>{name ? name.charAt(0).toUpperCase() : ''}</Avatar>;

                                                return (
                                                    <div className="hover-pointer" style={{ borderBottom: '1px solid #CECECE' }} onClick={() => setSelectedUser(item)} >
                                                        <List.Item>
                                                            <List.Item.Meta
                                                                avatar={avatarContent}
                                                                title={displayName}
                                                                description={
                                                                    <p style={{ fontSize: '12px' }}>
                                                                        {isSender && <img src="/user/images/double-check.png" width={15} alt="Sent" />}
                                                                        {item.message}
                                                                    </p>
                                                                }
                                                            />
                                                        </List.Item>
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            }
                            {
                                !isSideLabel && <div className="col-12 col-md-8">
                                    {
                                        selectedUser ? (
                                            <>
                                                <div className=" px-4 border-bottom bg-primary">
                                                    <div className="d-flex align-items-center py-1">
                                                        <div className="position-relative">
                                                            {selectedUser.sender_id === loggedID ? (selectedUser.receiver_photo ? (
                                                                <img
                                                                    src={selectedUser && selectedUser.receiver_photo}
                                                                    className="rounded-circle mr-1"
                                                                    alt={selectedUser && selectedUser.receiver_name}
                                                                    width="40"
                                                                    height="40"
                                                                />
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="dropdown-user-img-letter m-2"
                                                                >
                                                                    {selectedUser &&
                                                                        selectedUser.receiver_name.charAt(0).toUpperCase()}
                                                                </button>
                                                            )) : selectedUser.sender_photo ? (
                                                                <img
                                                                    src={selectedUser && selectedUser.sender_photo}
                                                                    className="rounded-circle mr-1"
                                                                    alt={selectedUser && selectedUser.sender_name}
                                                                    width="40"
                                                                    height="40"
                                                                />
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="dropdown-user-img-letter m-2"
                                                                >
                                                                    {selectedUser &&
                                                                        selectedUser.sender_name.charAt(0).toUpperCase()}
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className="flex-grow-1 pl-3 ms-2">
                                                            <strong className="fs-6 text-white">
                                                                {" "}
                                                                {selectedUser && selectedUser.sender_id === loggedID ? selectedUser.receiver_name : selectedUser.sender_name}
                                                            </strong>
                                                            {/* <div className="text-muted small ">
                                            <em className="text-white">Online</em>
                                        </div> */}
                                                        </div>
                                                        <div>
                                                            <span
                                                                className="btn fs-4  btn-whi close-button-chat"
                                                                onClick={() => setIsSideLabel(true)}
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
                                                                                {user && user.user.photo ? (
                                                                                    <img
                                                                                        src={user.user.photo}
                                                                                        className="rounded-circle mr-1 m-1"
                                                                                        alt={user.user.name}
                                                                                        width="40"
                                                                                        height="40"
                                                                                    />
                                                                                ) : (
                                                                                    <button
                                                                                        type="button"
                                                                                        className="dropdown-user-img-letter mr-1 m-2"
                                                                                    >
                                                                                        {user && user.user.name.charAt(0).toUpperCase()}
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                            <div className="flex-shrink-1 bg-right-msg rounded py-2 px-3 mr-3">
                                                                                <div className="font-weight-bold text-dark">You</div>
                                                                                <div className="font-messages">
                                                                                    {item.message}
                                                                                    <div className="text-muted small text-nowrap">
                                                                                        {calculateTimeDifference(item.timestamp)}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="chat-message-left pb-4">
                                                                            <div>
                                                                                {selectedUser && selectedUser.sender_photo ? (
                                                                                    <Image
                                                                                        src={selectedUser.sender_photo}
                                                                                        className="rounded-circle mr-1 m-1"
                                                                                        alt={selectedUser.sender_name}
                                                                                        style={{ width: '40px', height: '40px' }}
                                                                                    />
                                                                                ) : (
                                                                                    <button
                                                                                        type="button"
                                                                                        className="dropdown-user-img-letter mr-1 m-2"
                                                                                    >
                                                                                        {selectedUser && selectedUser.sender_name.charAt(0).toUpperCase()}
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                            <div className="flex-shrink-1 bg-white rounded py-2 px-3 ml-3">
                                                                                <div className="font-weight-bold">
                                                                                    {selectedUser && selectedUser.sender_name}
                                                                                </div>
                                                                                <div className="font-messages">
                                                                                    {item.message}
                                                                                    <div className="text-muted small text-nowrap">
                                                                                        {calculateTimeDifference(item.timestamp)}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                    </div>
                                                    <div className="flex-grow-0 py-3 px-4 border-top">
                                                        {errors ? (<span className="error">Data too long for send 'message'</span>) : ''}
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
                                                                onClick={() => sendChatMessage()}
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
                                            </>
                                        ) : (
                                            <div style={{ padding: '20px' }}>
                                                <Result
                                                    status="success"
                                                    title="Welcome to Social Bharat!"
                                                    subTitle="Search and promote services in your community"
                                                    extra={[

                                                    ]}
                                                />
                                            </div>
                                        )
                                    }


                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AndroidChat;
