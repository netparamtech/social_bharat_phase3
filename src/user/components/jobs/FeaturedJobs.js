import { Divider, Table } from "antd";

const FeaturedJobs = () => {
    const defaultImage = '/user/images/job1.png';
    const dataSource = [
        {
            key: '1',
            company: 'Company Name',
            job_title: 'Job Title',
            apply_form: true,
            photo: '/user/images/job1.png',
            location: "Address",
            age: 32,
            address: '10 Downing Street',
            description: 'Description'
        },

    ];

    const truncateDescription = (description, maxLength) => {
        return description.length > maxLength ? description.slice(0, maxLength) + "...." : description;
    }

    const columns = [
        {
            title: 'Featured Jobs', dataIndex: 'title', className: 'mx-auto text-muted shadow fs-6',
            render: (text, record) => (


                <div className="services-hover hover-pointer"
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
                        {/* <button type="button" className="btn btn-primary btn-sm">Apply</button> */}
                        <div className="row mt-4">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <button type="submit" className="btn btn-primary w-100">
                        Apply
                        </button>
                      </div>
                    </div>
                    </div>
                </div>

            ),
        },

    ];


    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}
export default FeaturedJobs;