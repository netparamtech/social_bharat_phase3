import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { replyEnquiry } from '../../services/AdminService';
import { toast } from 'react-toastify';
import { successOptions } from '../../../toastOption';
import { useNavigate } from 'react-router-dom';
const ReplyModel = ({ item }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message,setMessage] = useState('');
    const [mobile,setMobile] = useState('');
    const [enqId,setEnqId] = useState('');
    const navigate = useNavigate();

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const handleSubmit = async () =>{
        try {
            const data = {
                enq_id:enqId,
                mobile,
                message
            }
            const response = await replyEnquiry(data);
            if (response && response.status === 201) {
                toast.success('Message Sent Successfully.',successOptions);
            }
          } catch (error) {
            if (error.response && error.response.status === 401) {
              navigate("/admin");
            } else if (error.response && error.response.status === 500) {
              let errorMessage = error.response.data.message;
              navigate('/server/error', { state: { errorMessage } });
            }
          }
    }

    useEffect(()=>{
        if(item){
            setMobile(item.mobile);
            setEnqId(item.id);
        }
    },[item])
    return (
        <>
            <Button type="primary" onClick={showLoading}>
                Reply
            </Button>
            <Modal
                title={<p>Loading Modal</p>}
                footer={
                    <Button className='mt-2' type="primary" onClick={showLoading}>
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
                        <div className='row'>Reply To - "{item.message}"</div>
                        <div className='' style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
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
                        </div>
                        <div className='row'>
                            <textarea
                                className='form-control-reply mt-2'
                                placeholder='Enter Mobile Number'
                                defaultValue={item.toString()}
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};
export default ReplyModel;