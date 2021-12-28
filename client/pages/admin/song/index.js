import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Link from 'next/link'
import { Button } from "@chakra-ui/button";
import { AiOutlinePlus } from 'react-icons/ai'
import ListUser from "../../../components/ListAdmin/ListUser";
import { Box, Text, Flex } from "@chakra-ui/layout";
import SearchItemAdmin from "../../../components/Search/SearchItemAdmin";
import { useDispatch } from 'react-redux';
import { getListSong } from "../../../store/actions/song";

const Song = (props) => {
    const dispatch = useDispatch()

    const handleSearchChange = (keyword) => {
        dispatch(getListSong(1,keyword, 5))
    }
    
    return (
        <Box p={"24px 48px"}>
            <Flex justifyContent="space-between" alignItems="center" mb={'40px'}>
                <Text fontSize='3xl'>Song List</Text>
                <Link href="/admin/song/add"><Button bg={'rgb(255, 48, 48)'}><AiOutlinePlus/>New Song</Button></Link>
            </Flex>
            <Box className="container" bg={'white'} borderRadius={'6px'} color={'rgb(33, 43, 54)'}>
                <SearchItemAdmin onSubmit={handleSearchChange} item="song"/>
                <Box>
                    <ListUser/>
                </Box>
            </Box>
        </Box>
    )
}
Song.Layout = LayoutAdmin;

export default Song;