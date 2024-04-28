import Jobs from "../components/jobs/Jobs";
import UserLayout from "../layouts/UserLayout";
import './css/jobBoard.css';

const JobsPage = () => {
    return(
        <UserLayout>
            <Jobs />
        </UserLayout>
    );
}
export default JobsPage;