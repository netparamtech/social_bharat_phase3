import { useSelector } from "react-redux"

const MyToken = () => {
    const token = useSelector((state) =>state.auth.token.token);

    return token

}

export default MyToken;