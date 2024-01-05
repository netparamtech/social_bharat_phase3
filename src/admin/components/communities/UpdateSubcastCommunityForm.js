import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteSingleSubcast, fetchSingleSubcast, toggleSingleSubcast, updateSubcast } from "../../services/AdminService";

const UpdateSubcastCommunityForm = (props) => {
    const { handleSubcastClicked, id, subcastId } = props;
    const [data, setData] = useState([]);

    const [subcast, setSubcast] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [errors, setErrors] = useState('');

    const navigate = useNavigate();

    const fetchSubcast = async () => {
        try {
            const response = await fetchSingleSubcast(subcastId, id);
            if (response && response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate("/server/error", { state: { errorMessage } });
            }
        }
    };

    const deleteSubcast = async () => {
        try {
            const response = await deleteSingleSubcast(subcastId);
            if (response && response.status === 200) {
                handleSubcastClicked(false)
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate("/server/error", { state: { errorMessage } });
            }
        }
    };

    const toggleSubcast = async () => {
        try {
            const response = await toggleSingleSubcast(subcastId);
            if (response && response.status === 200) {
                fetchSubcast();
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate("/server/error", { state: { errorMessage } });
            }
        }
    };

    const handleSubmit = async () => {
        const data = {
            community_id: id,
            subcast_id: subcastId,
            subcast: subcast.toUpperCase(),
        }
        try {
            const response = await updateSubcast(data);
            if (response && response.status === 201) {
                handleSubcastClicked(false);
                setErrors('');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate("/server/error", { state: { errorMessage } });
            }
        }
    }
    useEffect(() => {
        if (data) {
            setSubcast(data && data.subcast);
        }
    }, [data]);
    useEffect(() => {
        fetchSubcast();
    }, [subcastId]);

    return (
        <div className="card">
            <div className="card-header bg-success text-light fs-5 fw-bold">
                Update Subcast
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label className="fw-bold">Subcast</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        defaultValue={subcast}
                        onChange={(e) => setSubcast(e.target.value)}
                        placeholder="Enter Subcast Name"
                    />
                    {errors.subcast && <span className="error">{errors.subcast}</span>}
                </div>
                <button type="submit" className="btn btn-primary w-25 " onClick={handleSubmit}>
                    Update
                </button>
                <button type="submit" className="btn btn-primary w-25 m-2 " onClick={()=>deleteSubcast(data.subcast_id)}>
                    Delete
                </button>
                {data.status === 'true' ? (
                        <a
                            className="collapse-item m-2"
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                 toggleSubcast(data.subcast_id);
                            }}
                        >
                            <i className="fa fa-thumbs-up text-primary fs-3" title="Active" />
                        </a>
                    ) : (
                        <a
                            className="collapse-item text-secondary m-2"
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSubcast(data.subcast_id);
                            }}
                        >
                            <i className="fa fa-thumbs-down fs-3" title="Inactive" />
                        </a>
                    )}

            </div>
        </div>
    );
}
export default UpdateSubcastCommunityForm;