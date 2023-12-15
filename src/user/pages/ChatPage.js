import Chat from "../components/chats/Chat";
import UserLayout from "../layouts/UserLayout";

const ChatPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <UserLayout>
            <Chat />
        </UserLayout>
    );
}

export default ChatPage;