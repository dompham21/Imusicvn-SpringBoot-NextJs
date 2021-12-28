import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import { Box, Text } from "@chakra-ui/layout";
import { useRouter } from 'next/router'
import CreateArtistForm from "../../../../components/CreateForm/CreateArtistForm";

const EditArtist = (props) => {
    const router = useRouter()
    const { id } = router.query
   
    return (
        <Box p='24px 48px'>
            <Text fontSize='3xl' mb='12px'>Edit a artist</Text>
            <CreateArtistForm id={id} isCreate={false}/>
        </Box>
    )
}
EditArtist.Layout = LayoutAdmin;

export default EditArtist;