const HomeViewCms = (props) => {
    const { homeCms } = props;
    return (
        <div>
            <div className="card">
                <div className="card-body">

                    <h4 className="card-title">{homeCms&&homeCms.about&&homeCms.about.title&&homeCms.about.title}</h4>
                    <h5 className="card-subtitle mb-2 text-muted">{homeCms&&homeCms.about&&homeCms.about.subtitle&&homeCms.about.subtitle}</h5>
                    <p className="card-text" dangerouslySetInnerHTML={{
                        __html: homeCms&&homeCms.about&&homeCms.about.content&&homeCms.about.content,
                    }}></p>
                </div>
            </div>

            <div className="card mt-2">
                <div className="card-body">
                    <h5 className="card-title">{homeCms&&homeCms.services&&homeCms.services.section_title}</h5>
                    <ul className="list-group list-group-flush">
                        {homeCms&&homeCms.services&&homeCms.services.items.map((item, index) => (
                            <li className="list-group-item" key={index}>
                                <h6>{item.title}</h6>
                                <p dangerouslySetInnerHTML={{
                        __html: item.content,
                    }}></p>
                                <i className={`fas ${item.icon} me-2`}></i>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default HomeViewCms;