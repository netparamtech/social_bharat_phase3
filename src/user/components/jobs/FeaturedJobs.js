import { Divider, Table } from "antd";

const FeaturedJobs = () => {
    const defaultImage = '/user/images/job1.png';
    const dataSource = [
        {
            key: '1',
            company: 'Netparam',
            job_title: 'UI & UX developer',
            apply_form: true,
            photo: '/user/images/job1.png',
            location: "747, Janpath, Rani Sati nagar, Nirman nagar, Jaipur-302019",
            age: 32,
            address: '10 Downing Street',
            description: 'jhvghjvjhvjhvugf bvbvjhgvjvj jhvjhvjhvjhvj hjbjhjhbvjbjbjbjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjkjbjk kjhjhkjhbkjbkjbkjbkjb vjhvjhvghvgvjvj vjhvjhvjhvjhvbjhvjhbjhbjhbjhbjhbjhjbj hjbjhbjhbjbjbvjbjbjbkjbkjbkjbkjbkbkjbkjb'
        },

    ];

    const truncateDescription = (description, maxLength) => {
        return description.length > maxLength ? description.slice(0, maxLength) + "...." : description;
    }

    const columns = [
        {
            title: 'Featured Jobs', dataIndex: 'title', className: 'mx-auto text-muted',
            render: (text, record) => (


                <div className="m-2 services-hover hover-pointer"
                // onClick={() => navigate(`/users-basedOn-services/${record.title}`)}
                >
                    <p className="text-muted mx-auto"> {record.company}</p>
                    <img src={record.photo ? record.photo : defaultImage} className="" width="100%" height={200} />
                    <div className="text-muted"><b>{record.job_title}</b></div>
                    <Divider />
                    <div className="row">
                        <p className="text-muted">{record.location}</p>
                        <Divider />
                        <p className="truncate-text-job text-muted">{truncateDescription(record.description, 250)}</p>
                        <button type="button" className="btn btn-success">Apply</button>
                    </div>
                </div>

            ),
        },

    ];


    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    );
}
export default FeaturedJobs;