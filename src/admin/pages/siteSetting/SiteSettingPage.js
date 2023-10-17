import { useEffect } from "react";
import SiteSetting from "../../components/siteSetting/siteSetting";
import AdminLayout from "../../layouts/AdminLayout";

const SiteSettingPage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);
    return(
      <AdminLayout>
        <SiteSetting />
      </AdminLayout>
    );
}

export default SiteSettingPage;