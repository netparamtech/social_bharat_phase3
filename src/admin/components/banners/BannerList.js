import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchAllBanners } from '../../services/AdminService';

const BannerList = () => {
    const [data, setData] = useState([]);
    const [item, setItem] = useState(null);
    const [errors, setErrors] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
                navigate('/admin')
            }
            else if (error.response && error.response.status === 500) {

            }

        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    // Pagination related functions
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Banners</h1>
                <a href="create-banner" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    Create Banner
                </a>
            </div>
            <div className="card">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Banner_Url</th>
                            <th scope="col">Section</th>
                            <th scope="col">Page</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData && paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <td>
                                        {item.banner_urls ? (
                                            <div className="d-flex flex-wrap">
                                                {item.banner_urls.map((value, idx) => (
                                                    <div className="m-2" key={idx}>
                                                        <a href={item.banner_url} target="_blank">
                                                            <img src={value} title="Banner image" width={100} alt="Banner" className="thumbnail-image" />
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            item.banner_url
                                        )}

                                    </td>
                                    <td>{item.section}</td>
                                    <td>{item.page}</td>

                                    <td>{item.status}</td>
                                    <td key={item.id}>
                                        <div className="d-flex">
                                            <a className="collapse-item">
                                                <i className="fa fa-edit mr-4" title="Edit" onClick={(e)=>{
                                                    e.preventDefault();
                                                    navigate(`/admin/banners/${item.page}/${item.section}`);
                                                }} />
                                            </a>
                                            <a className="collapse-item" href="">
                                                <i className="fa fa-trash" title="Delete" />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <nav>
                    <ul className="pagination justify-content-center">
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <a
                                    className="page-link"
                                    onClick={() => handlePageChange(index + 1)}
                                    href="#"
                                >
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}

        </div>
    );
};

export default BannerList;
