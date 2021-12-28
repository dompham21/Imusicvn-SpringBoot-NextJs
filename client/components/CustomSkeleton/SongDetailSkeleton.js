import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import SkeletonButton from 'antd/lib/skeleton/Button';
import PlaylistSkeleton from './PlaylistSkeleton';



const SongDeltailSkeleton = () => {
    return (
        <Box mt='50px'>
            <Box display='flex' alignItems='center'>
                <Box display='flex' alignItems='center' justifyContent='center' w='40%' p='0 14px'>
                    <SkeletonCircle size='260px'/>
                </Box>
                <Box w='60%'  p='0 14px'>
                    <Skeleton h='30px' w='200px'/>
                    <SkeletonText mt='20px'/>
                    <Skeleton mt='20px' w='140px' h='40px' borderRadius='25px' />
                </Box>
            </Box>
            <Box p='0 40px' mt='50px'>
                <Box mb='10px'>
                    <Skeleton h='20px' w='100px'/>
                </Box>
                <Box w='400px' borderRadius='4px' bg='#443c4d'>
                    <Box display='flex' alignItems='center' p='8px'>
                        <Box>
                            <Skeleton h='60px' w='60px' borderRadius='6px'/>
                        </Box>
                        <Box ml='5px'>
                            <Skeleton h='10px' w='50px' mb='5px'/>
                            <Skeleton h='7px' w='60px'/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SongDeltailSkeleton;