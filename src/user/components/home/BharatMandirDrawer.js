import React, { useEffect, useState } from 'react';
import '../../pages/css/ourPartner.css';
import { Drawer, Input } from 'antd';
import { fetchAllActiveCommunities } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import { useNavigate } from 'react-router-dom';
const BharatMandirDrawer = () => {
    const [open, setOpen] = useState(false);
    const [casts, setCasts] = useState([]);
    const [copyCasts, setCopyCasts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleFilterData = () => {
        const filteredData = copyCasts.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
        setCasts(filteredData);
    }

    const fetchCommunities = async () => {
        dispatch(setLoader(false));
        try {
            const response = await fetchAllActiveCommunities();
            if (response && response.status === 200) {
                const filteredFetch = response.data.data.filter((item) => item && item.community_archive !== '');
                setCasts(filteredFetch);
                setCopyCasts(filteredFetch);
                setServerError('');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    };
    const handleImageClick = (communityName) => {
        navigate(`/${communityName}`);
    }
    useEffect(() => {
        // Fetch communities data
        fetchCommunities();
    }, []);
    useEffect(() => {
        handleFilterData();
    }, [searchText]);
    useEffect(() => {
        const handleResize = () => {
            setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
        };

        // Listen for window resize events
        window.addEventListener("resize", handleResize);
        handleResize(); // Call initially to set the correct value

        // Cleanup the event listener when component is unmounted
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const cardStyles = {
        boxShadow: '0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '50px',
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '10px',
    };
    const imageStyles = {
        width: '100%',
        objectFit: 'cover', // Ensures the image covers the entire container while maintaining aspect ratio
    };
    return (
        <div id='bharatmatamandir'>

            <li className='nav-item'>
                <i className="fa fa-history m-2" fill="currentColor" aria-hidden="true"></i>
                <a className='nav-link hover-pointer d-inline' onClick={showDrawer}>
                    BHARAT MANDIR
                </a>
            </li>

            <Drawer title="भारत माता मंदिर" placement="right" onClose={onClose} open={open} width={300} className='bg-success'>

                <div className="container-input mb-3 d-flex">
                    <Input
                        type="text"
                        placeholder="Search"
                        name="text"
                        className="input form-control w-80"
                        onChange={handleSearchTextChange}
                        autoFocus
                    />
                    <i className="btn btn-primary fas fa-search" onClick={handleFilterData}></i>
                </div>
                {serverError && <span className='error'>{serverError}</span>}
                {casts && casts.length > 0 &&
                    casts.map(
                        (community, index) =>
                            community.thumbnail_image && (
                                <div className={`mt-2 card ${index % 2 === 0 ? 'bg-secondary bg-gradient' : 'bg-light bg-gradient'} shadow d-flex`} style={cardStyles} key={index}>
                                    <a className="hover-pointer">
                                        <img
                                            src={community.thumbnail_image}
                                            style={imageStyles}
                                            alt={community.name}
                                            width={100}
                                            height={100}

                                            onClick={() => handleImageClick(community.name)}
                                        />
                                    </a>
                                    <span className='m-2'><b>{community.name}</b></span>
                                </div>
                            )
                    )}
            </Drawer>
        </div>
    );
};
export default BharatMandirDrawer;