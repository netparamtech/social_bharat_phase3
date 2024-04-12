import { useEffect } from 'react';
import UserLayout from '../../../layouts/UserLayout';
import CreateMatrimonial from '../../../components/ProfilePage/CreateMatrimonial';

const CreateMatrimonialPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <UserLayout>
            <CreateMatrimonial />
        </UserLayout>
    );
};

export default CreateMatrimonialPage;