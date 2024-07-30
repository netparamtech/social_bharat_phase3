import { useEffect, useRef, useState } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import { fetchBannerWithPageAndSection } from '../../services/userService';
import Banner from './Banner';
import BannerContent from './BannerContent';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function CarousalBanner() {
    const [index, setIndex] = useState(0);
    const user = useSelector((state) => state.userAuth);
    const isAuthenticUser = user && user.isAuthenticated;
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const [isCardShow, setIsCardShow] = useState(true);
    const [imageUrls, setImageUrls] = useState([]);
    const [isMultiBanner, setIsMultiBanner] = useState(false);
    const [buttonText, setButtonText] = useState("Become a member");
    const typedRef = useRef(null); // Use a single ref for Typed instance
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => {
                let newIndex = prevIndex + direction;
                if (newIndex >= imageUrls.length) {
                    setDirection(-1);
                    newIndex = imageUrls.length - 2;
                } else if (newIndex < 0) {
                    setDirection(1);
                    newIndex = 1;
                }
                return newIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [imageUrls.length, direction]);

    const nextSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 0);
        return () => clearInterval(intervalId);
    }, []);

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

                            <div style={{ position: 'relative', height: '400px', width: '100%' }}>

                                <Carousel
                                    selectedItem={index}
                                    autoPlay
                                    infiniteLoop
                                    interval={3000}
                                    showThumbs={false}
                                    showArrows={true}
                                    showStatus={false}
                                    dynamicHeight={false}>

                                    {imageUrls && imageUrls.length > 0 && imageUrls.map((item, idx) => (
                                        <div key={idx} style={{ top: '0', left: '0', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <img src={item} style={{ width: '100%', height: '400px', margin: '0 10px' }} alt={`Slide ${idx}`} />
                                        </div>
                                    ))}

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