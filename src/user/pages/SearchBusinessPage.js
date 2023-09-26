import { useEffect } from "react";
import SearchBusiness from "../components/search/SearchBusiness";
import UserLayout from "../layouts/UserLayout";

const SearchBusinessPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return(
        <UserLayout>
            <SearchBusiness />
        </UserLayout>
    );
}

export default SearchBusinessPage;