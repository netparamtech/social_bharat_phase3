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

const ServiceChart = (props) => {
    const { statistics } = props;
    const [data, setData] = useState([]);
    const [isPieClicked, setIsPieClicked] = useState(false);
    const [isLight, setIsLight] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [totalUsers,setTotalUsers] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [options, setOptions] = useState({
        animationEnabled: true,
        exportEnabled: true,
        theme: "light",
        title: {
            text: "Services Statistics"
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


    useEffect(() => {
        if (statistics) {
            setData(statistics.service_users)
        }
    }, [statistics]);
    useEffect(() => {
        if (data.length>0) {
            console.log(data[0].totalCount)
            setTotalUsers(data[0].totalCount)
            
            const chartDataPoints = data.map(item => ({
                label: item.title,
                y: item.groupCount
            }));
            if (isPieClicked) {
                setOptions(prevOptions => ({
                    ...prevOptions,
                    data: [{
                        type: "pie",
                        indexLabel: "{label}: {y}%",
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
    }, [data,isPieClicked]);

    return (
        <div className=''>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-success' onClick={handlePieClicked}>{isPieClicked ? 'Show Column Chart' : 'Show Pie Chart'}</button>
                <p className='text-danger'>Total Users in Services</p><b>
                <Statistic className=''
                        value={totalUsers}
                        formatter={formatter}
                      /></b>
            </div>
            <div className='mt-2'>
                <CanvasJSChart options={options} />
            </div>
        </div>
    );
}

export default ServiceChart;
