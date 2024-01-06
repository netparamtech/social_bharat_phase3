import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { fetchAllUsersWithCommunity } from '../../services/AdminService';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import { useNavigate } from 'react-router';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const UsersChart = () => {
    const [data, setData] = useState([]);
    const [isPieClicked, setIsPieClicked] = useState(false);
    const [isLight, setIsLight] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [options, setOptions] = useState({
        animationEnabled: true,
        exportEnabled: true,
        theme: "light",
        title: {
            text: "Community Statistics"
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

    const fetchData = async () => {
        dispatch(setLoader(true));
        try {
            const response = await fetchAllUsersWithCommunity();
            setData(response.data.data);

            const chartDataPoints = response.data.data.map(item => ({
                label: item.name,
                y: item.totalCount
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
            dispatch(setLoader(false));
        } catch (error) {
            dispatch(setLoader(false));
            if (error.response && error.response.status === 401) {
                navigate('/admin');
            }
            else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [isPieClicked]);

    return (
        <div className=''>
            <div>
                <button className='btn btn-success' onClick={handlePieClicked}>{isPieClicked ? 'Show Column Chart' : 'Show Pie Chart'}</button>
            </div>
            <div className='mt-2'>
                <CanvasJSChart options={options} />
            </div>
        </div>
    );
}

export default UsersChart;
