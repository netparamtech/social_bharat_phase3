import Homepage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';

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
        path: '/profile',
        component: ProfilePage,
        exact: true
    }

]

export default userRoutes;