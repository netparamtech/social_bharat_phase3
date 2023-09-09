import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchAllBanners, updateBannerToggleStatus } from '../../services/AdminService';
import { logout } from '../../actions/authActions';

const BannerList = () => {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchBanners = async () => {

        try {
            const response = await fetchAllBanners();
            if (response && response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data.message);
                setErrors(error.response.data.errors);

            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/admin');
            }
            else if (error.response && error.response.status === 500) {
                dispatch(logout());
                navigate('/admin');
            }

        }
    };

    const handleStatusToggle = async (bannerId) => {
        try {
            const response = await updateBannerToggleStatus(bannerId);
            if (response && response.status === 200) {
                fetchBanners();
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/admin');
            } else if (error.response && error.response.status === 500) {
                dispatch(logout());
                navigate('/admin');
            }
        }
    }

    useEffect(() => {
        fetchBanners();
    }, []);



    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Banners</h1>
                <a href="/admin/banner/create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    Create Banner
                </a>
            </div>
            <div className="card table-responsive">
                <table className="table table-striped table-bordered table-sm">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Page</th>
                            <th scope="col">Section</th>
                            <th scope="col">Banners</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.page}</td>
                                    <td>{item.section}</td>
                                    <td>
                                        {item.banner_urls ? (
                                            <div className="d-flex flex-wrap">
                                                {item.banner_urls && Array.isArray(item.banner_urls) ? (item.banner_urls.map((value, idx) => (
                                                    <div className="m-2" key={idx}>
                                                        <a href={value} target="_blank">
                                                            <img src={value} title="Banner image" alt="Banner" className="small-img-thumbnail" />
                                                        </a>
                                                    </div>
                                                ))) : (<a href={item.banner_urls} target="_blank">
                                                    <img src={item.banner_urls} title="Banner image" alt="Banner" className="small-img-thumbnail" />
                                                </a>)}
                                            </div>
                                        ) : (
                                            item.banner_url
                                        )}

                                    </td>

                                    <td>
                                        <a href="#" onClick={() => handleStatusToggle(item.id)}>
                                            {item.status === 'Active' ? (
                                                <i className="fa fa-thumbs-up text-primary" title="Active" />
                                            ) : (
                                                <i className="fa fa-thumbs-down text-secondary" title="Inactive" />
                                            )}
                                        </a>
                                    </td>
                                    <td key={item.id}>
                                        <div className="d-flex">
                                            <a className="collapse-item" href={`/admin/banners/update/${item.page}/${item.section}`}>
                                                <i className="fa fa-edit mr-4" title="Edit" />
                                            </a>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BannerList;
