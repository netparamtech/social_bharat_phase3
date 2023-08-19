import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ChangeProfilePage from "./pages/ChangeProfilePage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import UpdateCommunityPage from "./pages/UpdateCommunityPage";
import CreateBannerPage from "./pages/CreateBannerPage";
import UpdateBannerPage from "./pages/UpdateBannerPage";
import SettingPage from "./pages/SettingPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import BannerIndex from "./pages/BannerIndex";
import UsersIndex from "./pages/UsersIndex";
import PasswordUpdatePage from "./pages/PasswordUpdatePage";

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
        path: '/admin/change-profile',
        component: ChangeProfilePage,
        exact: true
    },

    {
        path: '/admin/create-community',
        component: CreateCommunityPage,
        exact: true
    },

    {
        path: '/admin/update-community',
        component: UpdateCommunityPage,
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
        path: '/admin/index',
        component: CommunitiesPage,
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
]

export default adminRoutes;