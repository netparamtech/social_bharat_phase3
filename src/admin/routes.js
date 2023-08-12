import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ChangeProfilePage from "./pages/ChangeProfilePage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import UpdateCommunityPage from "./pages/UpdateCommunityPage";

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
]

export default adminRoutes;