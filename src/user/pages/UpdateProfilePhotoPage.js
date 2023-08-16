import SideBar from "../components/ProfilePage/SideBar";
import UpdateProfilePhoto from "../components/UpdateProfilePhoto";
import UserLayout from "../layouts/UserLayout";
import '../css/dropzone.css';

const UpdateProfilePhotoPage = () => {
    return (
        <UserLayout>
            <div id="profile-page-bg">
                <div className="container">
                    <div id="profile-page">
                        <div className="row">
                                <UpdateProfilePhoto />
                        </div>
                    </div>
                </div>
            </div>

        </UserLayout >
    );
}

export default UpdateProfilePhotoPage;