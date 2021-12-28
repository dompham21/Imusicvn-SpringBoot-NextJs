import { Box } from '@chakra-ui/layout'
import Gallery from '../components/Gallery/Gallery'
import Playlist from '../components/GridPlaylist/Playlist'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getListGallery, resetErrorGetListGallery } from '../store/actions';
import { useToast } from '@chakra-ui/toast';
import { List } from 'antd';
import GallerySkeleton from '../components/CustomSkeleton/GallerySkeleton';
import PlaylistSkeleton from '../components/CustomSkeleton/PlaylistSkeleton';

export default function Home(props) {
  const toast = useToast()

  const dispatch = useDispatch()
  const listGallery = useSelector(state => state.gallery.listGallery)
  const errorGetListGallery = useSelector(state => state.gallery.errorGetListGallery)

  useEffect(() => {
    dispatch(getListGallery(1,""))
  }, [dispatch])

  useEffect(() => {
    if(errorGetListGallery && errorGetListGallery.length > 0) {
         toast({
             title: errorGetListGallery,
             position: "top-right",
             status: "error",
             isClosable: true,
         })
         dispatch(resetErrorGetListGallery())
    }
 }, [errorGetListGallery])


  return (
      <Box
        textAlign="center"
        pb={"140px"}
      >
        
        {
          listGallery && listGallery.length > 0 ? 
          <List
            dataSource={listGallery}
            renderItem={item => {
              if(item.sectionType === 'banner') {
                  return (
                    <Gallery songs={item.songs}/>
                  )
              }
              else {
                return  (
                  <Playlist title={item.title} songs={item.songs}/>
                )
              }
            }}
          />
          :
          <>
            <GallerySkeleton/>
            <PlaylistSkeleton/>
            <PlaylistSkeleton/>
            <PlaylistSkeleton/>
            <PlaylistSkeleton/>
            <PlaylistSkeleton/>
          </>
        }
       

      </Box>  
      
  )
}
