import { Button } from "@chakra-ui/button"
import { useDispatch } from 'react-redux';
import { 
    AlertDialog, 
    AlertDialogBody,
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogOverlay 
} from "@chakra-ui/modal"


function AlertDialogDelete(props) {
    const {isOpen, cancelRef, onClose, id, deleteDispatch, setIsOpen} = props
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteDispatch(id));
        setIsOpen(false)
    }
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>            
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete ID {id}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can not undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={()=>handleDelete(id)} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AlertDialogDelete