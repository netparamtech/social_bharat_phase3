import LoginWithPassword from "./components/login/LoginWithPassword";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import SetPasswordPage from "./pages/SetPasswordPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UpdateBasicProfilePage from "./pages/profile/update/UpdateBasicProfilePage";
import UpdateBusinessPage from "./pages/profile/update/UpdateBusinessPage";
import UpdateContactPage from "./pages/profile/update/UpdateContactPage";
import UpdateEducationPage from "./pages/profile/update/UpdateEducationPage";
import UpdateJobPage from "./pages/profile/update/UpdateJobPage";
import UpdateMatrimonialPage from "./pages/profile/update/UpdateMatrimonialPage";
import UpdateMobilePage from "./pages/profile/update/UpdateMobilePage";
import RegisterPage from "./pages/register/RegisterPage";
import SearchPage from "./pages/search/SearchPage";

const userRoutes = [
    {
        path: '/',
        component: HomePage,
        exact: true
    },

    {
        path: '/login',
        component: LoginPage,
        exact: true
    },

    
    {
        path: '/register',
        component: RegisterPage,
        exact: true
    },

    {
        path: '/change-password',
        component: ChangePasswordPage,
        exact: true
    },

    {
        path: '/set-password',
        component: SetPasswordPage,
        exact: true
    },

    {
        path: '/dashboard',
        component: DashboardPage,
        exact: true
    },

    {
        path: '/profile',
        component: ProfilePage,
        exact: true
    },

    {
        path: '/update-mobile',
        component: UpdateMobilePage,
        exact: true
    },

    {
        path: '/user/update-basic-profile',
        component: UpdateBasicProfilePage,
        exact: true
    },

    {
        path: '/user/update-matrimonial-profile',
        component: UpdateMatrimonialPage,
        exact: true
    },

    {
        path: '/user/update-job-profile',
        component: UpdateJobPage,
        exact: true
    },

    {
        path: '/user/update-job-profile/:id',
        component: UpdateJobPage,
        exact: true
    },

    {
        path: '/user/update-contact',
        component: UpdateContactPage,
        exact: true
    },

    {
        path: '/user/update-contact/:id',
        component: UpdateContactPage,
        exact: true
    },

    {
        path: '/user/update-education-profile/:id',
        component: UpdateEducationPage,
        exact: true
    },

    {
        path: '/user/update-education-profile',
        component: UpdateEducationPage,
        exact: true
    },

    {
        path: '/update-business-profile',
        component: UpdateBusinessPage,
        exact: true
    },

    {
        path: '/login-with-password',
        component: LoginWithPassword,
        exact: true
    },

    {
        path: '/user/search',
        component: SearchPage,
        exact: true
    },
   
]

export default userRoutes;