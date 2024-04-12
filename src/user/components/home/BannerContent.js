import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Typography } from "antd";

const { Title, Text } = Typography;

const BannerContent = () => {
    const typedRef = useRef(null); // Use a single ref for Typed instance

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


    return (
        <div id="" className="">
            <div>
                <Title level={2}>Social Bharat Helps</Title>
                <h2>
                    <Text className="h2 typed" ref={typedRef}></Text>
                </h2>
            </div>
        </div>
    );
};

export default BannerContent;
