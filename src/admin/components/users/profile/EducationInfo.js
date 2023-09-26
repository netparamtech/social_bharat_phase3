import Education from "./subComponents/Education";
import { Collapse } from 'antd';

const items = [
  {
    key: '1',
    label: 'See Education Info',
    children: <p><Education /></p>,
  },
]

const EducationInfo = () => {
 
    const onChange = (key) => {
      console.log(key);
    };
    return <Collapse items={items} defaultActiveKey={[]} onChange={onChange} className='container bg-success col-md-9 w-100 w-lg-75 mt-3' />;
 };

export default EducationInfo;
