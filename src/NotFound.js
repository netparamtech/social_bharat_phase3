import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useSpring, animated } from "react-spring";

const NotFound = () => {
    const navigate = useNavigate();
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <animated.div style={{ ...styles.container, ...props }}>
            <Card style={styles.card}>
                <Card.Body>
                    <h1 style={styles.heading}>404 - Page Not Found</h1>
                    <p style={styles.text}>
                        Oops! The page you are looking for might be in another castle.
                    </p>
                    <Button variant="success" className="mx-auto" onClick={goBack} style={styles.link}>
                        Go back to the previous page
                    </Button>
                </Card.Body>
            </Card>
        </animated.div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        minWidth: "300px",
        maxWidth: "600px",
        textAlign: "center",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        fontSize: "2em",
        margin: "10px 0",
        color: "#333",
    },
    text: {
        fontSize: "1.2em",
        color: "#555",
    },
    link: {
        fontSize: "1.2em",
        marginTop: "20px",
        cursor: "pointer",
        display: "block",
    },
};

export default NotFound;
