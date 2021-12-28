import React,{ useRef,useState, useEffect } from 'react';
import { BsMusicNoteBeamed,BsMusicNote } from 'react-icons/bs';
import { FiVolume1,FiVolume2,FiVolumeX } from 'react-icons/fi'
import { BsFillSkipEndFill,BsFillSkipStartFill,BsFillPlayFill,BsMusicNoteList,BsPauseFill } from 'react-icons/bs';
import { formatTimeAudio } from '../../utils/utils';
import { useDisclosure } from '@chakra-ui/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPlayingFalse, setIsPlayingTrue, fetchPlaySongById } from '../../store/actions';
import { getLocalStorage, setLocalStorage } from '../../utils/useLocalStorage';
import { Slider } from 'antd';
import dynamic from 'next/dynamic';

const DynamicQueueDrawer = dynamic(() => import('../QueueDrawer/QueueDrawer'))
function Player() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentTime,setCurrentTime] = useState(0);
    const [volume,setVolume] = useState(0);

    const [duration,setDuration] = useState(0);
    const [hasPlayer,setHasPlayer] = useState(false);
    const [urlSong, setUrlSong] = useState("");
    const [queue, setQueue] = useState([])
    const [recommend, setRecommend] = useState([])

    const [currSongInfo, setCurrSongInfo] = useState({});
    const audioRef = useRef(null)
    const dispatch = useDispatch()
  
    const [indexCurrSong, setIndexCurrSong] = useState(0);

    const currSongRedux=  useSelector(state => state.ui.currSongInfo);
    const songSuggestedRedux=  useSelector(state => state.ui.listSongSuggested);

    const isPlaying =  useSelector(state => state.ui.isPlaying);

    useEffect(() => {
        let imusicHistory = getLocalStorage('imusic_history', {
            history: [],
            indexCurr: 0
        })

        let imusicSongInfo = getLocalStorage('imusic_currSongInfo', {})
        let imusicHasPlayer = getLocalStorage('imusic_hasPlayer', false)

        setQueue(imusicHistory.history )
        setIndexCurrSong(imusicHistory.indexCurr);
        setCurrSongInfo(imusicSongInfo)
        setHasPlayer(imusicHasPlayer)
    
    }, [currSongRedux])

    useEffect(() => {
        let imusicSuggested = getLocalStorage('imusic_suggested', [])

        setRecommend(imusicSuggested);

    }, [songSuggestedRedux])

    useEffect(() => {
        const defaultVolume = getLocalStorage('imusic_defaultVolume', 1)
        if(defaultVolume) {
            setVolume(parseFloat(defaultVolume))
        }
    }, [])
    
    useEffect(() => {
        if(currSongInfo && currSongInfo.url){
            setUrlSong(currSongInfo.url)
        }
    }, [currSongInfo])



    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
         } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    const handleLoadedData = () => {
        let imusicDefaultVolume = getLocalStorage('imusic_defaultVolume', 1);
        audioRef.current.volume = imusicDefaultVolume;
        setDuration(audioRef.current.duration);
        if (isPlaying) {
            audioRef.current.play();
        }
        
    };

    const handleTimeSliderChange = (x) => {
        if(isPlaying){
            audioRef.current.currentTime = x;
            setCurrentTime(x);
        }
    };

    const handleTimeSliderVolume = (x) => {
        audioRef.current.volume = x;
        setVolume(x);
        setLocalStorage('imusic_defaultVolume', x)
    }

    const handlePausePlayClick = () => {
        if (isPlaying) {
          audioRef.current.pause();
          dispatch(setIsPlayingFalse())
        } else {
          audioRef.current.play();
          dispatch(setIsPlayingTrue())
        }
    };

   
    const handleOffVolume = () => {
        setLocalStorage('imusic_player', {
            beforeMuteVolume: volume
        })

        audioRef.current.volume = 0;
        setVolume(0);
    }

    const handleOnVolume = () => {
        let imusic_player = getLocalStorage('imusic_player', {
            beforeMuteVolume: 1
        })
        let beforeVolume =  imusic_player.beforeMuteVolume
        audioRef.current.volume  = beforeVolume;
        setVolume(beforeVolume)
    }
    


    const playPrevOrNextSong = (prevOrnext) => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        dispatch(setIsPlayingFalse())

        const prevOrNextSong = findSong(prevOrnext);

        if (!prevOrNextSong) return;
        dispatch(fetchPlaySongById(prevOrNextSong.id))
        
        dispatch(setIsPlayingTrue())
        
    }

    const findSong = (prevOrnext) => {
        // if(!recommend || !recommend.length) {
        // }
       
        switch (prevOrnext) {
            case "next":
                if(queue && queue.length - 1 === indexCurrSong ) { //last element of playlist 
                    if(!recommend[0]) return null
                    return recommend[0]
                }
                else if( indexCurrSong === -1){ //when playlist length == 0 then play suggested song  
                    if(!recommend[0]) return null
                    return recommend[0]
                }

                return queue[indexCurrSong + 1] ;
            case "prev":

                if(indexCurrSong <= 0) {
                    return null;
                }
                return queue[indexCurrSong - 1] ;

            default:
                return null;
        }
    }
    const handleEnded = () => {
        playPrevOrNextSong('next');
    }
    const handleTimeUpdate =  () => {
        if(audioRef && audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
        }
    }
    return (
        <div className="player-controls" style={{display: (hasPlayer === true) || isPlaying ? "unset":"none"}}>
            <div className="player-container">
            <audio
                ref={audioRef}
                src={urlSong}
                onLoadedData={handleLoadedData}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            
            />
                <div className="player-controls-left">
                    <div className="media-animate">
                        <div className="media-left">
                            <div className="thumbnail-wrapper">
                                <div className="thumbnail">
                                    {
                                        currSongInfo && currSongInfo.photo && currSongInfo.photo.length > 0 &&
                                        <img                                         
                                            className="img-rounded" 
                                            style={{animationPlayState: isPlaying ? "running" : "paused" }}
                                            src={currSongInfo && currSongInfo.photo} 
                                            loading='lazy'
                                            width='64px'
                                            height='64px'
                                            alt='current song'
                                        />
                                    }
                                    
                                </div>
                                <div className="note note1" style={{animationPlayState: isPlaying ? "running" : "paused" }}><BsMusicNoteBeamed/></div>
                                <div className="note note2" style={{animationPlayState: isPlaying ? "running" : "paused" }}><BsMusicNote/></div>
                                <div className="note note3" style={{animationPlayState: isPlaying ? "running" : "paused" }}><BsMusicNoteBeamed/></div>
                                <div className="note note4" style={{animationPlayState: isPlaying ? "running" : "paused" }}><BsMusicNote/></div>
                            </div>
                        </div>
                        <div className="media-content">
                            <div className="title">{currSongInfo && currSongInfo.name}</div>
                            <h3 className="subtitle">{currSongInfo && currSongInfo.artists && currSongInfo.artists.map(artist => artist.name).join(", ")}</h3>
                        </div>
                        <div className="media-right"></div>
                    </div>
                </div>
                <div className="player-controls-bar ">
                    <div className="player-action">
                        <button className="action-btn-play btn-skip-pre"
                            onClick={()=>playPrevOrNextSong("prev")}
                        >
                            <BsFillSkipStartFill/>
                        </button>
                        <button className="action-btn-play btn-player" 
                            style={{display:isPlaying ? "none" : "flex"}}
                            onClick={()=>handlePausePlayClick()}
                        >
                            <BsFillPlayFill/>
                        </button>
                        <button className="action-btn-play btn-player" 
                            style={{display:isPlaying ? "flex" : "none"}}
                            onClick={()=>handlePausePlayClick()}
                        >
                            <BsPauseFill/>
                        </button>
                        <button className="action-btn-play btn-skip-next"
                            onClick={()=>playPrevOrNextSong("next")}
                        >
                            <BsFillSkipEndFill/>
                        </button>
                    </div>
                    <div className="progress-bar">
                        <div className="time left">{formatTimeAudio(currentTime)}</div>
                        <div className="time-slider-bar">  
                            <Slider 
                                tooltipVisible={false}
                                value={currentTime} 
                                min={0} 
                                max={duration} 
                                onChange={(value) => handleTimeSliderChange(value)}
                                className="slider-duration-time"
                            />
                        </div>
                        <div className="time right">{formatTimeAudio(duration)}</div>
                    </div>
                </div>
                <div className="player-controls-right">
                    <div className="volume">
                        <button className="action-btn-play btn-volume" style={{display:volume<0.5&&volume>0 ? "flex" : "none"}} onClick={handleOffVolume}><FiVolume1/></button>
                        <button className="action-btn-play btn-volume" style={{display:volume>=0.5 ? "flex" : "none"}} onClick={handleOffVolume}><FiVolume2/></button>
                        <button className="action-btn-play btn-volume" style={{display:volume==0 ? "flex" : "none"}} onClick={handleOnVolume}><FiVolumeX/></button>
                        <div className="time-slider-bar" >
                            <Slider 
                                value={volume}
                                tooltipVisible={false}
                                min={0} 
                                max={1} 
                                step={0.01}
                                onChange={(value) => handleTimeSliderVolume(value)}
                                className="slider-duration-time"
                            />
                        </div>       
                    </div>
                    <div className="divide"/>
                        
                    <div className="list-music"   onClick={isOpen ? onClose : onOpen}>
                        <button className="action-btn-play btn-list-music"><BsMusicNoteList/></button>
                    </div>
                    <DynamicQueueDrawer isOpen={isOpen}  onClose={onClose}/>
                   
                </div>
            </div>
        </div>
    )
}

export default Player