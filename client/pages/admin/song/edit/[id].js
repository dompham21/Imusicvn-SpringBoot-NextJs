import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import { Box, Text } from "@chakra-ui/layout";
import { useRouter } from 'next/router'
import CreateSongForm from "../../../../components/CreateForm/CreateSongForm";

const EditSong = (props) => {
    const router = useRouter()
    const { id } = router.query
   
    return (
        <Box p='24px 48px'>
            <Text fontSize='3xl' mb='12px'>Edit a song</Text>
            <CreateSongForm id={id} isCreate={false}/>
        </Box>
    )
}
EditSong.Layout = LayoutAdmin;

export default EditSong;