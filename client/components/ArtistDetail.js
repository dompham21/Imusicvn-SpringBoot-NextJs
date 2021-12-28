
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Box } from "@chakra-ui/layout";

const ArtistDetail = (props) => {
    const {artist} = props
    return (
        <Box display='flex' alignItems='center' >
            <Box p='0 14px' w='40%' display='flex' alignItems='center' justifyContent='center'>
                <Box>
                    <Avatar 
                    w='260px'
                    h='260px'
                    src={artist && artist.photo}/>
                </Box>
            </Box>
            <Box p='0 14px' display='flex' flexDir='column' w='60%' gridGap='20px'>
                <Box>
                    <Box fontSize='40px' fontWeight='700' >{artist && artist.name}</Box>
                    <Box>{artist && artist.introduction}</Box>   
                </Box>
                <Box>
                    <Button 
                            bg='#7200a1'
                            p='9px 34px'
                            borderRadius='25px'
                            _hover={{bg: "#670291"}}
                            _focus={{bg: "#670291", boxShadow:'none'}}
                            _active={{bg: "#670291"}}
                            
                    >
                        Theo dõi    
                    </Button>
                </Box>
            </Box>
        </Box>
    )

}

export default ArtistDetail;