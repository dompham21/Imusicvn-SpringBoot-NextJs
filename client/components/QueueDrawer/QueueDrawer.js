import React, { useState, useEffect } from 'react'
import { List, ListItem } from '@chakra-ui/layout';
import ListSongQueue from './ListSongQueue';
import { useSelector } from 'react-redux';
import { getLocalStorage } from '../../utils/useLocalStorage';
import { Drawer } from 'antd';


function QueueDrawer(props) {
    const {isOpen, onClose} = props;
    const [toggleBtn,setToggleBtn] = useState(false);
    const currSongInfo =  useSelector(state => state.ui.currSongInfo);
    const [queue, setQueue] = useState([])
    const [preSong, setPreSong] = useState([])
    const [nextSong, setNextSong] = useState([])
    const [recommend, setRecommend] = useState([])

    const [indexCurrSong, setIndexCurrSong] = useState(0)
    const songSuggestedRedux=  useSelector(state => state.ui.listSongSuggested);

    useEffect(() => {
        let imusicHistory = getLocalStorage('imusic_history', {
            history: [],
            indexCurr: 0
        })

        let queueHistory = imusicHistory.history;
        let indexCurrSongQueue = imusicHistory.indexCurr
        let preSongQueue = queueHistory.slice(0, indexCurrSongQueue);
        let nextSongQueue = queueHistory.slice(indexCurrSongQueue + 1)
        
        setQueue(queueHistory)
        setIndexCurrSong(indexCurrSongQueue);
        setPreSong(preSongQueue)
        setNextSong(nextSongQueue)
    }, [currSongInfo])
    
    useEffect(() => {
        let imusicSuggested = getLocalStorage('imusic_suggested', [])
        setRecommend(imusicSuggested);
    }, [songSuggestedRedux])

    return (
        <Drawer
            placement='right'
            onClose={onClose}
            width={320}
            closable={false}
            maskClosable={true}
            zIndex={11}
            visible={isOpen}
            mask={true}
            className="drawer-queue-container"
        >
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div className="drawer-queue-header">
                <div className={`drawer-queue-header-right${toggleBtn ? '' : ' is-active'}`} onClick={()=>setToggleBtn(false)}>
                    <span>Danh sách phát</span>
                </div> 
                <div className={`drawer-queue-header-left${toggleBtn ? ' is-active' : ''}`} onClick={()=>setToggleBtn(true)}>
                    <span>Nghe gần đây</span>
                </div>
                </div>
            </div>
            <div className="drawer-queue-scroll">
                <div className="scroll-container">
                    <div className="scroll-content">
                        <List
                            style={{display:preSong.length? "unset": "none"}}
                        >
                            {
                                preSong && preSong.length && preSong.map((item,index) => (
                                    <ListItem className="next-song" key={item.id}>
                                        <ListSongQueue {...item}/>
                                    </ListItem>
                                ))
                            }
                        
                        </List>
                        <div className="current-song">
                            <ListSongQueue 
                                {...queue[indexCurrSong]}
                            />
                        </div>
                        <div className="title-next-song" style={{display:nextSong.length? "unset": "none"}}>
                            <div className="title">Tiếp theo</div>
                            <div className="sub-title">Từ hàng đợi</div>
                        </div>
                        <List
                            style={{display:nextSong.length? "unset": "none"}}
                            
                        >
                            {
                                nextSong && nextSong.length && nextSong.map((item,index) => (
                                    <ListItem className="next-song" key={item.id}>
                                        <ListSongQueue {...item}/>
                                    </ListItem>
                                ))
                            }
                        </List>
                        
                        <div className="title-next-song">
                            <div className="title">Tiếp theo</div>
                            <div className="sub-title">Từ gợi ý</div>
                        </div>
                        <List
                            style={{display:recommend.length? "unset": "none"}}
                            
                        >
                            {
                                recommend && recommend.length && recommend.map((item,index) => (
                                    <ListItem className="next-song" key={item.id}>
                                        <ListSongQueue {...item}/>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                </div>

            </div>
            
        </Drawer>
    )
}

export default QueueDrawer