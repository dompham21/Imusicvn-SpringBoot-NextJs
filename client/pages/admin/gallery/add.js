import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { Box, Text } from "@chakra-ui/layout";
import CreateGalleryForm from "../../../components/CreateForm/CreateGalleryForm";

const AddGalleryAdmin = (props) => {
    return (
        <Box p='24px 48px'>
            <Text fontSize='3xl' mb='12px'>Create a new gallery</Text>
            <CreateGalleryForm isCreate={true}/>
        </Box>
    )
}
AddGalleryAdmin.Layout = LayoutAdmin;

export default AddGalleryAdmin;