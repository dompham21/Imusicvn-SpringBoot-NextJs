import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { Box, Text } from "@chakra-ui/layout";
import CreateArtistForm from "../../../components/CreateForm/CreateArtistForm";

const AddArtist = (props) => {
    return (
        <Box p='24px 48px'>
            <Text fontSize='3xl' mb='12px'>Create a new artist</Text>
            <CreateArtistForm isCreate={true}/>
        </Box>
    )
}
AddArtist.Layout = LayoutAdmin;

export default AddArtist;