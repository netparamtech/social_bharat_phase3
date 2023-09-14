import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UsersIndex from "./pages/user/UsersIndex";
import PasswordUpdatePage from "./pages/PasswordUpdatePage";
import Community from "./pages/communities/create/Community";
import UpdateCommunity from "./pages/communities/update/UpdateCommunity";
import Index from "./pages/communities/list/Index";
import ViewUser from "./pages/user/ViewUser";
import Banners from "./pages/banners/Banners";
import UpdateBannerPage from "./pages/banners/UpdateBannerPage";
import Degrees from "./pages/degrees/Degrees";
import ChangeProfilePage from "./pages/ChangeProfilePage";
import CreateDegreePage from "./pages/degrees/CreateDegreePage";

import UpdateDegreePage from "./pages/degrees/UpdateDegreePage";
import BusinessCategoriesPage from "./pages/businessCategories/BusinessCategoriesPage";
import CreateBusinessCategoriesPage from "./pages/businessCategories/CeateBusinessCategoriesPage";
import UpdateBusinessCategoriePage from "./pages/businessCategories/UpdateBusinessCategoriesPage";

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
        path: '/admin/update-banner',
        component: UpdateBannerPage,
        exact: true
    },

    {
        path: '/admin/Communities',
        component: Index,
        exact: true
    },

    {
        path: '/admin/banners',
        component: Banners,
        exact: true
    },

    {
        path: '/admin/banners/update/:bannerPage/:bannerSection',
        component: UpdateBannerPage,
        exact: true
    },

    {
        path: '/admin/banner/create',
        component: UpdateBannerPage,
        exact: true
    },

    {
        path: '/admin/degrees',
        component: Degrees,
        exact: true
    },

    {
        path: '/admin/degree/create',
        component: CreateDegreePage,
        exact: true
    },

    {
        path: '/admin/degree/update/:id',
        component: UpdateDegreePage,
        exact: true
    },

    {
        path: '/admin/business-categories',
        component: BusinessCategoriesPage,
        exact: true
    },

    {
        path: '/admin/business-categories/create',
        component: CreateBusinessCategoriesPage,
        exact: true
    },

    {
        path: '/admin/business-categories/update/:id',
        component: UpdateBusinessCategoriePage,
        exact: true
    },

    {
        path: '/admin/users',
        component: UsersIndex,
        exact: true
    },

    {
        path: '/admin/change-password',
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