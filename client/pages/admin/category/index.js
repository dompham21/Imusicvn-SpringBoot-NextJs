import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Link from 'next/link'
import { Button } from "@chakra-ui/button";
import { AiOutlinePlus } from 'react-icons/ai'
import { Box, Text, Flex } from "@chakra-ui/layout";
import SearchItemAdmin from "../../../components/Search/SearchItemAdmin";
import { useDispatch } from 'react-redux';
import { getListSong } from "../../../store/actions/song";
import ListCategory from "../../../components/ListAdmin/ListCategory";

const PlaylistAdmin = (props) => {
    const dispatch = useDispatch()

    const handleSearchChange = (keyword) => {
        dispatch(getListSong(1,keyword))
    }
    
    return (
        <Box p={"24px 48px"}>
            <Flex justifyContent="space-between" alignItems="center" mb={'40px'}>
                <Text fontSize='3xl'>Category List</Text>
                <Link href="/admin/category/add"><Button bg={'rgb(255, 48, 48)'}><AiOutlinePlus/>New Category</Button></Link>
            </Flex>
            <Box className="container" bg={'white'} borderRadius={'6px'} color={'rgb(33, 43, 54)'}>
                <SearchItemAdmin onSubmit={handleSearchChange} item="song"/>
                <Box>
                    <ListCategory/>
                </Box>
            </Box>
        </Box>
    )
}
PlaylistAdmin.Layout = LayoutAdmin;

export default PlaylistAdmin;