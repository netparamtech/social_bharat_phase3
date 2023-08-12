import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

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
]

export default adminRoutes;