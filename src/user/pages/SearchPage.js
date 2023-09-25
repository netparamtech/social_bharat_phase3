import { useEffect } from "react";
import SearchPeople from "../components/search/SearchPeople";
import UserLayout from "../layouts/UserLayout";

const SearchPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return(
        <UserLayout>
            <SearchPeople />
        </UserLayout>
    );
}

export default SearchPage;