import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateBannerPage from "./pages/CreateBannerPage";
import UpdateBannerPage from "./pages/UpdateBannerPage";
import SettingPage from "./pages/SettingPage";
import BannerIndex from "./pages/BannerIndex";
import UsersIndex from "./pages/UsersIndex";
import PasswordUpdatePage from "./pages/PasswordUpdatePage";
import Community from "./pages/communities/create/Community";
import UpdateCommunity from "./pages/communities/update/UpdateCommunity";
import Index from "./pages/communities/list/Index";
import ViewUser from "./pages/user/ViewUser";
import ChangeProfilePicturePage from "./pages/ChangeProfilePicturePage";
import ChangeBasicDetailsPage from "./pages/ChangeBasicDetailsPage";

const adminRoutes = [
    {
        path: '/admin',
        component: LoginPage,
        exact: true
    },

    {
        path: '/admin/dashboard',
        component: DashboardPage,
        exact: true
    },

    {
        path: '/admin/change-profile-picture',
        component: ChangeProfilePicturePage,
        exact: true
    },

    {
        path: '/admin/change-basic-informations',
        component: ChangeBasicDetailsPage,
        exact: true
    },

    {
        path: '/admin/create/community',
        component: Community,
        exact: true
    },

    {
        path: '/admin/update/community/:id',
        component: UpdateCommunity,
        exact: true
    },

    {
        path: '/admin/create-banner',
        component: CreateBannerPage,
        exact: true
    },

    {
        path: '/admin/update-banner',
        component: UpdateBannerPage,
        exact: true
    },

    {
        path: '/admin/setting',
        component: SettingPage,
        exact: true
    },

    {
        path: '/admin/Communities',
        component: Index,
        exact: true
    },

    {
        path: '/admin/banner/index',
        component: BannerIndex,
        exact: true
    },

    {
        path: '/admin/users',
        component: UsersIndex,
        exact: true
    },

    {
        path: '/admin/update-password',
        component: PasswordUpdatePage,
        exact: true
    },

    {
        path: '/users/view/:id',
        component: ViewUser,
        exact:true
    }
]

export default adminRoutes;