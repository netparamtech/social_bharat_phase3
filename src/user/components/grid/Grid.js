import { Image } from "antd";

const Grid = ({ item }) => {
    return (
        <div id="social-bharat-image-grid">
            <div className="grid-container">
                {item.map((imgSrc, index) => (
                    <div className={`grid-item item-${index + 1}`} key={index} style={{ top: '0', left: '0', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src={imgSrc} alt={`Image ${index + 1}`} 
                        style={{ top: '0', left: '0', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Grid;