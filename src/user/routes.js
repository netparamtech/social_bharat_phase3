import Homepage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import SetPasswordPage from './pages/SetPasswordPage';
import UpdateProfilePhotoPage from './pages/UpdateProfilePhotoPage';
import UpdateMobilePage from './pages/UpdateMobilePage';
import UpdateBasicProfilePage from './pages/UpdateBasicProfilePage';

const userRoutes = [
    {
        path: '/',
        component: Homepage,
        exact: true
    },

    {
        path: '/login',
        component: LoginPage,
        exact: true
    },

    {
        path: '/otp',
        component: OtpPage,
        exact: true
    },

    
    {
        path: '/register',
        component: RegisterPage,
        exact: true
    },

    {
        path: '/setPassword',
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
        path: '/update-photo',
        component: UpdateProfilePhotoPage,
        exact: true
    },

   

    {
        path: '/update-mobile',
        component: UpdateMobilePage,
        exact: true
    },

    {
        path: '/update-basic-profile',
        component: UpdateBasicProfilePage,
        exact: true
    },
   
]

export default userRoutes;