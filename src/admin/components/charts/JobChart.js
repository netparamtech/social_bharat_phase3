import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { fetchAllUsersWithCommunity } from '../../services/AdminService';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import { useNavigate } from 'react-router';
import { Statistic } from 'antd';
import CountUp from "react-countup";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const formatter = (value) => <CountUp end={value} separator="," />;

const JobChart = (props) => {
    const { statistics } = props;
    const [data, setData] = useState([]);
    const [isPieClicked, setIsPieClicked] = useState(false);
    const [isLight, setIsLight] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [options, setOptions] = useState({
        animationEnabled: true,
        exportEnabled: true,
        theme: "light",
        title: {
            text: "Jobs Statistics"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: []
        }]
    });

    const handlePieClicked = () => {
        setIsPieClicked(!isPieClicked);
    }

    const formatDate = (dateString) => {
        const options = {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
      };
    useEffect(() => {
        if (statistics) {
            setData(statistics.applied_job_details)
        }
    }, [statistics]);
    useEffect(() => {
        if (data.length > 0) {
            const chartDataPoints = data.map(item => ({
                label: `${item.job_title} - ${item.company} - ${formatDate(item.job_start_date)}`, // Modify label based on chart type
                y: item.totalCount,
                company: item.company, // Include company in dataPoints
                jobStartDate: item.job_start_date // Include job_start_date in dataPoints
            }));
    
            if (isPieClicked) {
                setOptions(prevOptions => ({
                    ...prevOptions,
                    data: [{
                        type: "pie",
                        indexLabel: "{label}: {y}",
                        startAngle: -90,
                        dataPoints: chartDataPoints
                    }]
                }));
            } else {
                setOptions(prevOptions => ({
                    ...prevOptions,
                    data: [{
                        type: "column",
                        dataPoints: chartDataPoints
                    }]
                }));
            }
        }
    }, [data, isPieClicked]);
    

    return (
        <div className=''>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-success' onClick={handlePieClicked}>{isPieClicked ? 'Show Column Chart' : 'Show Pie Chart'}</button>
                {/* <Statistic className=''
                    value={totalUsers}
                    formatter={formatter}
                /> */}
            </div>
            <div className='mt-2'>
                <CanvasJSChart options={options} />
            </div>
        </div>
    );
}

export default JobChart;
