import CountUp from 'react-countup';
import { Col, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { fetchAdminDashboardStatistics } from '../services/AdminService';
import { useNavigate } from 'react-router-dom';

const formatter = (value) => <CountUp end={value} separator="," />;
const BodyContent = () => {
    const [statistics, setStatistics] = useState('');

    const navigate = useNavigate();

    const fetchDashboardStatistics = async () => {
        try {
            const response = await fetchAdminDashboardStatistics();
            if (response && response.status === 200) {
                setStatistics(response.data.data);
            }
        } catch (error) {
            // Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        }
    }

    const maxProgressValue = 100;  // Maximum value for the progress bar

    // Calculate the width as a percentage based on the current value
    const progressWidth = `${(statistics && statistics.interested_for_marriage_count) || 0}%`;


    useEffect(() => {
        fetchDashboardStatistics();
    }, []);
    return (
        <>
            {/* <!-- Page Heading --> */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
            </div>

            {/* <!-- Content Row --> */}
            <div className="row">

                {/* <!-- Earnings (Monthly) Card Example --> */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col mr-2">

                                    <div className="h5 mb-0 font-weight-bold text-gray-800"><Statistic title="ACTIVE USERS" value={statistics && statistics.user_count} formatter={formatter} /></div>
                                </div>
                                <div className="col-auto">
                                    <h1>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            fill="currentColor"
                                            className="bi bi-people text-gray-300"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                                        </svg>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Earnings (Monthly) Card Example --> */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col mr-2">
                                    <div className="h5 mb-0 font-weight-bold text-gray-800"><Statistic title={<span className='text-xs font-weight-bold text-success text-uppercase mb-1'>ENQUIRES</span>} value={statistics && statistics.enquiry_count} formatter={formatter} /></div>
                                </div>
                                <div className="col-auto">
                                    <h1> <i className="fa fa-question-circle h-20 text-gray-300" aria-hidden="true"></i></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Earnings (Monthly) Card Example --> */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col mr-2">
                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800"><Statistic title={<span className='text-xs font-weight-bold text-info text-uppercase mb-1'>MATRIMONIALS</span>} value={statistics && statistics.interested_for_marriage_count} formatter={formatter} /></div>
                                        </div>
                                        <div className="col">
                                            <div className="progress progress-sm mr-2">
                                                <div className="progress-bar bg-info" role="progressbar"
                                                    style={{ width: progressWidth }}
                                                    aria-valuenow={(statistics && statistics.interested_for_marriage_count) || 0}
                                                    aria-valuemin="0"
                                                    aria-valuemax={maxProgressValue}>
                                                    {progressWidth}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <h1> <i className="fa fa-heart text-gray-300"></i></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Pending Requests Card Example --> */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col mr-2">
                                    <div className="col mr-2">

                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1"><Statistic title="Total Events" value={statistics && statistics.event_count} formatter={formatter} /></div>
                                    </div>

                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BodyContent;