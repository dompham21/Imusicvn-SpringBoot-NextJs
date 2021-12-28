import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Link from 'next/link'
import { Button } from "@chakra-ui/button";
import { AiOutlinePlus } from 'react-icons/ai'
import { Box, Text, Flex } from "@chakra-ui/layout";
import ListArtist from "../../../components/ListAdmin/ListArtist";
import SearchItemAdmin from "../../../components/Search/SearchItemAdmin";
import { useDispatch } from "react-redux";
import { getListArtist } from "../../../store/actions";

const Artist = (props) => {
    const dispatch = useDispatch()

    const handleSearchChange = (keyword) => {
        dispatch(getListArtist(1,keyword))
    }
    return (
        <Box p={"24px 48px"}>
            <Flex justifyContent="space-between" alignItems="center" mb={'40px'}>
                <Text fontSize='3xl'>Artist List</Text>
                <Link href="/admin/artist/add"><Button bg={'rgb(255, 48, 48)'}><AiOutlinePlus/>New artist</Button></Link>
            </Flex>
            <Box className="container" bg={'white'} borderRadius={'6px'} color={'rgb(33, 43, 54)'}>
                <SearchItemAdmin onSubmit={handleSearchChange} item="artist"/>

                <Box>
                    <ListArtist/>
                </Box>
            </Box>
        
        </Box>
    )
}
Artist.Layout = LayoutAdmin;

export default Artist;