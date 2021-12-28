import { Img } from "@chakra-ui/react";


const ChartListItem = (props) => {
    const {encodeId, index, thumbnail, title, artistsNames} = props;
    return (
        <div className="list song-data" key={encodeId}>
            <div className="song-left">
                <div className="ranking"><span className={`number${index+1}`}>{index + 1}</span></div>
                <Img src={thumbnail} w={"100%"} h={"100%"}/>
            </div>
            <div className="song-info">
                <span className="song-title">{title}</span>
                <span className="song-artists">{artistsNames}</span>
            </div>
            <div className="song-right">12%</div>
        </div>
     
    )

}

export default ChartListItem;