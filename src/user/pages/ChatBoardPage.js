import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import Chat from "../components/chatFull/Chat";
import AndroidChat from "../components/chatFull/AndroidChat";

const ChatBoardPage = () => {
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
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

    return (
        <UserLayout>
            {
                isAndroidUsed ? <AndroidChat /> : <Chat />
            }
        </UserLayout>
    );
}

export default ChatBoardPage;