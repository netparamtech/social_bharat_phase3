import { useEffect, useRef, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Typed from "typed.js";
import ExampleCarouselImage from './ExampleCarouselImage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import { fetchBannerWithPageAndSection } from '../../services/userService';
import { Button, Typography } from "antd";
import Banner from './Banner';

const { Title, Text } = Typography;

function CarousalBanner() {
    const [index, setIndex] = useState(0);
    const user = useSelector((state) => state.userAuth);
    const isAuthenticUser = user && user.isAuthenticated;
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
        const options = {
            strings: ["Growing Community ", "Business Growth ", "Search Partner"],
            typeSpeed: 80,
            backSpeed: 80,
            loop: true,
        };

        if (typedRef.current) {
            const typedInstance = new Typed(typedRef.current, options);
            return () => {
                typedInstance.destroy();
            };
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % imageUrls.length
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [imageUrls]);



    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const options = {
        strings: ["Become a member"],
        typeSpeed: 80,
        backSpeed: 80,
        loop: false,
        onTypingPaused: (arrayPos, self) => {
            const text = self.strings[arrayPos];
            setButtonText(text);
        }
    };

    return (
        <>
            {
                isMultiBanner ? (

                    <div id="banners-section" className="" >
                        <div className="container">
                            <div className="text-success fw-bold fs-6">
                                <marquee className="">"Building Bridges, Creating Bonds: Social Bharat is your gateway to community connections,
                                    meaningful relationships, and professional growth. Discover a platform where community thrives,
                                    love blossoms, careers take flight, and services unite. Explore Matrimonial Bliss, Career Opportunities,
                                    Business Networking, and more. Join us on the journey of empowerment and shared prosperity.
                                    Your community, your connection, your Social Bharat. #CommunityConnections #Matrimony #JobSearch #ServiceSearch #SocialBharat 🌐💑👔🛠️"
                                </marquee>
                            </div>
                            <div className='' style={{ objectFit: 'cover', height: '400px', width: '100%' }}>
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    {
                                        imageUrls && imageUrls.length > 0 && imageUrls.map((item, index) => (

                                            <Carousel.Item key={index}>
                                                <div style={{ position: 'relative', width: '100%', height: '400px', objectFit: 'cover' }}>
                                                    <img src={item} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />

                                                </div>
                                                <Carousel.Caption>
                                                    <div className="hero-section">
                                                        {!isAuthenticUser && (
                                                            <div className="">
                                                                <a
                                                                    className="btn"
                                                                    onClick={handleBecomeMemberClick}
                                                                    style={{
                                                                        color: '',
                                                                        fontSize: '20px',
                                                                        fontWeight: 'bold',
                                                                        backgroundColor: 'transparent',
                                                                        border: '2px solid yellow',
                                                                        transition: 'transform 0.3s ease',
                                                                        display: 'inline-block'
                                                                    }}
                                                                    onMouseEnter={(e) => e.target.style.transform = 'scale(2)'}
                                                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                                >
                                                                    Become a member
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Carousel.Caption>
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