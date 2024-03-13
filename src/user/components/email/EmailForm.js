import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { saveEmail, sendEmail } from '../../services/userService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../actions/loaderAction';
import { successOptions } from '../../../toastOption';

const EmailForm = (props) => {
    const { record, handleOk } = props;
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        message: '',
    });
    const [jobId, setJobId] = useState('');
    const [errors, setErrors] = useState("");
    const [serverError, setServerError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...emailData,
            job_id: jobId,
            receiver_id: record.user_id,

        }

        try {
            dispatch(setLoader(true));
            const response = await sendEmail(data);
            if (response && response.status === 201) {
                setErrors('');
                setServerError('');
                toast.success("Email sent successfully.",successOptions);

            }
        } catch (error) {
            // Handle error
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
        // Assuming you have a server-side endpoint to handle email sending

    };

    useEffect(() => {
        if (record) {
            console.log(record)
            setEmailData({
                to: record.email,
                subject: record.job_title,
            });
            setJobId(record.job_id);

        }
    }, [record]);

    return (
        <Card>
            <Card.Body>
                {serverError && <span className='error'>{serverError}</span>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTo">
                        <Form.Label>To:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="to"
                            value={emailData.to}
                            onChange={handleChange}
                        />
                        {errors.to && (
                            <span className="error">{errors.to}</span>
                        )}
                    </Form.Group>

                    <Form.Group controlId="formSubject">
                        <Form.Label>Subject:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter subject"
                            name="subject"
                            value={emailData.subject}
                            onChange={handleChange}
                        />
                        {errors.subject && (
                            <span className="error">{errors.subject}</span>
                        )}
                    </Form.Group>

                    <Form.Group controlId="formMessage">
                        <Form.Label>Message:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter your message"
                            name="message"
                            value={emailData.message}
                            onChange={handleChange}
                        />
                        {errors.message && (
                            <span className="error">{errors.message}</span>
                        )}
                    </Form.Group>

                    <Button className='mt-2 rounded' type="submit">
                        Send Email
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EmailForm;
