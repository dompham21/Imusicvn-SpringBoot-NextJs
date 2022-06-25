import { Image } from '@chakra-ui/react';
import React , { useRef, useEffect } from 'react'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { useSelector,useDispatch  } from 'react-redux';
import { fetchPlaySongById, setIsPlayingFalse, setIsPlayingTrue } from '../../store/actions';

function ListSongQueue(props) {
    const {photo, id, name, artists, size } = props
    const refBtnPlaying = useRef([]);
    const refBtnPlay = useRef([]);
    const refOpacityBg = useRef([]);
   
    const dispatch = useDispatch()
    const isPlaying =  useSelector(state => state.ui.isPlaying);
    const currSongInfo =  useSelector(state => state.ui.currSongInfo);
    const previousSongInfo =  useSelector(state => state.ui.previousSongInfo);


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
    console.log(size)
    return (
        <div className="list song-data queue">
            <div className="song-left">
                
                <Image src={photo} w={80} h={80}/>
                <div className="opacity" ref={el => (refOpacityBg.current[id] = el)}/>
                <div className="action-container">
                    
                    <button className="action-btn-play" 
                        ref={el => (refBtnPlay.current[id] = el)}

                        onClick={()=>handlePlaySong(id)}
                    >
                        <BsFillPlayFill/>
                    </button>
                    <button 
                        className="action-btn-play-pause"  
                        style={{display: "none", width: "30px", height: "30px"}}
                        ref={el => (refBtnPlaying.current[id] = el)}
                        onClick={()=>handleStopSong()}
                    >
                        <Image src="https://res.cloudinary.com/dmriwkfll/image/upload/v1656084685/icon-playing_nvk7oc.gif" width={12} height={12} loading='lazy' alt='icon-playing' className='icon-playing'/>
                    </button>
                </div>
            </div>
            <div className="song-info">
                <span className="song-title">{name}</span>
                <span className="song-artists">{artists && artists.map(artist => artist.name).join(", ")}</span>
            </div>
      </div>
    )
}

export default ListSongQueue