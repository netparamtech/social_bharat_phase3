import { useSelector } from "react-redux";

export const MyToken = () => {
    const token = useSelector((state) => state.userAuth.token.token);
    return token;
}

