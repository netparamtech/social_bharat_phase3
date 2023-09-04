import Homepage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import UpdateProfilePhotoPage from './pages/UpdateProfilePhotoPage';
import UpdateMobilePage from './pages/UpdateMobilePage';
import UpdateBasicProfilePage from './pages/UpdateBasicProfilePage';
import UpdateMatrimonialPage from './pages/UpdateMatrimonialPage';
import UpdateJobPage from './pages/UpdateJobPage';
import UpdateContactPage from './pages/UpdateContactPage';
import UpdateEducationPage from './pages/UpdateEducationPage';
import UpdateBusinessPage from './pages/UpdateBusinessPage';
import LoginWithPassword from './components/LoginWithPassword';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import SetPasswordPage from './pages/SetPasswordPage';
import SearchPage from './pages/search/SearchPage';

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
        path: '/register',
        component: RegisterPage,
        exact: true
    },

    {
        path: '/update-password',
        component: UpdatePasswordPage,
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