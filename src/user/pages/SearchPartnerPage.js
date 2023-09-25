import { useEffect } from "react";
import SearchPartner from "../components/search/SearchPartner";
import UserLayout from "../layouts/UserLayout";

const SearchPartnerPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return(
        <UserLayout>
            <SearchPartner />
        </UserLayout>
    );
}

export default SearchPartnerPage;