
import Playlist from '../../components/GridPlaylist/Playlist';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongById, getSongRecommend } from '../../store/actions';
import { Box } from "@chakra-ui/layout";
import ArtistDetail from '../../components/ArtistDetail';
import ListSongQueue from '../../components/QueueDrawer/ListSongQueue';
import SongDeltailSkeleton from '../../components/CustomSkeleton/SongDetailSkeleton';
import PlaylistSkeleton from '../../components/CustomSkeleton/PlaylistSkeleton';

const SongDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch()
    const infoSong = useSelector(state => state.song.infoSong)
    const listSongRecommend = useSelector(state => state.ui.listSongRecommend)

    useEffect(() => {
        if(id !== undefined) {
            dispatch(getSongById(id))
            dispatch(getSongRecommend(id, ""))
        }
    }, [dispatch, id])

   
    return (
        <Box p='0 30px' pb='110px'>
            {
                infoSong && infoSong.name ? 
                <>
                    <Box pt='50px' w='100%' h='410px' pos='relative'>
                        <ArtistDetail artist={infoSong.artists && infoSong.artists[0]}/>
                    </Box>
                    
                    <Box p="0 40px">
                        <Box fontSize='20px' fontWeight='700' mb='10px'>Bài Hát</Box>
                        <Box w='400px' borderRadius='4px' bg='#443c4d'>
                            <ListSongQueue {...infoSong} size={true}/>
                        </Box>
                    </Box> 
                </>
                :
                <SongDeltailSkeleton/>
            }
            {
                listSongRecommend && listSongRecommend.length > 0 ? 
                <Playlist title={"Bài hát gợi ý"} songs={listSongRecommend} /> 
                :
                <PlaylistSkeleton/>
            }
            
            

           
            
        </Box>
    )
}


export default SongDetail;