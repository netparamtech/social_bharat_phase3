import { useEffect } from "react";
import UserLayout from "../layouts/UserLayout";
import SearchEvent from "../components/search/SearchEvent";

const SearchEventPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return(
        <UserLayout>
            <SearchEvent />
        </UserLayout>
    );
}

export default SearchEventPage;