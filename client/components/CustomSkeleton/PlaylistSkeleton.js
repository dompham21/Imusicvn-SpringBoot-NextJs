import { Box, Skeleton, Grid, SkeletonText } from '@chakra-ui/react'



const PlaylistSkeleton = () => {
    return (
        <Box mt='50px' p='0 40px'>
            <Box mb='10px'>
                <Skeleton width='300px' height='20px'/>
            </Box>
            <Grid templateColumns='repeat(6, 1fr)' gap='30px'>
                <Box>
                    <Skeleton w='100%' height='150px' borderRadius='6px'/>
                    <SkeletonText mt='4' noOfLines={2} spacing='2' />
                </Box>
                <Box>
                    <Skeleton w='100%' height='150px' borderRadius='6px'/>
                    <SkeletonText mt='4' noOfLines={2} spacing='2' />
                </Box>
                <Box>
                    <Skeleton w='100%' height='150px' borderRadius='6px'/>
                    <SkeletonText mt='4' noOfLines={2} spacing='2' />
                </Box>
                <Box>
                    <Skeleton w='100%' height='150px' borderRadius='6px'/>
                    <SkeletonText mt='4' noOfLines={2} spacing='2' />
                </Box>
                <Box>
                    <Skeleton w='100%' height='150px' borderRadius='6px'/>
                    <SkeletonText mt='4' noOfLines={2} spacing='2' />
                </Box>
                <Box>
                    <Skeleton w='100%' height='150px' borderRadius='6px'/>
                    <SkeletonText mt='4' noOfLines={2} spacing='2' />
                </Box>
            </Grid>
        </Box>
    )
}

export default PlaylistSkeleton;