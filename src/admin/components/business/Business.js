import React, { useEffect, useState } from "react";
import { Image, Table } from "antd";
import {
    deleteActivity,
    deleteBusinessPosted,
    fetchAllBusinesses,
    toggleActivityPostStatus,
    toggleBusinessPosted,
    updateToggleFeaturedForEvent,
} from "../../services/AdminService";
import { useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import BusinessCard from "../../../user/components/search/BusinessCard";

const Business = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countryID, setCountryID] = useState(101);

    //to show state and city according to user search

    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [defaultImage, setDefaultImage] = useState("img/de-default-1.jpeg");

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handlePageSizeChange = (current, pageSize) => {
        setSize(pageSize);
    };

    const handleSearchChange = (query) => {
        setPage(1);
        setSearchQuery(query);
    };

    const fetchData = async () => {
        dispatch(setLoader(true));
        try {
            const response = await fetchAllBusinesses(page, size, searchQuery, state, city);

            setData(response.data.combinedResults.data);

            setTotalRows(response.data.combinedResults.totalRowsAffected);
            dispatch(setLoader(false));
        } catch (error) {
            dispatch(setLoader(false));
            if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate("/server/error", { state: { errorMessage } });
            }
        }
    };

    const toggleBusinessStatus = async (id) => {
        try {
            const response = await toggleBusinessPosted(id);
            if (response && response.status === 201) {
                fetchData();
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

    const handleEventToggleFeatured = async (id) => {
        try {
            const response = await updateToggleFeaturedForEvent(id);
            if (response && response.status === 200) {
                fetchData();
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

    const handleDeleteBusiness = async (id) => {
        try {
            const response = await deleteBusinessPosted(id);
            if (response && response.status === 201) {
               let filterData = data.filter(item=>item.id!==id);
               setData(filterData);
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

    const formatDate = (dateString) => {
        const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const columns = [
        {
            title: "S.No",
            dataIndex: "sno",
            render: (text, record, index) => index + 1,
        },

        {
            title: "Posted By",
            dataIndex: "user_name",
        },
        {
            title: "Title",
            dataIndex: "title",
            render: (text, record) => (
                <div className="description-cell">
                    {record.business_name}
                </div>
            ),
            ellipsis: true,
        },
        {
            title: "Category",
            dataIndex: "business_category",
            render: (text, record) => (
                <div className="description-cell">
                    {record.business_category}
                </div>
            ),
        },
        {
            title: "Business Photos",
            dataIndex: "business_photos",
            render: (text, record) => (
                <div>
                    {record.business_photos && Array.isArray(record.business_photos) ? (
                        record.business_photos.map((item, value) => (
                            <Image
                                src={item}
                                width={50}
                                height={50}
                                className="p-1"
                                style={{
                                    objectFit: "contain",
                                }}
                            ></Image>
                        ))
                    ) : (
                        <Image src={record.business_photos} width={100} />
                    )}
                </div>
            ),
        },

        {
            title: "Description",
            dataIndex: "description",
            render: (text, record) => (
                <div className="description-cell" dangerouslySetInnerHTML={{
                    __html: record.description,
                }}>

                </div>
            ),
            ellipsis: true,
        },


        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) =>
                record.status === "Active" ? (
                    <a
                        className="collapse-item m-2"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleBusinessStatus(record.id);
                        }}
                    >
                        <i className="fa fa-thumbs-up text-primary" title="Active" />
                    </a>
                ) : (
                    <a
                        className="collapse-item text-secondary m-2"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleBusinessStatus(record.id);
                        }}
                    >
                        <i className="fa fa-thumbs-down" title="Inactive" />
                    </a>
                ),
        },

        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="">
                    <BusinessCard item={record} name="admin" />

                    <a
                        className="collapse-item m-2"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDeleteBusiness(record.id);
                        }}
                    >
                        <i className="fas fa-trash"></i>
                    </a>
                </div>
            ),
        },
        // Rest of the columns definition
    ];

    useEffect(() => {
        fetchData();
    }, [page, size, searchQuery, selectedState, selectedCity]);

    return (
        <div>
            <Search
                placeholder="Search"
                allowClear
                onSearch={handleSearchChange}
                style={{ marginBottom: 20, width: 200 }}
            />

            <Table
                title={() => "Business Index"} // Set the title to 'Enquiries'
                dataSource={data}
                columns={columns}
                pagination={{
                    current: page,
                    pageSize: size,
                    total: totalRows,
                    onChange: handlePageChange,
                    onShowSizeChange: handlePageSizeChange,
                }}
                rowKey={(record) => record.id}
            // onChange={handleSearchChange}
            />
        </div>
    );
};

export default Business;
