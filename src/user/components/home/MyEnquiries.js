import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyEnquiries } from '../../services/userService';
import { logout } from '../../actions/userAction';
import { setLoader } from '../../actions/loaderAction';
import { Avatar, List } from 'antd';

const MyEnquiries = () => {
    const user = useSelector((state) => state.userAuth);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState('');
    const [items, setItems] = useState([]);
    const [mobile, setMobile] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const [selectedItem, setSelectedItem] = useState(null);

    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelectedItem = (idx) => {
        setSelectedItem(selectedItem === idx ? null : idx);
    }

    // Function to handle form submission
    const fetchData = async (mobile) => {
        dispatch(setLoader(true));
        try {
            const response = await fetchMyEnquiries(mobile, page, size);
            if (response && response.status === 200) {
                setItems(response.data.data);
                console.log(response.data.data);
                setServerError('');
                setErrors("");
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

    useEffect(() => {
        console.log('hello')
        if (open) {
            fetchData(user && user.user.mobile);
        }
    }, [open])

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                My Enquiries
            </Button>
            <Modal
                title={<p> My Enquiries</p>}
                footer={
                   []
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={items}
                    renderItem={(item, index) => (
                        <>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={user.user.photo?user.user.photo:'/user/images/3.png'} />}
                                    title={<a href="https://ant.design">{item.name}</a>}
                                    description={<div>
                                        <p>{item.message}</p>
                                        <p>{calculateTimeDifference(item.updated_at)}</p>
                                    </div>}

                                />
                               <div className='user-contact-enquiry-reply'>
                               {item.remark!==null?<p className='text-light bg-danger p-1' style={{borderRadius:'10px'}}>{item.remark}</p>:''}
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
                            <div className='contact-info-enquiry-reply'>
                                {
                                    selectedItem === index && item && item.reply && item.reply.length > 0 && item.reply.map((value, idx) => (

                                        <div className='p-2 card w-100 mt-2'>
                                        <div className='user-contact-enquiry-reply w-75'>
                                            <Avatar src="/user/images/ADMIN.png" style={{width:'50px',height:'50px'}} /><p className='text-wrap-break-word w-75'>{value.rep_message}</p>
                                        </div>
                                        <p  style={{fontSize:'12px'}}>{calculateTimeDifference(value.updated_at)}</p></div>
                                    ))
                                }
                            </div>
                        </>
                    )}
                />
            </Modal>
        </>
    );
};
export default MyEnquiries;