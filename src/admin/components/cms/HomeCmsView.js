import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const gridStyle = {
    width: '100%',
    textAlign: 'center',
};
const HomeViewCms = (props) => {
    const { homeCms } = props;
    const navigate = useNavigate();
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0 text-gray-800">Content Management System (CMS)</h5>
                <a href="" className="btn btn-sm btn-primary shadow-sm"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/admin/cms/update');
                    }}
                >
                    Update CMS
                </a>
            </div>
            <Card title="About Section (CMS)">

                <h4 className="card-title">{homeCms && homeCms.about && homeCms.about.title && homeCms.about.title}</h4>
                <h5 className="card-subtitle mb-2 text-muted">{homeCms && homeCms.about && homeCms.about.subtitle && homeCms.about.subtitle}</h5>
                <p className="card-text" dangerouslySetInnerHTML={{
                    __html: homeCms && homeCms.about && homeCms.about.content && homeCms.about.content,
                }}></p>
            </Card>

            <Card title="Services (CMS)" className="mt-2">
                <Card.Grid style={gridStyle}><h5 className="card-title">
                    {homeCms && homeCms.services && homeCms.services.section_title}</h5>
                </Card.Grid>
                <ul className="list-group list-group-flush">
                    {homeCms && homeCms.services && homeCms.services.items.map((item, index) => (
                        <li className="list-group-item" key={index}>
                            <h6>{item.title}</h6>
                            <p dangerouslySetInnerHTML={{
                                __html: item.content,
                            }}></p>
                            <i className={`fas ${item.icon} me-2`}></i>
                        </li>
                    ))}
                </ul>

            </Card>

        </div>
    );
}
export default HomeViewCms;