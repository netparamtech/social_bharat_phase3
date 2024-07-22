import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { findReply, replyEnquiry } from '../../services/AdminService';
import { toast } from 'react-toastify';
import { successOptions } from '../../../toastOption';
import { useNavigate } from 'react-router-dom';
const ReplyModel = ({ item }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [mobile, setMobile] = useState('');
    const [enqId, setEnqId] = useState('');
    const [replyData, setReplyData] = useState([]);

    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = {
                enq_id: enqId,
                mobile,
                message
            }
            const response = await replyEnquiry(data);
            if (response && response.status === 201) {
                setErrors('');
                setMessage("");
                findReplyById();
                toast.success('Message Sent Successfully.', successOptions);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        } finally {
            setLoading(false);
        }
    }

    const findReplyById = async () => {
        try {
            setLoading(true);
            const response = await findReply(enqId);
            if (response && response.status === 200) {
                setErrors('');
                setMessage("");
                setReplyData(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (item) {
            setMobile(item.mobile);
            setEnqId(item.id);
        }
    }, [item]);
    useEffect(() => {
        if (open && enqId) {
            findReplyById();
        }
    }, [open, enqId]);
    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Reply
            </Button>
            <Modal
                title={<p>Loading Modal</p>}
                footer={
                    <Button className='mt-2' type="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                {/* {item.mobile} */}
                <form>
                    <div className='row reply-model-container'>
                        <div className='row text-wrap-break-word'>Reply To - "{item.message}"</div>
                        <div className='' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div className='reply-socialbharat'>Reply</div>
                            <div className='reply-email'>Reply By Email</div>
                        </div>
                        <div className='row'>
                            <input type='number'
                                className='form-control-reply mt-2'
                                placeholder='Enter Mobile Number'
                                value={item.mobile}
                                disabled
                            />
                            {errors.mobile && <span className="error">{errors.mobile}</span>}
                        </div>
                        <div className='row'>
                            <textarea
                                className='form-control-reply mt-2'
                                placeholder='Enter your message.'
                                value={message}
                                onChange={handleMessageChange}
                            />
                            {errors.message && <span className="error">{errors.message}</span>}
                        </div>
                    </div>
                    <div>
                        {
                            replyData && replyData.length > 0 && replyData.map((item, index) => (
                                <p className='fw-bold'>reply-{index+1}{" "}{item.message}</p>
                            ))
                        }
                    </div>
                </form>
            </Modal>
        </>
    );
};
export default ReplyModel;