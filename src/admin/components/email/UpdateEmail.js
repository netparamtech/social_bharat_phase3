import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMail, createService, getAuthorizedEmail } from "../../services/AdminService";
import { toast } from "react-toastify";

const UpdateEmail = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState('');
    const [data, setData] = useState('');
    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const getEmail = async () => {
        try {
            const response = await getAuthorizedEmail();
            if (response && response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            // Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const data = {
                email,
                app_pass: password,
                status,
            };
            console.log(data)

            const response = await createMail(data);

            if (response && response.status === 201) {
                setErrors("");
                toast.success(response.data.message);
                getEmail();
            }
            // Redirect to the admin dashboard or desired page
        } catch (error) {
            // Handle validation errors
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setAlertClass('');
                setMessage('');
            }
            // Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        }
    };
    useEffect(() => {
        if (data) {
            setPassword(data.app_pass);
            setEmail(data.email);
            setStatus(data.status);
        }
    }, [data])

    useEffect(() => {
        getEmail();
    }, []);

    return (
        <div className="container-fluid" id="font-Resize">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Email</h1>
                <a
                    className="d-sm-inline-block btn btn-sm btn-primary shadow-sm hover-pointer-admin"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/admin/mail/index');
                    }}
                >
                    Inbox
                </a>
            </div>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {message && (
                            <div className={`alert ${alertClass}`}>
                                {alertClass === "alert-success" ? (
                                    <i className="fas fa-check-circle"></i>
                                ) : (
                                    <i className="fas fa-exclamation-triangle"></i>
                                )}
                                {" " + message}
                            </div>
                        )}

                        <div className="row">
                            <div className="col-md-6">

                                <div className="form-group">
                                    <label className="fw-bold"> Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        defaultValue={email}
                                        onChange={handleEmailChange}
                                        placeholder="Enter Your Email"
                                    />
                                    {errors.email && (
                                        <span className="error">{errors.email}</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">

                                <div className="form-group">
                                    <label className="fw-bold"> App Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        defaultValue={password}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter App Password"
                                    />
                                    {errors.app_pass && (
                                        <span className="error">{errors.app_pass}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="status" className="fw-bold">Status</label>
                                    <select
                                        className="form-control"
                                        id="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">Select status</option>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                    {errors.status && (
                                        <span className="error">{errors.status}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateEmail;