import { useEffect, useState } from 'react';
import { Button, Divider, Modal, Skeleton, Avatar, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMyEnquiries } from '../../services/userService';
import { logout } from '../../actions/userAction';
import { setLoader } from '../../actions/loaderAction';
import GeneralEnquiry from './GeneralEnquiry';

const MyEnquiries = () => {
    const user = useSelector((state) => state.userAuth);
    const [isAuthenticUser, setIsAuthenticatedUser] = useState(user && user.isAuthenticated)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [items, setItems] = useState([]);
    const [mobile, setMobile] = useState('');
    const [photo, setPhoto] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(100);
    const [totalRows, setTotalRows] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isGeneral, setIsGeneral] = useState(false);
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelectedItem = (idx) => {
        setSelectedItem(selectedItem === idx ? null : idx);
    };
    const handleGeneralClicked = () => {
        setIsGeneral(true);
    }

    const loadMoreData = () => {
        console.log(items.length)
        if (loading || items.length >= totalRows) return;
        setLoading(true);
        fetchData(mobile, page, size);
    };

    const fetchData = async (mobile, page, size) => {
        dispatch(setLoader(true));
        try {
            const response = await fetchMyEnquiries(mobile, page, size);
            if (response && response.status === 200) {
                setTotalRows(response.data.totalRecords);
                setItems(response.data.data);
                setPage((prevPage) => prevPage + 1);
                setLoading(false);
                setServerError('');
                setErrors('');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setServerError('');
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.status === 401) {
                dispatch(logout());
            } else if (error.response && error.response.status === 500) {
                setServerError(error.response.data.message);
            }
        } finally {
            dispatch(setLoader(false));
            setLoading(false);
        }
    };

    const calculateTimeDifference = (updatedDate) => {
        const currentDate = new Date();
        const updatedDateObj = new Date(updatedDate);
        const differenceInSeconds = Math.floor((currentDate - updatedDateObj) / 1000);

        if (differenceInSeconds < 1) {
            return 'now';
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
                return '';
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

    const getColor = (item) => {
        if (item === 'Done') {
            return 'bg-success';
        } else if (item === 'In Progress') {
            return 'bg-info';
        } else if (item === 'Pending') {
            return 'bg-danger';
        }
    };

    useEffect(() => {
        if (user !== null) {
            setMobile(user.user.mobile);
            setPhoto(user.user.photo);
        }
    }, [user]);

    useEffect(() => {
        if (open) {
            fetchData(mobile, 1, size);
        }
    }, [open]);

    return (
        <>
            <Button type="primary" onClick={() => {
                setOpen(true);
                setIsGeneral(false);
            }}>
                My Enquiries
            </Button>

            <Modal
                title={<div>
                    <p>{isGeneral?'All Enquiries':'My Enquiries'}</p>
                    <Button  style={{backgroundColor:isGeneral?'':'red'}} type="primary" onClick={() => {
                        setOpen(true);
                        setIsGeneral(false);
                    }} disabled={!isAuthenticUser}>
                        My Enquiries
                    </Button>
                    <Button style={{backgroundColor:isGeneral?'red':''}} type="primary" onClick={handleGeneralClicked}>
                        General Enquiries
                    </Button>
                </div>}
                footer={[]}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <div>
                    {!isGeneral ? (<div
                        id="scrollableDiv1" className='scrollableDiv1'
                        style={{
                            height: 400,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                    >
                        <InfiniteScroll
                            dataLength={items.length}
                            next={loadMoreData}
                            hasMore={items.length < totalRows}
                            loader={
                                <Skeleton
                                    avatar
                                    paragraph={{ rows: 1 }}
                                    active
                                />
                            }
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv1"
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={items}
                                renderItem={(item, index) => (
                                    <>
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src={photo ? photo : '/user/images/3.png'} />}
                                                title={<a href="https://ant.design">{item.name}</a>}
                                                description={
                                                    <div>
                                                        <p>{item.message}</p>
                                                        <p>{calculateTimeDifference(item.updated_at)}</p>
                                                    </div>
                                                }
                                            />
                                            <div className='user-contact-enquiry-reply'>
                                                {item.remark !== null ? <p className={`text-light p-1 ${getColor(item.remark)}`} style={{ borderRadius: '10px' }}>{item.remark}</p> : ''}
                                                {
                                                    item.reply && item.reply.length > 0 ? (
                                                        <a className='hover-pointer text-decoration-none' onClick={() => handleSelectedItem(index)}>
                                                            {
                                                                selectedItem === index ? 'Hide Reply' : <p>Replied-{item.reply && item.reply.length}</p>
                                                            }
                                                        </a>
                                                    ) : ''
                                                }
                                            </div>
                                        </List.Item>
                                        <div className='contact-info-enquiry-reply-admin'>
                                            {
                                                selectedItem === index && item && item.reply && item.reply.length > 0 && item.reply.map((value, idx) => (
                                                    <div className='p-2 card w-100 mt-2' key={idx}>
                                                        <div className='user-contact-enquiry-reply-admin w-75'>
                                                            <Avatar src="/user/images/ADMIN.png" style={{ width: '50px', height: '50px' }} /><p className='text-wrap-break-word w-75'>{value.rep_message}</p>
                                                        </div>
                                                        <p style={{ fontSize: '12px' }}>{calculateTimeDifference(value.updated_at)}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>
                                )}
                            />
                        </InfiniteScroll>
                    </div>) : (
                        <GeneralEnquiry />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default MyEnquiries;
