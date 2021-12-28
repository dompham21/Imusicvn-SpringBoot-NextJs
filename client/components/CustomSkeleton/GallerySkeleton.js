import { Box, Skeleton } from '@chakra-ui/react'




const GallerySkeleton = () => {
    return (
        <Box display='flex' alignItems='center' h='300px' w='100%' p='0 40px'>
            <Skeleton w='27%' h='210px'/>
            <Skeleton w='46%' h='280px' borderRadius='6px'/>
            <Skeleton w='27%' h='210px'/>
        </Box>
    )
}

export default GallerySkeleton;