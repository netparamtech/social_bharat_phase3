import Education from "./subComponents/Education";
import { Collapse } from 'antd';

const EducationInfo = (props) => {
  const {userDetails} = props;
  const items = [
    {
      key: '1',
      label: 'See Education Info',
      children: <p><Education userDetails={userDetails} /></p>,
    },
  ]
    return <Collapse items={items} defaultActiveKey={[]} className='container bg-success col-md-9 w-100 w-lg-75 mt-3' />;
 };

export default EducationInfo;
