import { useEffect, useRef, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import { fetchBannerWithPageAndSection } from '../../services/userService';
import Banner from './Banner';
import { toast } from 'react-toastify';
import { generalMessage, infoOptions } from '../../../toastOption';
import BannerContent from './BannerContent';

function CarousalBanner() {
    const [index, setIndex] = useState(0);
    const user = useSelector((state) => state.userAuth);
    const isAuthenticUser = user && user.isAuthenticated;
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const [isCardShow, setIsCardShow] = useState(true);
    const [imageUrls, setImageUrls] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMultiBanner, setIsMultiBanner] = useState(false);
    const [buttonText, setButtonText] = useState("Become a member");
    const typedRef = useRef(null); // Use a single ref for Typed instance
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const defaultImageUrl = '/user/images/banner-1.jpg'

    const handleBecomeMemberClick = () => {
        navigate('/register');
    };
    const handleIsCardShow = () => {
        setIsCardShow(false);
    }

    const fetchBanners = async () => {
        dispatch(setLoader(true));
        try {
            const response = await fetchBannerWithPageAndSection(
                "Home",
                "Main Banners"
            );

            const activeBanners = response.data.data.filter(
                (banner) => banner.status === "Active"
            );


            if (!Array.isArray(activeBanners[0].banner_urls)) {
                const updatedBannerUrls = [activeBanners[0].banner_urls];
                activeBanners[0].banner_urls = updatedBannerUrls;
            }
            const imageUrls = activeBanners[0].banner_urls;
            if (imageUrls.length === 1) {
                setIsMultiBanner(false);
                setImageUrls(imageUrls);
            } else {
                setIsMultiBanner(true);
                setImageUrls(imageUrls);
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

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

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            {
                isMultiBanner ? (

                    <div id="banners-section" className="" >
                        <div className="">
                            <div className="text-success fw-bold fs-6">
                                <marquee className="">"Building Bridges, Creating Bonds: Social Bharat is your gateway to community connections,
                                    meaningful relationships, and professional growth. Discover a platform where community thrives,
                                    love blossoms, careers take flight, and services unite. Explore Matrimonial Bliss, Career Opportunities,
                                    Business Networking, and more. Join us on the journey of empowerment and shared prosperity.
                                    Your community, your connection, your Social Bharat. #CommunityConnections #Matrimony #JobSearch #ServiceSearch #SocialBharat 🌐💑👔🛠️"
                                </marquee>
                            </div>
                            {
                                isCardShow && !isAuthenticUser && <div className="card card-body bg-info col-12 col-md-3 shadow" style={{ position: 'absolute', zIndex: 9999, transition: 'height 0.8s' }}>
                                    <span className="position-absolute top-0 end-0" onClick={handleIsCardShow}>
                                        {/* <i class="fs-1 fw-bold hover-pointer hover-pointer-red remove-btn-custom fa fa-remove"></i> */}
                                        <button className="hover-pointer-red "><i className="fa fa-remove"></i></button>
                                    </span>
                                    <div>
                                        <div className='col-12'>
                                            A comprehensive and impactful project aimed at fostering community engagement,
                                            facilitating connections, and providing valuable services to users.
                                        </div>
                                        <BannerContent />
                                        <button className='btn btn-success' onClick={() => navigate('/register')}>Become A Member</button>
                                    </div>

                                </div>
                            }
                            <div className='' style={{ objectFit: 'cover', height: '400px', width: '100%' }}>
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    {
                                        imageUrls && imageUrls.length > 0 && imageUrls.map((item, index) => (

                                            <Carousel.Item key={index}>
                                                <div style={{ position: 'relative', width: '100%', height: '400px', objectFit: 'cover' }}>
                                                    <img src={item} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />

                                                </div>

                                            </Carousel.Item>

                                        ))
                                    }
                                </Carousel>
                            </div>

                        </div>
                    </div>
                ) : <Banner />
            }
        </>

    );
}

export default CarousalBanner;