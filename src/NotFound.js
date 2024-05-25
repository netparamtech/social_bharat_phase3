import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Result } from 'antd';
import { useSpring, animated } from "react-spring";

const NotFound = () => {
    const navigate = useNavigate();
    const springProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <animated.div style={springProps}>
            <div style={styles.container}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button variant="success" onClick={goBack} style={styles.button}>
                        Go back to the previous page
                    </Button>}
                />
                <div className="hover-pointer" style={styles.contacts} onClick={()=>navigate('/contact')} >
                </div>
            </div>
            
        </animated.div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        backgroundColor: "#f8f9fa",
        display:'flex',
        flexDirection:'column',
        
    },
    button: {
        fontSize: "1em",
        padding: "10px 20px",
    },
    contacts: {
        width: "200px",
        height: "40px",
        marginTop: "20px",
        backgroundImage: 'url("/user/images/contact-us.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius:'20px'
    },
};

export default NotFound;
