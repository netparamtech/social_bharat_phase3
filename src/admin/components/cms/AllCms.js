import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { deleteCmsById, fetchAllCms, toggleStatusForCms } from '../../services/AdminService';
import { useNavigate } from 'react-router-dom';
import { render } from '@testing-library/react';
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];
const AllCms = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const handlePageChange = (page) => {
        setPage(page);
    };

    const handlePageSizeChange = (current, pageSize) => {
        setSize(pageSize);
    };
    const handleToggleStatus = async (id) => {
        try {
            const response = await toggleStatusForCms(id);
            if (response && response.status === 200) {
                fetchData();
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/admin');
            }
            else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        }
    }
    const handleDelete = async (id) => {
        try {
            const response = await deleteCmsById(id);
            if (response && response.status === 200) {
                const removeDeletedItem = data.filter(item => item.id !== id);
                setData(removeDeletedItem);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/admin');
            }
            else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        }
    }
    const checkUrl = (urls) => {
        if (Array.isArray(urls)) {
            return urls;
        }
        return [urls];
    }
    const columns = [
        {
            title: 'Page',
            dataIndex: 'page',
            key: 'page',
            ...getColumnSearchProps('page'),
        },
        {
            title: 'Section',
            dataIndex: 'section',
            key: 'section',
            ...getColumnSearchProps('section'),
        },
        {
            title: 'Sub-Section',
            dataIndex: 'section_subheading',
            key: 'section_subheading',
            ...getColumnSearchProps('section_subheading'),
        },
        {
            title: 'Image(s)',
            dataIndex: 'photos',
            key: 'photos',
            render: (text, record) => (
                record.photos && checkUrl(record.photos).map((item, index) => (
                    <img className='m-2' src={item} alt={`${index + 1}`} width={100} height={50} />
                ))
            ),
            width: '20%'
        },
        {
            title: 'Icon',
            dataIndex: 'icons',
            key: 'icons',
            ...getColumnSearchProps('icons'),
        },
        {
            title: 'Archives',
            dataIndex: 'section_archives',
            render: (text, record) => (
                <p className="description"
                    dangerouslySetInnerHTML={{
                        __html: record.section_archives,
                    }}
                />
            ),
        },
        {
            title: 'Action',
            dataIndex: 'address',
            render: (text, record) => (
                <div>
                    <a className="collapse-item" onClick={(e) => {
                        e.preventDefault(); // Prevent the default anchor tag behavior
                        navigate(`/admin/update/cms/${record.id}`);
                    }}>
                        <i className="fa fa-edit mr-2" title='Edit' />
                    </a>

                    <a className="collapse-item" onClick={(e) => {
                        e.preventDefault(); // Prevent the default anchor tag behavior
                        handleDelete(record.id);
                    }}>
                        <i className="fa fa-trash" title='Delete' />
                    </a>
                    {record.status ? (
                        <a
                            className="collapse-item m-2"
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                handleToggleStatus(record.id);
                            }}
                        >
                            <i className="fa fa-thumbs-up text-primary" title="Active" />
                        </a>
                    ) : (
                        <a
                            className="collapse-item text-secondary m-2"
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                handleToggleStatus(record.id);
                            }}
                        >
                            <i className="fa fa-thumbs-down" title="Inactive" />
                        </a>
                    )}
                </div>
            )
        },
    ];
    const fetchData = async () => {
        try {
            const response = await fetchAllCms();
            if (response && response.status === 200) {
                setData(response.data.data);
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
    useEffect(() => {
        fetchData();
    }, []);
    return <Table columns={columns} dataSource={data}
        pagination={{
            current: page,
            pageSize: size,
            total: data.length,
            onChange: handlePageChange,
            onShowSizeChange: handlePageSizeChange,
        }}
    />;
};
export default AllCms;