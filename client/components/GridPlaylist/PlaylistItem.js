import { BsFillPlayFill } from 'react-icons/bs';
import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaySongById, setIsPlayingFalse, setIsPlayingTrue } from '../../store/actions';
import { Image } from '@chakra-ui/image';

const PlaylistItem = (props) => {
    const { photo, name, id} = props
    const dispatch = useDispatch()

    const isPlaying =  useSelector(state => state.ui.isPlaying);
    const currSongInfo =  useSelector(state => state.ui.currSongInfo);
    const previousSongInfo =  useSelector(state => state.ui.previousSongInfo);
    const refBtnPlaying = useRef([]);
    const refBtnPlay = useRef([]);
    const refOpacityBg = useRef([]);

   

    
    useEffect(() => {
        if(currSongInfo &&  currSongInfo.id && refBtnPlaying.current[currSongInfo.id]) {
            if(isPlaying) {
                refBtnPlaying.current[currSongInfo.id].style.display = "flex";
                refBtnPlaying.current[currSongInfo.id].style.opacity = "1";
                refBtnPlay.current[currSongInfo.id].style.display = "none";
                refOpacityBg.current[currSongInfo.id].style.opacity = "1";
           }
           else {        
                refBtnPlaying.current[currSongInfo.id].style.opacity = "0";
                refBtnPlay.current[currSongInfo.id].style.display = "flex";
                refBtnPlaying.current[currSongInfo.id].style.display = "none";
                refOpacityBg.current[currSongInfo.id].style.opacity = "0";
           }
        }
       
    }, [isPlaying, currSongInfo])
    
    useEffect(() => {
        if(previousSongInfo &&  previousSongInfo.id && previousSongInfo.id !== currSongInfo.id && refBtnPlaying.current[previousSongInfo.id]) {
            refBtnPlaying.current[previousSongInfo.id].style.opacity = "0";
            refBtnPlay.current[previousSongInfo.id].style.display = "flex";
            refBtnPlaying.current[previousSongInfo.id].style.display = "none";
            refOpacityBg.current[previousSongInfo.id].style.opacity = "0";
        }
    }, [previousSongInfo])

    const handlePlaySong = (id) => {
        
        dispatch(fetchPlaySongById(id));
        dispatch(setIsPlayingTrue())
       
    }
   
    const handleStopSong = () => {
        dispatch(setIsPlayingFalse())
    }
    return (
        <div className="carousel-item">
        <div className="carousel-card">
            <div className="card-wrapper">
                <div className="card-container">
                    {
                        photo && photo.length > 0 && 
                        <Image src={photo} className="card-img" loading='lazy' width='150px' height='150px' alt='song image'/>
                    }
                    
                    <div className="opacity" ref={el => (refOpacityBg.current[id] = el)}/>
                    <div className="action-container">
                        <button className="action-btn-play" 
                            aria-label="Justify"
                            ref={el => (refBtnPlay.current[id] = el)}

                            onClick={()=>handlePlaySong(id)}
                        >
                            <BsFillPlayFill/>
                        </button>
                        <button 
                            aria-label="Justify"
                            className="action-btn-play-pause"  
                            style={{display: "none"}}
                            ref={el => (refBtnPlaying.current[id] = el)}
                            onClick={()=>handleStopSong()}
                        >
                        <Image src="https://res.cloudinary.com/dmriwkfll/image/upload/v1656084685/icon-playing_nvk7oc.gif" width={18} height={18} loading='lazy' alt='icon-playing'/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-content">
                <h4 className="card-title">{name}</h4>
            </div>         
        </div>
    </div>   
    )
}

export default PlaylistItem;