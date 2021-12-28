import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { Box, Text } from "@chakra-ui/layout";
import CreateCategoryForm from "../../../components/CreateForm/CreateCategoryForm";

const AddPlaylistAdmin = (props) => {
    return (
        <Box p='24px 48px'>
            <Text fontSize='3xl' mb='12px'>Create a new category</Text>
            <CreateCategoryForm isCreate={true}/>
        </Box>
    )
}
AddPlaylistAdmin.Layout = LayoutAdmin;

export default AddPlaylistAdmin;