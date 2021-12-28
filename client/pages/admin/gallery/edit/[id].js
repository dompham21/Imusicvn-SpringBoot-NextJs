import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import { Box, Text } from "@chakra-ui/layout";
import { useRouter } from 'next/router'
import CreateGalleryForm from "../../../../components/CreateForm/CreateGalleryForm";

const EditGallery = (props) => {
    const router = useRouter()
    const { id } = router.query
   
    return (
        <Box p='24px 48px'>
            <Text fontSize='3xl' mb='12px'>Edit a gallery</Text>
            <CreateGalleryForm id={id} isCreate={false}/>
        </Box>
    )
}
EditGallery.Layout = LayoutAdmin;

export default EditGallery;