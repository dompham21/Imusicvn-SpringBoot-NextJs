import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import { Box, Text } from "@chakra-ui/layout";
import { useRouter } from 'next/router'
import CreateCategoryForm from "../../../../components/CreateForm/CreateCategoryForm";

const EditPlaylist = (props) => {
    const router = useRouter()
    const { id } = router.query
   
    return (
        <Box p='24px 48px'>
            <Text fontSize='3xl' mb='12px'>Edit a category</Text>
            <CreateCategoryForm id={id} isCreate={false}/>
        </Box>
    )
}
EditPlaylist.Layout = LayoutAdmin;

export default EditPlaylist;