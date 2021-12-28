import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import CreateSongForm from "../../../components/CreateForm/CreateSongForm";
import { Box, Text } from "@chakra-ui/layout";

const AddSong = (props) => {
    return (
        <Box p='24px 48px'>
            <Text fontSize='3xl' mb='12px'>Create a new song</Text>
            <CreateSongForm isCreate={true}/>
        </Box>
    )
}
AddSong.Layout = LayoutAdmin;

export default AddSong;