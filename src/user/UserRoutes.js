import LoginWithPassword from "./components/login/LoginWithPassword";
import ChangePasswordPage from "./pages/profile/update/ChangePasswordPage";
import SetPasswordPage from "./pages/SetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UpdateBasicProfilePage from "./pages/profile/update/UpdateBasicProfilePage";
import UpdateBusinessPage from "./pages/profile/update/UpdateBusinessPage";
import UpdateContactPage from "./pages/profile/update/UpdateContactPage";
import UpdateEducationPage from "./pages/profile/update/UpdateEducationPage";
import UpdateJobPage from "./pages/profile/update/UpdateJobPage";
import UpdateMatrimonialPage from "./pages/profile/update/UpdateMatrimonialPage";
import UpdateMobilePage from "./pages/profile/update/UpdateMobilePage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import SearchPartnerPage from "./pages/SearchPartnerPage";
import SearchBusinessPage from "./pages/SearchBusinessPage";
import BlockUserPage from "./pages/BlockUserPage";
import ContactPage from "./pages/ContactPage";
import UserRatingPage from "./pages/UserRatingPage";
import AboutPage from "./pages/AboutPage";
import EventPage from "./pages/EventPage";
import BusinessInfoPage from "./pages/profile/update/BusinessInfoPage";
import JobInfoPage from "./pages/profile/update/JobInfoPage";
import ContactInfoPage from "./pages/profile/update/ContactInfoPage";
import SettingPage from "./pages/SettingPage";
import ViewCommunityPage from "./pages/ViewCommunityPage";
import ServicesPage from "./pages/ServicesPage";
import RegisteredServicesPage from "./pages/RegisteredServicesPage";
import UpdateRegisteredServicePage from "./pages/UpdateRegisteredServicePage";
import SearchUsersWithServicePage from "./pages/SearchUsersWithServicePage";
import CreateJobPage from "./pages/CreateJobPage";
import OurSocialBharatProvidesPage from "./pages/OurSocialBharatProvidesPage";
import UserAppliedJobDetailPage from "./pages/UserAppliedJobDetailPage";
import AllAppliedJobsPage from "./pages/AllAppliedJobsPage";
import SearchEventsPage from "./pages/SearchEventsPage";
import MyEventsPage from "./pages/MyEventsPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import ActivityPage from "./pages/ActivityPage";
import ActivityIndexPage from "./pages/ActivityIndexPage";
import UpdateActivityPage from "./pages/UpdateActivityPage";
import CreateJobProfilePage from "./pages/CreateJobProfilePage";
import CreateMatrimonialPage from "./pages/profile/update/CreateMatrimonialPage";
import JobsPage from "./pages/JobsPage";
import UserServiceInfoPage from "./pages/UserServiceInfoPage";
import ChatBoardPage from "./pages/ChatBoardPage";
import CreateEducationPage from "./pages/profile/update/CreateEducationPage";
import GridController from "./components/grid/GridController";

const UserRoutes = () => {
    return [
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
            path: '/contact',
            component: ContactPage,
            exact: true
        },

        {
            path: '/change/password',
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
            path: '/profile/:scrollValue',
            component: ProfilePage,
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
            path: '/user/create-matrimonial-profile',
            component: CreateMatrimonialPage,
            exact: true
        },
        {
            path: '/user/update-matrimonial-profile/:id',
            component: UpdateMatrimonialPage,
            exact: true
        },

        {
            path: '/user/update-job-profile',
            component: UpdateJobPage,
            exact: true
        },
        {
            path: '/user/create-job-profile',
            component: CreateJobProfilePage,
            exact: true
        },

        {
            path: '/user/jobs/view',
            component: JobInfoPage,
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
            path: '/user/contacts/view',
            component: ContactInfoPage,
            exact: true
        },

        {
            path: '/user/update-education-profile/:id',
            component: UpdateEducationPage,
            exact: true
        },

        {
            path: '/user/create-education-profile',
            component: CreateEducationPage,
            exact: true
        },

        {
            path: '/user/update-business-profile',
            component: UpdateBusinessPage,
            exact: true
        },

        {
            path: '/user/update-business-profile/:id',
            component: UpdateBusinessPage,
            exact: true
        },

        {
            path: '/user/businesses/view',
            component: BusinessInfoPage,
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

        {
            path: '/user/search/partner',
            component: SearchPartnerPage,
            exact: true
        },

        {
            path: '/user/search/business',
            component: SearchBusinessPage,
            exact: true
        },

        {
            path: '/user/block',
            component: BlockUserPage,
            exact: true
        },

        {
            path: '/user/rating',
            component: UserRatingPage,
            exact: true
        },

        {
            path: '/about',
            component: AboutPage,
            exact: true
        },

        {
            path: '/event',
            component: EventPage,
            exact: true
        },

        {
            path: '/user/setting',
            component: SettingPage,
            exact: true
        },

        {
            path: '/:name',
            component: ViewCommunityPage,
            exact: true
        },

        {
            path: '/user/search/service',
            component: ServicesPage,
            exact: true
        },

        {
            path: '/user/user-registered-services',
            component: RegisteredServicesPage,
            exact: true
        },

        {
            path: '/user/update/user-registered-service/:id',
            component: UpdateRegisteredServicePage,
            exact: true
        },

        {
            path: '/users-basedOn-services/:title',
            component: SearchUsersWithServicePage,
            exact: true
        },

        {
            path: '/user/job/create',
            component: CreateJobPage,
            exact: true
        },
        {
            path: '/social-bharat-provides',
            component: OurSocialBharatProvidesPage,
            exact: true
        },

        {
            path: '/user/applied/:id/job-details',
            component: UserAppliedJobDetailPage,
            exact: true
        },
        {
            path: '/user/all/applied/jobs',
            component: AllAppliedJobsPage,
            exact: true
        },
        {
            path: '/user/search/events',
            component: SearchEventsPage,
            exact: true
        },
        {
            path: '/user/my-events',
            component: MyEventsPage,
            exact: true
        },
        {
            path: '/user/my-event/:id/update',
            component: UpdateEventPage,
            exact: true
        },
        {
            path: '/user/post-activity',
            component: ActivityPage,
            exact: true
        },
        {
            path: '/users/activities',
            component: ActivityIndexPage,
            exact: true
        },
        {
            path: '/user/activity/update/:id',
            component: UpdateActivityPage,
            exact: true
        },
        {
            path: '/user/search/job',
            component: JobsPage,
            exact: true
        },
        {
            path: '/user/service/info/:id',
            component: UserServiceInfoPage,
            exact: true
        },
        {
            path: '/user/chat/board',
            component: ChatBoardPage,
            exact: true
        },
        {
            path: '/grid',
            component: GridController,
            exact: true
        },

    ];
}

export default UserRoutes;