import Grid from "./Grid";
import "./grid.css";

const GridController = ({item}) => {
    return(
        <div className="" style={{display:'flex',justifyContent:'center',borderRadius:'10px'}}>
            <Grid item={item} />
        </div>
    );
}
export default GridController;